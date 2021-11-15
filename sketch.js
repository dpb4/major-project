const funcs = require("./functions3.js");

funcs.setup();

let done = false;
let frame = 0;
let ang = 0;

while(!done) {
    funcs.background(' ');

    funcs.line(100, 40, 100 + (20 * Math.cos(ang)), 40 + (20 * Math.sin(ang)), 'o');
    funcs.lineTriangle(60, 10, 30, 20, 70, 60, "0");

    ang += Math.PI/1000;

    // dont touch
    funcs.printOut();
    frame++;
}