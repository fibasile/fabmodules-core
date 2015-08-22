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


    var EpsWriter= {};
    
    EpsWriter.defaultSettings = {
        diameter: 0,
        error: 1
    };
    
    
    EpsWriter.presets = [{
    
        label: "Outline",
        diameter: 0,
        error: 1,
    },{
       label: "Offset",
       diameter: 0.4,
       error: 1.1,
    },{
    //TODO Recheck params for halftone
        label: "Halftone",
        diameter: 0,
        error: 1
    }]
    
    
    EpsWriter.compile = function(config,context,path){
      //  globals.type = ".eps"
      var margin = 0.5
      var str = "%! path_eps output\n"
      var dx = context.width / context.dpi
      var dy = context.height / context.dpi
      var nx = context.width
      str += "%%BoundingBox: " + 72.0 * margin + " " + 72.0 * margin + " " + 72.0 * (margin + dx) + " " + 72.0 * (margin + dy) + "\n"
      str += "/m {moveto} def\n"
      str += "/l {lineto} def\n"
      str += "/g {setgray} def\n"
      str += "/s {stroke} def\n"
      str += "72 72 scale\n"
      str += margin + " " + margin + " translate\n"
      str += "1 setlinewidth\n"
      var scale = dx / (nx - 1)
      str += scale + " " + scale + " scale\n"
      for (var seg = 0; seg < path.length; ++seg) {
         str += path[seg][0][0] + " " + path[seg][0][1] + " m\n"
         for (var pt = 1; pt < path[seg].length; ++pt) {
            str += path[seg][pt][0] + " " + path[seg][pt][1] + " l\n"
         }
         str += "s\n"
      }
      return str
    
    };



    return EpsWriter;

});
