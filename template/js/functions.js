// TODO: check coordiante mode for putText, add image function, update charPoint documentation

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

/**
 * `charFill()` changes the inside colour of any shapes drawn. Analagous to `fill()` in p5. If `col` is a float between 0 and 1, it will use `colourMapper()` to determine the corresponding character. Otherwise if `col` is a character, it will fill shapes with that character directly. Beware `notAllowedCharacters` if using direct characters.
 * @param {number | string} col Number between 0 and 1 *or* character
 */
function charFill(col) { 
  if (typeof col === 'number') {
    currentFill = colourMapper(col);
  } else if (typeof col === 'string' && col.length === 1) {
    currentFill = col;
  }
}

/**
 * `charStroke()` changes the outline colour of any shapes drawn. Analagous to `stroke()` in p5. If `col` is a float between 0 and 1, it will use `colourMapper()` to determine the corresponding character. Otherwise if `col` is a character, it will outline shapes with that character directly. Beware `notAllowedCharacters` if using direct characters.
 * @param {number | string} col Number between 0 and 1 *or* character
 */
function charStroke(col) { 
  if (typeof col === 'number') {
    currentStroke = colourMapper(col);
  } else if (typeof col === 'string' && col.length === 1) {
    currentStroke = col;
  }
}
/**
 * `charBackground()` changes the background colour of the sketch. Analagous to `background()` in p5. If `f` is a float between 0 and 1, it will use `colourMapper()` to determine the corresponding character. Otherwise if `f` is a character, it will set the background to that character directly. Beware `notAllowedCharacters` if using direct characters.
 * @param {number | string} col Number between 0 and 1 *or* character
 */
function charBackground(col = 0) {
  if (typeof col === 'number') {
    outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill(colourMapper(col)));
  } else if (typeof col === 'string' && col.length === 1) {
    outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill(col));
  }
}

/**
 * `gradientStyle()` changes the look of the sketch by selecting a different gradient from the gradients array.
 * @param {number} index Index of desired gradient in the `gradients` array
 */
function gradientStyle(index) {
  currentGradient = gradients[max(0, min(index, gradients.length-1))];
}

/**
 * `gradientTest()` is a function to help visualize a gradient. It will draw a series of vertical lines all across the screen, and each line will be coloured according to the current gradient. This allows you to see exactly how your gradient looks all lined up as well as compare adjacent colours.
 */
function gradientTest() {
  for (let i = 0; i < width; i += charWidth) {
    charStroke(i/width);
    charLine(i, 0, i, height);
  }
}

/**
 * `colourMapper()` takes in a float between 0 and 1 value and returns the corresponding character from `currentGradient`. 0 is the darkest, 1 is the lightest.
 * @param {number} f Number between 0 and 1.
 * @returns Character from `currentGradient`.
 */
function colourMapper(f) {
  f = max(0, min(f, 1));
  if (f !== 1) {
    return currentGradient[floor(f * currentGradient.length)];
  }
  return currentGradient[currentGradient.length-1];
}

/**
 * Places a point at a given location on the text canvas.
 * @param {number} x - the x coordinate of the point
 * @param {number} y - the y coordinate of the point
 * @param {string} [char] - optional - the character to use as the point. Set to `currentStroke` by default.
 * @param {string} [mode] - optional - either SCREEN or CHAR. Controls which coordinate mode to use.
 */
function charPoint(x, y, char = currentStroke, mode = coordinateMode) { //working
  if (mode === 'screen') {
    if (x + currentTranslation[0] >= 0 && x + currentTranslation[0] <= width && y + currentTranslation[1] >= 0 && y + currentTranslation[1] <= height) {
      let p = screen2Char(x + currentTranslation[0], y + currentTranslation[1]);
      outBlock[p[0]][p[1]] = char;
    }
  } else if (mode === 'char') {
    if (x + currentTranslation[0] / charWidth >= 0 && x + currentTranslation[0] / charWidth < resX && y + currentTranslation[1] / charHeight >= 0 && y + currentTranslation[1] / charHeight < resY) { 
      outBlock[floor(x + currentTranslation[0] / charWidth)][floor(y + currentTranslation[1] / charHeight)] = char;
    }
  }
}

/**
 * `charLine()` draws a line between two given points. By default uses `currentStroke` as the character but it can be set directly with `char`.
 * @param {number} x1 X coordinate of first point
 * @param {number} y1 Y coordinate of first point
 * @param {number} x2 X coordinate of second point
 * @param {number} y2 Y coordinate of second point
 * @param {string} [char] optional - Character to use for the line. By default set to `currentStroke`.
 * @returns {array} A list of all the coordinates of the points that the line drew (in character coordinates).
 */
