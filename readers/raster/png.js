define(['require','models/bitmap'], function(require, Bitmap) {


    function parseDPI(buf, cb) {
        //
        // get DPI
        //
        // 8 header
        // 4 len, 4 type, data, 4 crc
        // pHYs 4 ppx, 4 ppy, 1 unit: 0 ?, 1 meter
        // IEND
        //
        var units = ppx = ppy = 0
        var view = new DataView(buf)
        var ptr = 8
        if (!((view.getUint8(1) == 80) && (view.getUint8(2) == 78) && (view.getUint8(3) == 71))) {
            //ui.ui_prompt("error: PNG header not found")
            cb("Error: PNG header not found")
            return
        }
        while (1) {
            var length = view.getUint32(ptr)
            ptr += 4
            var type = String.fromCharCode(view.getUint8(ptr), view.getUint8(ptr + 1),
                view.getUint8(ptr + 2), view.getUint8(ptr + 3))
            ptr += 4
            if (type == "pHYs") {
                ppx = view.getUint32(ptr)
                ppy = view.getUint32(ptr + 4)
                units = view.getUint8(ptr + 8)
            }
            if (type == "IEND")
                break
            ptr += length + 4
        }
        if (units == 0) {
            // ui.ui_prompt("no PNG units not found, assuming 72 DPI")
            ppx = 72 * 1000 / 25.4
        }
        var dpi = ppx * 25.4 / 1000
            //  globals.dpi = dpi.toFixed(3);
        cb(dpi);
    };


    // public method for encoding an Uint8Array to base64
    function encode(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
            chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    };


    function info(buffer, dpi, cb) {
        console.log("Image info");
        var img = new Image()
        img.onload = function() {
            width = img.width;
            height = img.height;

            cb({
                width: width,
                height: height,
                dimensions: {
                    mm: {
                        width: (25.4 * width / dpi).toFixed(3),
                        height: (25.4 * height / dpi).toFixed(3),
                    },
                    inch: {
                        width: (width / dpi).toFixed(3),
                        height: (height / dpi).toFixed(3)
                    }
                }
            }, img);
        };
        img.onerror = function(msg) {
            console.log("error loading image ");
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
        parseDPI(packet.data, function(dpi) {
            info(packet.data, dpi, function(size, img) {
                console.log("input_png dpi:" + dpi);
                console.log("input_png width:" + size.width);
                console.log("input_png height:" + size.height);
                console.log("input_png dimensions:" + size.dimensions); 
                if (size) {
                    var meta = {
                            "dpi": dpi,
                            "width": size.width,
                            "height": size.height,
                            "dimensions": size.dimensions
                    };
                    var bmp = new Bitmap(meta, img);
                    success(bmp);
                } else  {
                    fail();
                }
            });
        });
    };


    return {
        read: read
    };

});
