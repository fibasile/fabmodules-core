define(['require', 'models/mesh'], function(require,Mesh) {

    var STLReader = {};

    // private function
    function parseSTL(buf, cb) {
    
        var endian = true;
        var xmin = Number.MAX_VALUE;
        var ymin = Number.MAX_VALUE;
        var ymax = -Number.MAX_VALUE;
        var zmin = Number.MAX_VALUE;
        var zmax = -Number.MAX_VALUE;

        function getx() {
            var x = view.getFloat32(pos, endian);
            pos += 4;
            if (x > xmax)
                xmax = x;
            if (x < xmin)
                xmin = x;
            return x;
        }

        function gety() {
            var y = view.getFloat32(pos, endian);
            pos += 4;
            if (y > ymax)
                ymax = y;
            if (y < ymin)
                ymin = y;
            return y;
        }

        function getz() {
            var z = view.getFloat32(pos, endian);
            pos += 4;
            if (z > zmax)
                zmax = z;
            if (z < zmin)
                zmin = z;
            return z;
        }

        var view = new DataView(buf);
        //
        // check for binary STL
        //
        if ((view.getUint8(0) == 115) && (view.getUint8(1) == 111) && (view.getUint8(2) == 108) && (view.getUint8(3) == 105) && (view.getUint8(4) == 100))
        //
        // "solid" found, check if binary anyway by multiple of 50 bytes records (Solidworks hack)
        //
            if (Math.floor((view.byteLength - (80 + 4)) / 50) != ((view.byteLength - (80 + 4)) / 50))
                return cb(null);

        var ntriangles = view.getUint32(80, endian);
        var pos = 84;
        var mesh = [];
        for (var i = 0; i < ntriangles; ++i) {
            pos += 12;
            var x0 = getx();
            var y0 = gety();
            var z0 = getz();
            var x1 = getx();
            var y1 = gety();
            var z1 = getz();
            var x2 = getx();
            var y2 = gety();
            var z2 = getz();
            mesh[mesh.length] = [
                [x0, y0, z0],
                [x1, y1, z1],
                [x2, y2, z2]
            ];
            pos += 2;
        }
        var meshObj = new Mesh();
        meshObj.data = mesh;
        var mesh = {};        
        mesh.xmin = xmin;
        mesh.xmax = xmax;
        mesh.ymin = ymin;
        mesh.ymax = ymax;
        mesh.zmin = zmin;
        mesh.zmax = zmax;
        mesh.rz = 0;
        mesh.rx = 0;
        mesh.dy = 0;
        mesh.dx = 0;
        mesh.s = 1;
        meshObj.meta = mesh;
        return cb(mesh);
    };


    /**


       packet = {
          data: Buffer,
          file: UploadFileObject,
          + metadata about the input format
       }

       callback(metadata, preview_image)
     **/
    STLReader.read = function(packet, success, fail) {
        console.log("Reading packet");
        console.log(packet);
        parseSTL(packet.data, function(mesh) {
            if (mesh) {
                mesh.units = 1
                dpi = 100
                var width = (dpi * (mesh.xmax - mesh.xmin) / mesh.units).toFixed(0)
                var height = (dpi * (mesh.ymax - mesh.ymin) / mesh.units).toFixed(0)
                var dimensions = {
                    mm: {
                        width: (25.4 * (mesh.xmax - mesh.xmin) / mesh.units).toFixed(3),
                        height: (25.4 * (mesh.ymax - mesh.ymin) / mesh.units).toFixed(3),
                        depth: (25.4 * (mesh.zmax - mesh.zmin) / mesh.units).toFixed(3),
                    },
                    inch: {
                        width: ((mesh.xmax - mesh.xmin) / mesh.units).toFixed(3),
                        height: ((mesh.ymax - mesh.ymin) / mesh.units).toFixed(3),
                        depth: ((mesh.zmax - mesh.zmin) / mesh.units).toFixed(3),
                    }
                };
                
                mesh.info = {
                        "dpi": dpi,
                        "width": width,
                        "height": height,
                        "dimensions": dimensions
                };
                success(mesh);
            } else {
                fail();
            }
        });
    };


    STLReader.mediatype(){ 
        return ['application/stl'];
    };


    return STLReader;

});
