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
