/** png_invert **/


depends(['require', 'image'], function(require, imageUtils) {

    /** 

             findEl('invert_image_btn',false).addEventListener("click", function() {
                ui.ui_clear();
                var canvas = findEl("mod_input_canvas");
                canvas.style.display = "inline";
                var ctx = canvas.getContext("2d");
                var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
                imageUtils.invert(img);
                ctx.putImageData(img, 0, 0);
             });
    **/

    var invertCanvas = function(ctx) {
        var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageUtils.invert(img);
        ctx.putImageData(img, 0, 0);
    }

    var drawImage = function(ctx, img) {
        ctx.drawImage(img, 0, 0, img.width, img.height)
        var input_img = ctx.getImageData(0, 0, canvas.width, canvas.height)
        imageUtils.flatten(input_img)
        ctx.putImageData(input_img, 0, 0);
    }

    return {
        drawImage: drawImage,
        invert: invertCanvas
    }

});