# fabmodules-core

This library contains the basic algorithms and machine related core for the new version of the Fab Modules project.

## Modules

   - **machines**: wrappers for machine specific code, such as controls.
   - **models**: abstractions of different data formats, path planning routines for 2D and 3D processes
   - **readers**: parsers for different bitmap, vector and mesh data formats
   - **writers**: path to code generation for several languages (eps, G-Code, RML-1, HPgl, SVG, Shopbot, etc)
   - **util**: utility functions such as configuration, image processing etc.
   
   
## Using Fab Modules Core

The library is based on [require.js](http://requirejs.org).

You can include it in your project like this:

    define(["require","fabmodules-core/main"], function(require,FabModules)){
    
        
    
    
    });

### Example: Read in a PNG image and send it to the vinyl cutter

    // You want to read a png into a Bitmap. 

    var input_plugins = FabModules.readersFor('image/png','model/Bitmap');

    // you have at least one reader for this, but you can give the users
    // a choice of what reader use i.e. for Binary or ASCII input format
    
    var reader = input_plugins[0];
    
    // you read 
    
    var img_url = 'http://test.com/img.png';
    
    reader.readURL(img_url, function(bitmap){
    
        // in bitmap.metadata we can check dpi, etc
        var dpi = bitmap.metadata.dpi;
        
        // in bitmap.preview we have an Image with a bitmap preview_image
        var img = bitmap.preview;
        
    
    });
    
    



## License

This work is based on http://fabmodules.org source code by Neil Gershenfeld. 

The code is accompained by the following license. 

//
// Neil Gershenfeld 
// (c) Massachusetts Institute of Technology 2014
// 
// This work may be reproduced, modified, distributed, performed, and 
// displayed for any purpose, but must acknowledge the fab modules 
// project. Copyright is retained and must be preserved. The work is 
// provided as is; no warranty is provided, and users accept all 
// liability.
//


