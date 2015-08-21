define(["require"], function(require) {

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

    var compile = function(config, context, path) {
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


    function send(code) {


    };

    return {
        settings: default_settings,
        presets: presets,
        compile: compile,
        send: send,
        commands: []
    };


});