define([], function(){


    var GCodeWriter = {};
    
    
    GCodeWriter.default_config = {
         "diameter": "3.175",
         "cut_speed": "50",
         "plunge_speed": "25",
         "offsets": "1",
         "overlap": "0",
         "error": "1.5",
         "merge": "1.5",
         "depth": "3.175",
         "thickness": "11.11",
         "tool_number": "0",
         "coolant_on": "0"
    };
    
    GCodeWriter.presets = [{
    
    
    
    }];
    
    
    GCodeWriter.compile=function(config,context,path){
    
      //globals.type = ".nc"
      var dx = globals.width / globals.dpi
      var nx = globals.width
      var cut_speed = 60 * parseFloat(config.cut_speed) / 25.4
      var plunge_speed = 60 * parseFloat(config.plunge_speed) / 25.4
      var jog_height = parseFloat(config.mod_jog_height) / 25.4
      var spindle_speed = parseFloat(config.spindle_speed)
      var tool = config.tool_number
      var scale = dx / (nx - 1)
      var xoffset = 0
      var yoffset = 0
      var zoffset = 0
      str = "%\n" // tape start
      // Clear all state: XY plane, inch mode, cancel diameter compensation, cancel length offset
      // coordinate system 1, cancel motion, non-incremental motion, feed/minute mode
      str += "G17\n"
      str += "G20\n"
      str += "G40\n"
      str += "G49\n"
      str += "G54\n"
      str += "G80\n"
      str += "G90\n"
      str += "G94\n"
      str += "T" + tool + "M06\n" // tool selection, tool change
      str += "F" + cut_speed.toFixed(4) + "\n" // feed rate
      str += "S" + spindle_speed + "\n" // spindle speed
      if (findEl("mod_coolant_on").checked)
         str += "M08\n" // coolant on
      str += "G00Z" + jog_height.toFixed(4) + "\n" // move up before starting spindle
      str += "M03\n" // spindle on clockwise
      str += "G04 P1\n" // give spindle 1 second to spin up
      //
      // follow segments
      //
      for (var seg = 0; seg < path.length; ++seg) {
         var x = xoffset + scale * path[seg][0][0]
         var y = yoffset + scale * path[seg][0][1]
         var z = zoffset + scale * path[seg][0][2]
         //
         // move up to starting point
         //
         str += "Z" + jog_height.toFixed(4) + "\n"
         str += "G00X" + x.toFixed(4) + "Y" + y.toFixed(4) + "Z" + jog_height.toFixed(4) + "\n"
         //
         // move down
         //
         str += "G01Z" + z.toFixed(4) + " F" + plunge_speed.toFixed(4) + "\n"
         str += "F" + cut_speed.toFixed(4) + "\n" //restore XY feed rate
         for (var pt = 1; pt < path[seg].length; ++pt) {
            //
            // move to next point
            //
            x = xoffset + scale * path[seg][pt][0]
            y = yoffset + scale * path[seg][pt][1]
            z = zoffset + scale * path[seg][pt][2]
            str += "G01X" + x.toFixed(4) + "Y" + y.toFixed(4) + "Z" + z.toFixed(4) + "\n"
         }
      }
      //
      // finish
      //
      str += "G00Z" + jog_height.toFixed(4) + "\n" // move up before stopping spindle
      str += "M05\n" // spindle stop
      if (config.coolant_on).checked)
         str += "M09\n" // coolant off
      str += "M30\n" // program end and reset
      str += "%\n" // tape end
      //
      // return string
      //
      return str;
    
    };
    


    return GCodeWriter;


});
