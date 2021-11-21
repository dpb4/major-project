// TODO: circle, ellipse?, filled trianlge, filled rectangle

// font is needed to get resolution of characters

let outBlock = [];
let font;
let resX, resY;
let charWidth, charHeight;
// NOT ALLOWED CHARACTERS: ()[]{}<>- `?&
let gradients = [
  '.:=+*#%@',
  '.:;lIE8%',
  '.\':;LlIE9G8%',
];

let currentGradient = gradients[0];

let currentFill = currentGradient[currentGradient.length-1];
let currentStroke = currentGradient[currentGradient.length-1];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

function randChar() {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.`:,;_^"!~=|$&*@%#';
  
  return characters[round(random(characters.length))];
}

function charSetup(res = 16) {
  textAlign(LEFT, TOP);
  textFont(font);
  textSize(res);
  textLeading(textSize());

  charWidth = textWidth('0');
  charHeight = textAscent() + textDescent();

  resX = floor(windowWidth/charWidth) + 2;
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
  if (f !== 1) {
    return currentGradient[floor(f * currentGradient.length)];
  }
  return currentGradient[currentGradient.length-1];
}

function charFill(f) {
  if (typeof f === 'number') {
    currentFill = colourMapper(f);
  } else if (typeof f === 'string' && f.length === 1) {
    currentFill = f;
  }
}

function charStroke(f) {
  if (typeof f === 'number') {
    currentStroke = colourMapper(f);
  } else if (typeof f === 'string' && f.length === 1) {
    currentStroke = f;
  }

  return currentStroke;
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
  return [floor(x/charWidth), floor(y/charHeight)];
}

function charPoint(x, y, char = currentStroke) {
  if (x >= 0 && x <= windowWidth && y >= 0 && y <= windowHeight) {
    let p = screen2Char(x, y);
    outBlock[p[0]][p[1]] = char;
  }
}

function charLine(x1, y1, x2, y2, char = currentStroke) {
  let d = Math.max(Math.abs(x2-x1), Math.abs(y2-y1));
  if (d !== 0) {
    let roundingOff = 0.0001;
    let points = [];

    for (let i = 0; i < d*2 + 2; i += 2) {
      points.push(lerp(x1 + roundingOff, x2 + roundingOff, i/2/d));
      points.push(lerp(y1 + roundingOff, y2 + roundingOff, i/2/d));

      charPoint(points[i], points[i+1], char);
    }

    return points;
  }
  return null;
}

function charLineTriangle(x1, y1, x2, y2, x3, y3, char = currentStroke) {
  charLine(x1, y1, x2, y2, char);
  charLine(x2, y2, x3, y3, char);
  charLine(x3, y3, x1, y1, char);
}

function charLineRect(x, y, w, h, char = currentStroke) {
  charLine(x    , y    , x + w, y    , char);
  charLine(x    , y    , x    , y + h, char);
  charLine(x + w, y    , x + w, y + h, char);
  charLine(x    , y + h, x + w, y + h, char);
}

function charLineCircle(x, y, r, char = currentStroke) {
  let verts = floor(r/10 + 4); // subject to change
  let angStep = 1 / verts * TWO_PI;
  for (let i = 0; i < verts; i++) {
    let angle = i * angStep;

    charLine(x + r*cos(angle), y + r*sin(angle), x + r*cos(angle - angStep), y + r*sin(angle - angStep), char);
    lastAngle = angle;
  }
}