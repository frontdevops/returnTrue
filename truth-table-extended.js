// <canvas id="drawCanvas" width="1500" height="1500" />

var cmp_eq = function(v1, v2) { return v1 == v2; };
var cmp_lt = function(v1, v2) { return v1 < v2; };
var cmp_gt = function(v1, v2) { return v1 > v2; };
var cmp_le = function(v1, v2) { return v1 <= v2; };
var cmp_ge = function(v1, v2) { return v1 >= v2; };
var cmp_ne = function(v1, v2) { return v1 != v2; };
var new_date = new Date();
var vals = [
    ["-Infinity", function() { return -Infinity; }],
    ["new Number(-Infinity)",function() { return new Number(-Infinity); }],
    ["[-Infinity]", function() { return [-Infinity]; }],
    ['"-Infinity"', function() { return "-Infinity"; }],
//    ["[-Infinity,0]", function() { return [-Infinity,0]; }],
    ["-1", function() { return -1; }],
    ["new Number(-1)",function() { return new Number(-1); }],
    ["[-1]",function() { return [-1]; }],
    ['"-1"', function() { return "-1"; }],
//    ["[-1,0]", function() { return [-1,0]; }],
    ["-0.5", function() { return -0.5; }],
    ["new Number(-0.5)",function() { return new Number(-0.5); }],
    ["[-0.5]", function() { return [-0.5]; }],
    ['"-0.5"', function() { return "-0.5"; }],
//    ["[-0.5,0]", function() { return [-0.5,0]; }],
    ["[]", function() { return []; }],
    ["[[]]", function() { return [[]]; }],
    ["[null]", function() { return [null]; }],
    ["[undefined]", function() { return [undefined]; }],
    ['[""]', function() { return [""]; }],
    ['""', function() { return ""; }],
//    ["[[],0]", function() { return ["",0]; }],
//    ["[null,0]", function() { return ["",0]; }],
//    ["[undefined,0]", function() { return ["",0]; }],
//    ['["",0]', function() { return ["",0]; }],
    ['new RegExp("")', function() { return new RegExp(""); }],
    ["/.*/", function() { return /.*/; }],
    ["null", function() { return null; }],
    ['new Date(0)', function() { return new Date(0); }],
    ["false", function() { return false; }],
    ["0", function() { return 0; }],
    ["new Number(0)",function() { return new Number(0); }],
    ["[0]", function() { return [0]; }],
    ['"0"', function() { return "0"; }],
//    ["[0,-1]", function() { return [0,-1]; }],
//    ["[0,0]", function() { return [0,0]; }],
//    ['["0",0]', function() { return ["0",0]; }],
//    ["[0,1]", function() { return [0,1]; }],
//    ["[0.5,0]", function() { return [0.5,0]; }],
//    ['["0.5",0]', function() { return ["0.5",0]; }],
    ["0.5", function() { return 0.5; }],
    ["new Number(0.5)",function() { return new Number(0.5); }],
    ["[0.5]", function() { return [0.5]; }],
    ['"0.5"', function() { return "0.5"; }],
    ['new Date(1)', function() { return new Date(1); }],
    ["true", function() { return true; }],
    ["1",function() { return 1; }],
    ["new Number(1)",function() { return new Number(1); }],
    ["[1]", function() { return [1]; }],
    ['"1"', function() { return "1"; }],
//    ["[1,0]", function() { return [1,0]; }],
//    ['["1",0]', function() { return ["1",0]; }],
    ['["A"]', function() { return ["A"]; }],
    ['"A"', function() { return "A"; }],
    ["new Error()", function() { return new Error(); }],
    ['"Error"', function() { return "Error"; }],
    ["Infinity", function() { return Infinity; }],
    ["new Number(Infinity)",function() { return new Number(Infinity); }],
    ["[Infinity]", function() { return [Infinity]; }],
    ['"Infinity"', function() { return "Infinity"; }],
//    ["[Infinity,0]", function() { return [Infinity,0]; }],
    ["[NaN]", function() { return [NaN]; }],
    ['"NaN"', function() { return "NaN"; }],
//    ["[NaN,0]", function() { return [NaN,0]; }],
    ["new ArrayBuffer(0)", function() { return new ArrayBuffer(0); }],
    ['"[object ArrayBuffer]"', function() { return "[object ArrayBuffer]"; }],
    ["{}", function() { return {}; }],
    ["{0:0}", function() { return {0:0}; }],
    ['"[object Object]"', function() { return "[object Object]"; }],
//    ["[{},0]", function() { return [{},0]; }],
    ['"false"', function() { return "false"; }],
//    ["[false,0]", function() { return [false,0]; }],
    ["function(){}", function() { return function(){}; }],
    ['"function (){}"', function() { return "function (){}"; }],
    ['"true"', function() { return "true"; }],
//    ["[true,0]", function() { return [true,0]; }],
    ["undefined", function() { return undefined; }],
    ["NaN", function() { return NaN; }],
];

var canvas = document.getElementById("drawCanvas");
var ctx = canvas.getContext("2d");
var n = vals.length;
var r = 16; // diameter of grid squares
var p = 120; // padding space for labels

// color grid cells
for (var i = 0; i < n; i++) {
    var v1 = vals[i][1]();
    for (var j = 0; j < n; j++) {
        var v2 = vals[j][1]();
        var eq = cmp_eq(v1, v2);
        var lt = cmp_lt(v1, v2);
        var gt = cmp_gt(v1, v2);
        var le = cmp_le(v1, v2);
        var ge = cmp_ge(v1, v2);
        var ne = cmp_ne(v1, v2);
        ctx.fillStyle =
             eq && le && ge    && !(lt || gt || ne) ?
            "yellow" :    // equals
             lt && le && ne    && !(eq || gt || ge) ?
            "orange" :    // less than
             gt && ge && ne    && !(eq || lt || le) ?
            "silver" :    // greater than
             ne    && !(eq || lt || gt || le || ge) ?
            "grey" :      // non-comparable
             eq    && !(lt || gt || le || ge || ne) ?
            "cyan" :      // broken equals
             le && ge && ne    && !(eq || lt || gt) ?
            "green" :     // broken non-comp
            "white";
        ctx.fillRect(p+i*r,p+j*r,r,r);
    }
}

// draw labels
ctx.fillStyle = "black";
var f = 12;
ctx.font = f + "px Helvetica";
for (var i = 0; i < n; i++) {
    var s = vals[i][0];
    var w = ctx.measureText(s).width;
    ctx.save();
    ctx.translate(p+i*r+r/2-f*0.4,p-w-2);
    ctx.rotate(3.14159/2);
    ctx.fillText(s, 0, 0);
    ctx.restore();
}
for (var i = 0; i < n; i++) {
    var s = vals[i][0];
    var w = ctx.measureText(s).width;
    ctx.fillText(s, p-w-2, p+i*r+r/2+f*0.4);
}

// draw grid lines
ctx.beginPath();
ctx.strokeStyle = "black";
for (var i = 0; i <= n; i++) {
    ctx.moveTo(p+r*i, p);
    ctx.lineTo(p+r*i, p+r*n);
    ctx.moveTo(p, p+r*i);
    ctx.lineTo(p+r*n, p+r*i);
}
ctx.stroke();
