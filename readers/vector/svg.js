define(['require', 'util/buffers','models/vector'], function(require,BufferUtil, Vector){


    var SVGVectorReader= {};
    
    
    SVGVectorReader.read = function(packet,success,fail){
    
    };


    SVGVectorReader.mediatype = function(){
    
        return ['image/svg+xml','application/svg+xml'];
    
    };

    return SVGVectorReader;

});