function charLine(x1, y1, x2, y2, char = currentStroke) { //working
  let d;

  if (coordinateMode === 'screen') {
    d = max(abs(x2-x1)/charWidth, abs(y2-y1)/charHeight);
  } else if (coordinateMode === 'char') {
    d = max(abs(x2-x1), abs(y2-y1));
  }
  if (d !== 0) {
    let roundingOff = 0.0001;
    let points = [];
    
    for (let i = 0; i < floor(d) + 1; i++) {
      if (coordinateMode === 'screen') {
        points.push(screen2Char(lerp(x1 + roundingOff, x2 + roundingOff, i/d), lerp(y1 + roundingOff, y2 + roundingOff, i/d)));
      } else if (coordinateMode === 'char') {
        points.push([floor(lerp(x1 + roundingOff, x2 + roundingOff, i/d)), floor(lerp(y1 + roundingOff, y2 + roundingOff, i/d))]);
      }
      charPoint(points[i][0], points[i][1], char, CHAR);
    }
    
    return points;
  }
  return [];
}

/**
 * `charLineTriangle()` draws ***only the outline*** of a triangle on the sketch. It is essentially the same as `charTriangle()`, but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart.
 * @param {number} x1 X coordinate of first point
 * @param {number} y1 Y coordinate of first point
 * @param {number} x2 X coordinate of second point
 * @param {number} y2 Y coordinate of second point
 * @param {number} x3 X coordinate of third point
 * @param {number} y3 Y coordinate of third point
 * @param {string} [char] optional - Character to use for the lines. By default set to `currentStroke`.
 */
function charLineTriangle(x1, y1, x2, y2, x3, y3, char = currentStroke) { //working
  charLine(x1, y1, x2, y2, char);
  charLine(x2, y2, x3, y3, char);
  charLine(x3, y3, x1, y1, char);
}

/**
 * `charLineRect()` draws ***only the outline*** of a rectangle on the sketch. It is essentially the same as [`charRect()`](charRect.md), but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart. 
 * @param {number} x X coordinate of top left point
 * @param {number} y Y coordinate of top left point
 * @param {number} w Width of the rectangle
 * @param {number} h Height of the rectangle
 * @param {string} [char] optional - Character to use for the lines. By default set to `currentStroke`.
 */
function charLineRect(x, y, w, h, char = currentStroke) { //working
  charLine(x    , y    , x + w, y    , char);
  charLine(x    , y    , x    , y + h, char);
  charLine(x + w, y    , x + w, y + h, char);
  charLine(x    , y + h, x + w, y + h, char);
}

/**
 * `charLineCircle()` draws ***only the outline*** of a circle on the sketch centered at `x`, `y`. It is essentially the same as [`charCircle()`](charRect.md), but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart. Note: the radius **is** affected by [`setCoordinateMode()`](setCoordinateMode) and it is expressed **horizontally**. That is, that if `coordinateMode` is set to `CHAR`, `r` will refer to the number of characters going horizontally as the radius.
 * @param {number} x X coordinate of the centre point
 * @param {number} y Y coordinate of the centre point
 * @param {number} radius Radius of the circle
 * @param {string} [char] optional - Character to use for the outline. By default set to `currentStroke`.
 * @returns {array} A list of the coordinates (in char coordinates) of all the points it drew
 */
function charLineCircle(x, y, radius, char = currentStroke) { //working
  let verts;
  let verticalRadius;

  if (coordinateMode === 'screen') {
    verts = floor(radius/10 + 4); // subject to change
    verticalRadius = radius;
  } else if (coordinateMode === 'char') {
    verts = floor(radius * charWidth/10 + 4); // subject to change
    verticalRadius = radius * charWidth / charHeight;
  }

  let angStep = 1 / verts * TWO_PI;
  let points = [];
  for (let i = 0; i < verts; i++) {
    let angle = i * angStep;
    
    points.push(charLine(x + radius*cos(angle), y + verticalRadius*sin(angle), x + radius*cos(angle - angStep), y + verticalRadius*sin(angle - angStep), char));
  }
  
  return points;
} 

/**
 * `charLineEllipse()` draws ***only the outline*** of an ellipse on the sketch. It is essentially the same as [`charEllipse()`](charRect.md), but it only draws the outline and cannot be filled. If you only want to draw the outline of a shape, this is more efficient than its filled counterpart. Note: both the width and the height **must** be positive and both are affected by [`setCoordinateMode()`](setCoordinateMode).
 * @param {number} x X coordinate of the centre point
 * @param {number} y Y coordinate of the centre point
 * @param {number} w Width of the ellipse
 * @param {number} h Height of the ellipse
 * @param {string} [char] optional - Character to use for the lines. By default set to `currentStroke`.
 * @returns {array} A list of the coordinates (in char coordinates) of all the points it drew
 */
