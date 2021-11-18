let outBlock = [];

// possible gradients:
// .`:,;'_^"\></-!~=)(|j?}{][ti+l7v1%yrfcJ32uIC$zwo96sngaT5qpkYVOL40&mG8*xhedbZUSAQPFDXWK#RNEHBM@ 
// .:-=+*#%@
// .'`^",:;Il!i><~+_-?][}{1)(|\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$

let gradients = [
  '.:-=+*#%@',
  '.\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
  '.`:,;_^"><-!~=)(|j?}{][ti+l7v1%yrfcJ32uIC$zwo96sngaT5qpkYVOL40&mG8*xhedbZUSAQPFDXWK#RNEHBM@'
];

let currentGradient = gradients[0];

let currentFill;
let currentStroke;
let currentBG;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

function randChar(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function charSetup() {
  textAlign(LEFT, TOP);
  textFont(font);
  textSize(16);
  textLeading(textSize());

  charWidth = textWidth('0');
  charHeight = textAscent() + textDescent();

  resX = floor(windowWidth/charWidth) + 1;
  resY = floor(windowHeight/charHeight) + 1;

  outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill('='));

  document.getElementById('textCanvas').style.fontSize = `${textSize()}px`;
  document.getElementById('textCanvas').style.lineHeight = `${charHeight}px`;
}

function gradientStyle(s) {
  currentGradient = gradients[max(0, min(s, gradients.length-1))];
}

function colourMapper(f) {
  f = max(0, min(f, 1));

  return currentGradient[floor(f * (currentGradient.length-1))];
}

function printOut() {
  out = '';

  for (let i = 0; i < resY; i++) {
    for (let j = 0; j < resX; j++) {
      // console.log(outBlock[i][j]);
      out = out.concat(outBlock[j][i]);
      // console.log(out);
    }
  }

  for (let i = 0; i < resY; i++) {
    out = insert(out, i*(resX+1), '\n');
  }
  document.getElementById('textCanvas').innerHTML = out;
}

function charBackground(char = '.') {
  outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill(char));
}

function screen2Char(x, y) {
  return createVector(floor(x/charWidth), floor(y/charHeight));
}

function charPoint(x, y, char) {
  // TODO redo
  if (x >= 0 && x <= windowWidth && y >= 0 && y <= windowHeight) {
    // console.log("yuh");
    let p = screen2Char(x, y);

    outBlock[p.x][p.y] = char;
  }
}

function charLine(x1, y1, x2, y2, char) {
  let d = Math.max(Math.abs(x2-x1), Math.abs(y2-y1));
  if (d !== 0) {
    let roundingOff = 0.0001;
    let points = [];

    for (let i = 0; i < d*2 + 2; i += 2) {
      points.push(lerp(x1 + roundingOff, x2 + roundingOff, i/2/d));
      points.push(lerp(y1 + roundingOff, y2 + roundingOff, i/2/d));

      let p = screen2Char(points[i], points[i+1]);
      charPoint(points[i], points[i+1], char);
    }

    return points;
  }
  return null;
}

function charLineTriangle(x1, y1, x2, y2, x3, y3, char) {
  line(x1, y1, x2, y2, char);
  line(x2, y2, x3, y3, char);
  line(x3, y3, x1, y1, char);
}