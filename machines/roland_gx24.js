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



define(["require","writers/hpgl"], function(require,HPGLWriter) {

    /* <br><b>output</b>
 <br>force (g):
 &nbsp;<input type="text" id="mod_force" size="3" value="45">
 <br>velocity (cm/s):
 &nbsp;<input type="text" id="mod_velocity" size="3" value="2">
 <br>origin:
 <br><input type="radio" name="origin" id="mod_top_left"> left top right <input type="radio" name="origin" id="mod_top_right">
 <br><input type="radio" name="origin" id="mod_bottom_left" checked> left bot right <input type="radio" name="origin" id="mod_bottom_right">
*/

    var origin = {};
    origin.top_left = "mod_top_left";
    origin.top_right = "mod_top_right";
    origin.bottom_left = "mod_bottom_left";
    origin.bottom_right = "mod_bottom_left";

    var default_settings = {
        type: "vinyl",
        force: 45,
        velocity: 2,
        origin: origin.top_left,
        diameter: 0.20
    };

    var presets = function() {
        return [{
            "code": "cut_vinyl",
            "diameter": 0.25,
            "force": 45,
            "velocity": 2], {
            "code": "cut_copper",
            "diameter": 0.25,
            "force": 65,
            "velocity": 2], {
            "code": "cut_epoxy",
            "diameter": 0.25,
            "force": 70,
            "velocity": 2]];
    };


    function render(config,context,path){
    
        return HPGLWriter.compile(config,context,path);
    
    };



    function send(code, sender) {

        

    };

    function sendCommand(cmd, sender){



    };

    function commandFactory() {

    
        return [];

    };


    return {
        render: render,
        settings: default_settings,
        presets: presets,
        send: send,
        commands: commandFactory
    };


});
