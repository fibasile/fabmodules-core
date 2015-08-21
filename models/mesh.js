define([],function(){


    var Mesh = function(){
        this.data  = [];
        this.meta = {};
        this.info = {};        
    };



    Mesh.prototype.getType=function() { return "model/Mesh" };



    return Mesh;


});
