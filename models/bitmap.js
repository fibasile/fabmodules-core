define([],function(){


    var Bitmap = function(info,preview){

        this.info = info;
        this.preview = preview;


    };



    Bitmap.prototype.getType=function() { return "model/bitmap" };




    return Bitmap;


});