function charLineEllipse(x, y, w, h, char = currentStroke) { //working
  let newW = abs(w);
  let newH = abs(h);
  
  let verts;
  if (coordinateMode === 'screen') {
    verts = floor(max(newW, newH)/10 + 4); // subject to change
  } else if (coordinateMode === 'char') {
    if (newW * charWidth > newH * charHeight) {
      verts = floor(newW * charWidth/10 + 4); // subject to change
    } else {
      verts = floor(newH * charHeight/10 + 4); // subject to change
    }
  }
  let angStep = 1 / verts * TWO_PI;
  let points = [];
  
  for (let i = 0; i < verts; i++) {
    let angle = i * angStep;
    
    points.push(charLine(x + newW*cos(angle), y + newH*sin(angle), x + newW*cos(angle - angStep), y + newH*sin(angle - angStep), char));
  }
  
  return points;
}

/**
 * `charTriangle()` draws a triangle on the sketch. Analagous to `triangle()` in p5.
 * @param {number} x1 X coordinate of first point
 * @param {number} y1 Y coordinate of first point
 * @param {number} x2 X coordinate of second point
 * @param {number} y2 Y coordinate of second point
 * @param {number} x3 X coordinate of third point
 * @param {number} y3 Y coordinate of third point
 */
function charTriangle(x1, y1, x2, y2, x3, y3) { //working
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

/**
 * `charRect()` draws a rectangle on the sketch. Analagous to `rect()`in p5. Note: both the width and the height **must** be positive and both are affected by [`setCoordinateMode()`](setCoordinateMode).
 * @param {number} x X coordinate of top left point
 * @param {number} y Y coordinate of top left point
 * @param {number} w Width of the rectangle
 * @param {number} h Height of the rectangle
 */
function charRect(x, y, w, h) { //working
  let newX, newY, newW, newH;
  
  if (coordinateMode === 'screen') {
    [newX, newY] = screen2Char(x, y);
    [newW, newH] = screen2Char(w, h);
  } else {
    [newX, newY] = [x/charWidth, y/charHeight];
    [newW, newH] = [w, h];
  }


  for (let curY = newY; curY <= newY + newH; curY++) {
    for (let curX = newX; curX <= newX + newW; curX++) {
      if (curY === newY || curY === newY + newH || curX === newX || curX === newX + newW) {
        charPoint(curX, curY, currentStroke, CHAR);
      } else {
        charPoint(curX, curY, currentFill, CHAR);
      }

    }
  }
}

/**
 * `charCircle()` draws a circle on the sketch centered at `x`, `y`. Analagous to `circle()` in p5. Note: the radius **is** affected by [`setCoordinateMode()`](setCoordinateMode) and it is expressed **horizontally**. That is, that if `coordinateMode` is set to `CHAR`, `r` will refer to the number of characters going horizontally as the radius.
 * @param {number} x X coordinate of the centre point
 * @param {number} y Y coordinate of the centre point
 * @param {number} radius Radius of the circle
 */
function charCircle(x, y, radius) { //working
  let points = charLineCircle(x, y, radius, currentStroke);

  points = sortByY(points.flat());
  fillShape(points, currentFill);
}

/**
 * `charEllipse()` draws an ellipse on the sketch. Analagous to `ellipse()`in p5. Note: both the width and the height are affected by [`setCoordinateMode()`](setCoordinateMode).
 * @param {number} x X coordinate of the centre point
 * @param {number} y Y coordinate of the centre point
 * @param {number} w Width of the ellipse
 * @param {number} h Height of the ellipse
 */
function charEllipse(x, y, w, h) { //working
  let points = charLineEllipse(x, y, w, h, currentStroke);

  points = sortByY(points.flat());
  fillShape(points, currentFill);
}

/**
 * `putText()` places a string at a given location on the sketch. It starts from the given location and writes the string to the right. It does not do any text wrapping, it just places a line of text.
 * @param {string} text The text to be displayed
 * @param {number} x The X coordinate of the leftmost character.
 * @param {number} y the Y coordinate of the leftmost character.
 * @param {string} [mode] optional - either `SCREEN` or `CHAR`. Controls which coordinate mode to use.
 * @param {boolean} [safetyOverride] optional - Either true or false. By default set to false. If `safetyOverride` is false, any character in `text` that is also in `notAllowedCharacters` will not be drawn. It may be less readable, but it won't break anything.
 */
function putText(text, x, y, mode = "screen", safetyOverride = false) {
  let nx = x;
  let ny = y;
  
  if (mode === "screen") {
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

/**
 * `charTextBox()` draws a textbox on the sketch to neatly display text. It works by fixing the width, then scaling the height according to the text provided. The outline of the text box is `currentStroke`. The inside of the text box is by default transparent, but can be set to a character with `background`
 * @param {string} text 
 * @param {number} x The X coordinate of the top left of the text box.
 * @param {number} y the Y coordinate of the top left of the text box.
 * @param {number} width the total width of the text box (in pixels)
 * @param {string} [background] optional - character to use for the background of the text box. If left undefined, the background will be transparent.
 */
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

/**
 * `textLineSplitter()` takes in a string and splits it into various lines according to `lineWidth`.
 * @param {string} text The text to be split
 * @param {number} lineWidth The maximum width (in characters) that one line can be.
 * @returns {array} A list of the different lines that the text has been split into.
 */
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
  
  if (lines[lines.length-1][lines[lines.length-1].length-1] === ' ') {
    lines[lines.length-1] = lines[lines.length-1].slice(0, -1);
  }
  
  return lines;
}

/**
 * `screen2char()` takes in an `x` and `y` in pixel coordinates and converts them to char coordinates.
 * @param {number} x The X coordinate to be converted
 * @param {number} y The Y coordinate to be converted
 * @returns {array} A list in the format [x, y] of the new coordinates.
 */
function screen2Char(x, y) {
  return [floor(x/charWidth), floor(y/charHeight)];
}

/**
 * `setCoordinateMode()` will change the current `coordinateMode` of the sketch. `coordinateMode` changes how any function that takes in coordinates will behave. More details are in the documentation in my repo.
 * @param {SCREEN | CHAR} mode either `SCREEN` or `CHAR`.
 */
function setCoordinateMode(mode) {
  if (mode === SCREEN) {
    coordinateMode = SCREEN;
  } else if (mode === CHAR) {
    coordinateMode = CHAR;
  }
}

/**
 * `charTranslate()` will move the origin of the sketch to the location provided. Analagous to `translate()` in p5.
 * @param {number} x The new X coordinate that will become 0.
 * @param {number} y The new Y coordinate that will become 0.
 */
function charTranslate(x, y) {
  currentTranslation = [x, y];
}

/**
 * `insert()` takes in a string, and index, and a character, and inserts the character into the string at the given index.
 * @param {string} str The string where that `value` will be inserted into
 * @param {number} index The index of `str` where `value` will be inserted
 * @param {string} value The character that is being inserted into `str`
 * @returns A new string that has been modified
 */
function insert(str, index, value) { 
  return str.substring(0, index) + value + str.substring(index);
}

/**
 * `randChar()` returns a random character. It does not include any characters from `notAllowedCharacters`.
 * @returns A random character
 */
function randChar() {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.`:,;_^"!~=|$&*@%#';
  
  return characters[floor(random(characters.length))];
}

/**
 * `printOut()` is what actually updates the text on the screen. It needs to be called every frame for the sketch to actually display every frame. If `printOut()` isn't called, it will seem like nothing is happening. **Make sure** that it is called every frame in the draw loop.
 */
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

/**
 * `charSetup()` needs to be called in `setup()`. It does a number of things to prepare the sketch. Namely,
- Determines `charWidth` and `charHeight`
- Determines `resX`/`resY`
- Instantiates `outBlock`
- Sets the appropriate css properties of the text on the screen
- Disables right clicking 

It optionally takes in one argument, `res`, which controls how big the text is. It is expressed just how fonts normally are, aka in 'points'.
 * @param {number} [res] optional - the font size of the text on the screen. Default value is 16.
 */
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

function putImage(img, x, y, w, h) {
  let wid = w;
  let hei = h;
  if (wid === 0) {
    wid = hei / img.height * img.width;
  } else if (hei === 0) {
    hei = wid / img.width * img.height;
  }

  if (coordinateMode === SCREEN) {
    wid /= charWidth;
    hei /= charHeight;
  }

  img.loadPixels();
  for (let curY = 0; curY < hei; curY += 1) {
    for (let curX = 0; curX < wid; curX += 1) {
      let index = 4 * (floor(curY / hei * img.height) * img.width + floor(curX / wid * img.width));
      // console.log(index);
      let r = img.pixels[index];
      let g = img.pixels[index+1];
      let b = img.pixels[index+2];
      let a = img.pixels[index+3];

      if (a === 255) {
        // console.log('drawing');
        charPoint(x + curX, y + curY, colourMapper((r+g+b)/3/255), CHAR);
      } else {
        // console.log(a);
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BELOW HERE IS UNDOCUMENTED!!!!!!!!
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        charPoint(x, y, char, 'char');
      }
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

