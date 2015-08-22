//
// Author: Fiore Basile <fiore.basile@gmail.com> - Fab Lab Toscana
//
// Based on Fabmodules:
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


define([],function(){


    var HPGLWriter = {};

    HPGLWriter.compile = function(config, context, path) {
        //globals.type = ".camm"
        var dx = 25.4 * context.width / context.dpi;
        var dy = 25.4 * context.height / context.dpi;
        var nx = context.width;
        var ny = context.height;
        var force = config.force;
        var velocity = config.velocity;
        var str = "PA;PA;!ST1;!FS" + force + ";VS" + velocity + ";\n"
        var scale = 40.0 * dx / (nx - 1.0) // 40/mm
        var ox = 0
        var oy = 0

        var xoffset = 0;
        var yoffset = 0;

        if (config.origin == origin.bottom_left) {
            xoffset = 40.0 * ox;
            yoffset = 40.0 * oy;
        } else if (config.origin == origin.bottom_right) {
            xoffset = 40.0 * (ox - dx);
            yoffset = 40.0 * oy;
        } else if (config.origin == origin.top_left) {
            xoffset = 40.0 * ox;
            yoffset = 40.0 * (oy - dy);
        } else if (config.origin == origin.top_right) {
            xoffset = 40.0 * (ox - dx);
            yoffset = 40.0 * (oy - dy);
        }
        //
        // loop over segments
        //
        for (var seg = 0; seg < path.length; ++seg) {
            x = xoffset + scale * path[seg][0][0];
            y = yoffset + scale * path[seg][0][1];
            str += "PU" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // move up to start point
            str += "PU" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // hack: repeat in case comm dropped
            str += "PD" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // move down
            str += "PD" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // hack: repeat in case comm dropped
                //
                // loop over points
                //
            for (var pt = 1; pt < path[seg].length; ++pt) {
                x = xoffset + scale * path[seg][pt][0];
                y = yoffset + scale * path[seg][pt][1];
                str += "PD" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // move down
                str += "PD" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // hack: repeat in case comm dropped
            }
            str += "PU" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // move up at last point
            str += "PU" + x.toFixed(0) + "," + y.toFixed(0) + ";\n"; // hack: repeat in case comm dropped
        }
        str += "PU0,0;\n"; // pen up to origin
        str += "PU0,0;\n"; // hack: repeat in case comm dropped
        return str;
    };
    
     
     
     
    return HPGLWriter;


});
