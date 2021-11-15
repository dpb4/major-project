function setup() {
    let block = fs.readFileSync("block.txt");
    console.log(block.toString());
    prompt("press enter when ready");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

function randChar(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function printOut() {
    out = '';
    for (let i = 0; i < (height / 2); i++) {
        for (let j = 0; j < width; j++) {
            out = out.concat(outBlock[j][i]);
        }
    }
    for (let i = 0; i < (height / 2); i++) {
        out = insert(out, i*(width+1), '\n');
    }
    out = insert(out, 0, '\n\n\n');
    process.stdout.write(out);
}

function background(char = ' ') {
    outBlock = new Array(width).fill(0).map(() => new Array((height / 2)).fill(char));
}

function point(x, y, char) {
    if (x >= 0 && x < width && y >= 0 && y / 2 < (height / 2)) {
        x = Math.floor(x);
        y = Math.floor(y / 2);
        outBlock[x][y] = char;
    }
}

function line(x1, y1, x2, y2, char) {
    let d = Math.max(Math.abs(x2-x1), Math.abs(y2-y1));
    if (d != 0) {
        let roundingOff = 0.0001;
        let points = [];

        for (let i = 0; i < d*2 + 2; i += 2) {
            points.push(lerp(x1 + roundingOff, x2 + roundingOff, i/2/d));
            points.push(lerp(y1 + roundingOff, y2 + roundingOff, i/2/d));
            point(points[i], points[i+1], char);
        }

        return points;
    }
    return null;
}

function lerp(x1, x2, amt) {
    return x1 + (x2-x1) * amt;
}

function lineTriangle(x1, y1, x2, y2, x3, y3, char) {
    line(x1, y1, x2, y2, char);
    line(x2, y2, x3, y3, char);
    line(x3, y3, x1, y1, char);
}

const prompt = require('prompt-sync')();
const fs = require('fs');
const [width, height] = [128, 72];

module.exports = {
    setup,
    sleep,
    insert,
    randChar,
    printOut,
    background,
    point,
    line,
    lerp,
    lineTriangle
}