const vals = [
    ["-Infinity", -Infinity ],
    ["-1", -1 ],
    ['"-1"', "-1"],
    ['""', ""],
    ["[[]]", [[]] ], 
    ["[]", [] ], 
    ["false", false ], 
    ["0", 0 ],
    ["null", null ],
    ['"0"', "0" ], 
    ["[0]", [0] ], 
    ["[1]", [1] ],
    ['"1"', "1" ],
    ["1", 1 ],
    ["true", true ],
    ["Infinity", Infinity ],
    ["{}", {} ], 
    ['"false"', "false" ],
    ['"true"', "true" ],
    ["undefined", undefined ],
    ["NaN", NaN ],
    ["\\t\\r\\n", "\t\r\n"]
];

const cmp = (v1, v2) => v1 == v2;
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
const n = vals.length;
const r = 20; // diameter of grid squares
const p = 60; // padding space for labels
const f = 12; // font size

// color grid cells
for (let i = 0; i < n; i++) {
    let v1 = vals[i][1];
    for (let j = 0; j < n; j++) {
        let v2 = vals[j][1],
        		eq = cmp(v1, v2);
        ctx.fillStyle = eq ? "orange" : "white";
        ctx.fillRect(p+i*r,p+j*r,r,r);
    }
}

// draw labels
ctx.fillStyle = "black";
ctx.font = f + "px Helvetica";

for (let i = 0; i < n; i++) {
    let s = vals[i][0],
    		w = ctx.measureText(s).width;
    ctx.save();
    ctx.translate(p+i*r+r/2-f*0.4,p-w-2);
    ctx.rotate(3.14159/2);
    ctx.fillText(s, 0, 0);
    ctx.restore();
}

for (let i = 0; i < n; i++) {
    let s = vals[i][0],
    		w = ctx.measureText(s).width;
    ctx.fillText(s, p-w-2, p+i*r+r/2+f*0.4);
}

// draw grid lines
ctx.beginPath();
ctx.strokeStyle = "black";
for (let i = 0; i <= n; i++) {
    ctx.moveTo(p+r*i, p);
    ctx.lineTo(p+r*i, p+r*n);
    ctx.moveTo(p, p+r*i);
    ctx.lineTo(p+r*n, p+r*i);
}
ctx.stroke();
