// path generation routines

define(["models/path","underscore"], function(Path,_){

    var PathGenerator = function(){

    
    
        var image_2D = function(opts){
    
    
    
    
        };


        var image_21D = function(opts){
    
    
    
    
    
        };


        var image_22 = function(opts){
    
    
    
    
        };


        var image_25D = function(opts){
    
    
    
    
        };
    
        var image_3D  = function(opts){
    
    
    
        };
    
    
    
        // Create a path halftoning an image
        //    
        var image_halftone = function(input_img, options, cb){
    
            var opts = {
              diameter: 0,
              spot_size: 2,
              spot_min: 25,
              spot_spacing_h: 25,
              spot_spacing_v: 25,
              spot_points:4,
              spot_fill: 0,
              sort_path: 0
            };
            
            // update the settings with ones specified in options
            _.extend(opts,options);
            
            var path = imageUtils.halftone(input_img, 
                                            opts.diameter, 
                                            opts.spot_size, 
                                            opts.spot_min, 
                                            opts.spot_spacing_h, 
                                            opts.spot_spacing_v, 
                                            opts.spot_points,     
                                            opts.spot_fill);
            cb(path);
    
        };
    
    };
    
    return PathGenerator;


});
