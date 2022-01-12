// TODO: change html text element to be instantiated from here (createP())

let outBlock = [];
let font;
let resX, resY;
let charWidth, charHeight;

let notAllowedCharacters = '()[]{}<>- `?&';
let gradients = [
  '.:=+*#%@',
  '.:;lIE8%',
  '.\':!;LlIE9G8%',
];

const CHAR = 'char';

let currentTranslation = [0, 0];
let coordinateMode = 'screen';

let currentGradient = gradients[0];
let currentFill = currentGradient[currentGradient.length-1];
let currentStroke = currentGradient[currentGradient.length-1];

const cubeVertices = [
  0, 0, 0,
  0, 0, 1,
  0, 1, 0,
  0, 1, 1,
  1, 0, 0,
  1, 0, 1,
  1, 1, 0,
  1, 1, 1
];

const cubeEdges = [
  0, 1,
  0, 2,
  0, 4,
  1, 3,
  1, 5,
  2, 3,
  2, 6,
  3, 7,
  4, 5,
  4, 6,
  5, 7,
  6, 7
];

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

  resX = floor(windowWidth/charWidth) + 1;
  resY = floor(windowHeight/charHeight) + 1;

  outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill('.'));

  document.getElementById('textCanvas').style.fontSize = `${textSize()}px`;
  document.getElementById('textCanvas').style.lineHeight = `${charHeight}px`;

  document.addEventListener('contextmenu', event => event.preventDefault());
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
      out = out.concat(outBlock[j][i]);
    }
  }

  for (let i = 0; i < resY; i++) {
    out = insert(out, i*(resX+1), '\n');
  }
  document.getElementById('textCanvas').innerHTML = out;
}

function charBackground(f = 0) {
  if (typeof f === 'number') {
    outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill(colourMapper(f)));
  } else if (typeof f === 'string' && f.length === 1) {
    outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill(f));
  }

  // outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill(char));
}

function setCoordinateMode(mode) {
  if (mode === SCREEN) {
    coordinateMode = SCREEN;
  } else if (mode === CHAR) {
    coordinateMode = CHAR;
  }
}

function screen2Char(x, y) {
  return [floor(x/charWidth), floor(y/charHeight)];
}

function charTranslate(x, y) {
  currentTranslation = [x, y];
}

/**
 * Places a point at a given location on the text canvas.
 * @param {number} x - the x coordinate of the point
 * @param {number} y - the y coordinate of the point
 * @param {string} [char] - optional - the specific character to put on the point. if not included, it will use currentStroke
 * @param {string} [mode] - optional - either "SCREEN" or "CHAR". "SCREEN" (default) uses the x and y as pixel coordinates. "CHAR" uses them as character coordinates
 */
function charPoint(x, y, char = currentStroke, mode = 'SCREEN') {
  if (mode === 'SCREEN') {
    if (x + currentTranslation[0] >= 0 && x + currentTranslation[0] <= windowWidth && y + currentTranslation[0] >= 0 && y + currentTranslation[0] <= windowHeight) {
      let p = screen2Char(x + currentTranslation[0], y + currentTranslation[1]);
      outBlock[p[0]][p[1]] = char;
    }
  } else if (mode === 'CHAR') {
    if (x >= 0 && x < resX && y >= 0 && y < resY) { 
      outBlock[floor(x)][floor(y)] = char;
    }
  }
}

