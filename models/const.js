define([], function() {

    var Const = {};
    //
    // define colors
    //
    Const.R = 0;
    Const.G = 1;
    Const.B = 2;
    Const.A = 3;
    //
    // define word 0 states
    //
    Const.STATE = 0;
    Const.EMPTY = 0;
    Const.INTERIOR = (1 << 0);
    Const.EDGE = (1 << 1);
    Const.START = (1 << 2);
    Const.STOP = (1 << 3);
    //
    // define word 1 directions
    //
    Const.DIRECTION = 1;
    Const.NONE = 0;
    Const.NORTH = (1 << 0);
    Const.SOUTH = (1 << 1);
    Const.EAST = (1 << 2);
    Const.WEST = (1 << 3);
    //
    // define axes
    //
    Const.X = 0;
    Const.Y = 1;
    Const.Z = 2;


    return Const;
});
