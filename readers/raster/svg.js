define(['require', 'util/buffers', 'models/bitmap'], function(require, bufferUtil, Bitmap) {


    function parseBuffer(buf, cb) {

        arrayBufferToString(buf, function(str) {

            var i = str.indexOf("width")
            if (i == -1) {
                ui.ui_prompt("error: SVG width not found")
                return
            }
            var i1 = str.indexOf("\"", i + 1)
            var i2 = str.indexOf("\"", i1 + 1)
            var width = str.substring(i1 + 1, i2)
            i = str.indexOf("height")
            i1 = str.indexOf("\"", i + 1)
            i2 = str.indexOf("\"", i1 + 1)
            var height = str.substring(i1 + 1, i2)
            ih = str.indexOf("height")
            if (width.indexOf("px") != -1) {
                width = width.slice(0, -2)
                height = height.slice(0, -2)
                var units = 90
            } else if (width.indexOf("mm") != -1) {
                width = width.slice(0, -2)
                height = height.slice(0, -2)
                var units = 25.4
            } else if (width.indexOf("cm") != -1) {
                width = width.slice(0, -2)
                height = height.slice(0, -2)
                var units = 2.54
            } else if (width.indexOf("in") != -1) {
                width = width.slice(0, -2)
                height = height.slice(0, -2)
                var units = 1
            } else {
                var units = 90
            }
            var dpi = 300;
            var svg = {}
            svg.units = units
            svg.width = parseFloat(width)
            svg.height = parseFloat(height)
            width = parseInt(dpi * width / units)
            height = parseInt(dpi * height / units)
            cb({
                dpi: dpi,
                svg: svg,
                width: width,
                height: height

            });

        });

    };

    function preview(buffer, info, cb) {
        var img = new Image();
        img.onload = function() {
            cb({
                units: info.svg.units.toFixed(3),
                dpi: info.dpi.toFixed(3),
                width: img.width,
                height: img.height,
                dimensions: {
                    mm: {
                        width: (25.4 * info.width / info.dpi).toFixed(3),
                        height: (25.4 * info.height / info.dpi).toFixed(3),
                    },
                    inch: {
                        width: (info.width / info.dpi).toFixed(3),
                        height: (info.height / infodpi).toFixed(3)
                    }
                }
            }, img);

        };
        img.onerror = function(msg) {
            console.log("error loading svg ");
            console.log(msg);
            cb(null);
        };
        var bytes = new Uint8Array(buffer);
        img.src = 'data:image/png;base64,' + encode(bytes);

    };


    /**
       packet = {
          data: Buffer,
          file: UploadFileObject,
          + metadata about the input format
       }

       callback(metadata, preview_image)
     **/
    function read(packet, success, fail) {
        console.log("Reading packet");
        console.log(packet);
        parseBuffer(packet.data, function(info) {
            preview(packet.data, info, function(meta, preview) {
                if (meta){
                    var bmp = new Bitmap(meta, preview);
                    success(bmp);
                }
                else {
                    fail();
                }
            });
        });
    };




    return {
        read: read
    };

});