function charLine(x1, y1, x2, y2, char = currentStroke) {
  let d = max(abs(x2-x1)/charWidth, abs(y2-y1)/charHeight);
  if (d !== 0) {
    let roundingOff = 0.0001;
    let points = [];

    for (let i = 0; i < floor(d) + 1; i++) {
      points.push(screen2Char(lerp(x1 + roundingOff + currentTranslation[0], x2 + roundingOff + currentTranslation[0], i/d), lerp(y1 + roundingOff + currentTranslation[1], y2 + roundingOff + currentTranslation[1], i/d)));
      charPoint(points[i][0], points[i][1], char, 'CHAR');
    }

    return points;
  }
  return [];
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

function charLineCircle(x, y, radius, char = currentStroke) {
  let verts = floor(radius/10 + 4); // subject to change
  let angStep = 1 / verts * TWO_PI;
  let points = [];
  for (let i = 0; i < verts; i++) {
    let angle = i * angStep;

    points.push(charLine(x + radius*cos(angle), y + radius*sin(angle), x + radius*cos(angle - angStep), y + radius*sin(angle - angStep), char));
    lastAngle = angle;
  }

  return points;
} 

function charLineEllipse(x, y, w, h, char = currentStroke) {
  w = abs(w);
  h = abs(h);

  let verts = floor(max(w, h)/10 + 4); // subject to change
  let angStep = 1 / verts * TWO_PI;
  let points = [];

  for (let i = 0; i < verts; i++) {
    let angle = i * angStep;

    points.push(charLine(x + w*cos(angle), y + h*sin(angle), x + w*cos(angle - angStep), y + h*sin(angle - angStep), char));
    lastAngle = angle;
  }

  return points;
}

function sortByY(points) {
  let yMap = new Map();

  for (let i = 0; i < points.length; i++) {
    if (yMap.has(points[i][1])) {
      yMap.get(points[i][1]).push(points[i][0]);
    } else {
      yMap.set(points[i][1], [points[i][0]]);
    }
  }

  return yMap;
}

function charTriangle(x1, y1, x2, y2, x3, y3) {
  let points = [[x1, y1], [x2, y2], [x3, y3]];
  // sort the points by descending y value
  points.sort((a, b) => b[1]-a[1]);
  
  let lines = [
    charLine(points[2][0], points[2][1], points[0][0], points[0][1]), 
    charLine(points[2][0], points[2][1], points[1][0], points[1][1]), 
    charLine(points[1][0], points[1][1], points[0][0], points[0][1])
  ];

  fillShape(sortByY(lines.flat()), currentFill);
}

function charRect(x, y, w, h) {
  // if (w < 0) {
  //   console.log(w/charWidth, x/charWidth + w/charWidth);
  //   w = -w;
  //   x -= w;
  //   console.log(w/charWidth, x/charWidth + w/charWidth);
  // }
  // if (h < 0) {
  //   h = -h;
  //   y -= h;
  // }

  // TODO maybe dont do this, dont want to reassign variables
  [x, y] = screen2Char(x + currentTranslation[0], y + currentTranslation[1]);
  [w, h] = screen2Char(w, h);

  for (let curY = y; curY <= y + h; curY++) {
    for (let curX = x; curX <= x + w; curX++) {
      if (curY === y || curY === y + h || curX === x || curX === x + w) {
        charPoint(curX, curY, currentStroke, "CHAR");
      } else {
        charPoint(curX, curY, currentFill, "CHAR");
      }

    }
  }
}

function fillShape(points, char) {
  for (let [y, xs] of points)  {
    // sort in ascending order 
    xs.sort((a, b) => a-b);

    // make sure there is always a pair of points
    if (xs.length === 1) {
      xs.push(xs[0]);
    }

    for (let x = xs[0]; x < xs[xs.length-1]; x++) {
      if (!xs.includes(x)) {
        charPoint(x, y, char, 'CHAR');
      }
    }
  }
}

function gradientTest() {
  for (let i = 0; i < width; i += charWidth) {
    charStroke(i/width);
    charLine(i, 0, i, height);
  }
}

function charCircle(x, y, radius) {
  let points = charLineCircle(x, y, radius, currentStroke);

  points = sortByY(points.flat());
  fillShape(points, currentFill);
}

function charEllipse(x, y, w, h) {
  let points = charLineEllipse(x, y, w, h, currentStroke);

  points = sortByY(points.flat());
  fillShape(points, currentFill);
}

function putText(text, x, y, mode = "SCREEN", safetyOverride = false) {
  let nx = x;
  let ny = y;

  if (mode === "SCREEN") {
    nx = x/charWidth;
    ny = y/charHeight;
  }
  for (let i = 0; i < text.length; i++) {
    if (!safetyOverride) {
      if (!notAllowedCharacters.includes(text[i])) {
        charPoint(nx + i, ny, text[i], mode);
      }
    } else {
      charPoint(nx + i, ny, text[i], mode);
    }
  }
}

function matrixVectorMult(mat, vec) {
  if (mat.length !== vec.length) {
    throw "Rows do not match columns";
  }
  
  let newVec = [...vec].fill(0);
  
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      newVec[i] += mat[i][j] * vec[j];
    }
  }
  
  return newVec;
}

function getColumn(m, col) {
  let out = [];

  for (let i = 0; i < m.length; i++) {
    out.push(m[i][col]);
  }

  return out;
}
function vectorDot(v1, v2) {
  if (v1.length !== v2.length) {
    console.log(v1, v2);
    throw "Vectors do not have matching length";
  }

  let num = 0;

  for (let i = 0; i < v1.length; i++) {
    num += v1[i] * v2[i];
  }

  return num;
}

function matrixDot() {
  // TODO support for multiple
  let dimension = [arguments[0].length, arguments[0][0].length];
  let minDim = min(dimension);
  let newM = new Array(minDim).fill(0).map(x => new Array(minDim).fill(0));

  // // input checking
  // for (let i = 0; i < arguments.length; i++) {
  //   if (arguments[i].length !== dimension[1] || arguments[i][0].length !== dimension[0]) {
  //     throw "Not all matrices are the right size";
  //   }
  // }

  // passed:
  for (let ny = 0; ny < minDim; ny++) {
    for (let nx = 0; nx < minDim; nx++) {
      newM[nx][ny] = vectorDot(arguments[0][nx], getColumn(arguments[1], [ny]));
    }
  }

  return newM;
}

function createRotationMatrix(axis, angle) {
  if (axis === 'x') {
    return [
      [1,           0,           0],
      [0,  cos(angle), -sin(angle)],
      [0,  sin(angle),  cos(angle)]
    ];
  } else if (axis === 'y') {
    return [
      [ cos(angle), 0,  sin(angle)],
      [          0, 1,           0],
      [-sin(angle), 0,  cos(angle)]
    ];
  } else if (axis === 'z') {
    return [
      [ cos(angle), -sin(angle), 0],
      [ sin(angle),  cos(angle), 0],
      [          0,           0, 1]
    ];
  }
}

function mat4(mat3) {
  // TODO redo this, it isnt helpful
  if (mat3.length !== 3 || mat3[0].length !== 3) {
    throw "Input was not a 3x3 matrix";
  }
  for (let i = 0; i < 3; i++) {
    mat3[i].push(0);
  }
  mat3.push([0, 0, 0, 1]);
  return mat3;
}

function mat3(mat4) {
  if (mat3.length !== 4 || mat3[0].length !== 4) {
    throw "Input was not a 4x4 matrix";
  }

  for (let i = 0; i < 3; i++) {
    mat4[i].pop();
  }
  mat4.pop();

  return mat4;
}

function createIdentityMatrix(dimension) {
  let out = new Array(dimension).fill(0).map(x => new Array(dimension).fill(0));

  for (let i = 0; i < dimension; i++) {
    out[i][i] = 1;
  }

  return out;
}

function createTranslationMatrix(dimension, args) {
  let m = createIdentityMatrix(dimension);
  let lastIndex = m.length-1;

  for (let i = 0; i < dimension-1; i++) {
    m[i][lastIndex] = arguments[i+1];
  }

  return m;
}

function createScaleMatrix(dimension, args) {
  let m = createIdentityMatrix(dimension);

  for (let i = 0; i < arguments.length-1; i++) {
    m[i][i] = arguments[i+1];
  }

  return m;
}

function setVecDimension(vec = [], d=4) {
  if (vec.length > d) {
    return vec.slice(0, d);
  } else if (vec.length < d) {
    let vl = vec.length;

    for (let i = 0; i < d-vl; i++) {
      vec.push(1);
    }
  }
  return vec;
}

function getCubeVertices(size) {
  return cubeVertices.map(x => x * size);
}

function logMatrix(mat) {
  // TODO fix spacing
  console.log(`Size: ${mat.length}x${mat[0].length}`);

  let maxLength = -1;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      maxLength = max(mat[i][j].toFixed(1).length, maxLength);
    }
  }
  let out = '';
  
  for (let i = 0; i < mat.length; i++) {
    out += "| ";
    for (let j = 0; j < mat[i].length; j++) {
      out += mat[i][j].toFixed(1);

      if (j !== mat[i].length-1) {
        out += ' '.repeat(maxLength - mat[i][j].toFixed(1).length + 1);
      } else {
        out += ' ';
      }
    }
    out += '|\n';
  }
  console.log(out);
}

function generateProjectionMatrix(horizontalFOV, aspectRatio, nearClip, farClip) {
  // vfov = 2 * tan-1(h/w * tan(hfov / 2))
  horizontalFOV *= PI / 180;
  let verticalFOV = 2 * atan(Math.pow(aspectRatio, -1) * tan(horizontalFOV / 2));

  let top = tan(horizontalFOV/2) * nearClip;
  let bottom = -top;
  let right = top * aspectRatio;
  let left = bottom * aspectRatio;

  console.log(top, bottom, left, right);

  let A = nearClip / right;
  let B = nearClip / top;
  let C = -(farClip + nearClip) / (farClip - nearClip);
  let D = -(2 * farClip * nearClip) / (farClip - nearClip);
  
  return [
    [A, 0, 0, 0],
    [0, B, 0, 0],
    [0, 0, C, D],
    [0, 0, -1, 0]
  ];
}

function textLineSplitter(text, lineWidth) {
  let lines = new Array(text.split(' ').length).fill('');

  let currentWidth = 0;
  let currentLine = 0;

  for (let word of text.split(' ')) {
    if (word.length + currentWidth < lineWidth) {

      lines[currentLine] += word + ' ';
      currentWidth += word.length + 1;
    } else if (word.length + currentWidth === lineWidth) {

      lines[currentLine] += word;
      currentLine++;
      currentWidth = 0;
    } else {

      lines[currentLine] = lines[currentLine].slice(0, -1);
      currentLine++;
      lines[currentLine] += word + ' ';
      currentWidth = word.length + 1;
    }
  }

  lines = lines.filter(l => l !== '');
  return lines;
}

function charTextBox(text, x, y, width, background) {
  let newWidth = floor(width / charWidth);
  let lines = textLineSplitter(text, newWidth - 4);

  if (background === undefined) {
    charLineRect(x * charWidth, y * charHeight, width, (lines.length + 3) * charHeight);
  } else {
    let pf = currentFill;
    charFill(background);
    charRect(x * charWidth, y * charHeight, width, (lines.length + 3) * charHeight);
    charFill(pf);
  }
    
  for (let i = 0; i < lines.length; i++) {
    putText(lines[i], x + 2, y + i + 2, "CHAR", true);
  }
}