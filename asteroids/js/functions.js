// TODO: check coordiante mode for putText, add image function, update charPoint documentation

// for explanations of variables, check the docs
let outBlock = [];
let font;
let resX, resY;
let charWidth, charHeight;

let notAllowedCharacters = '.,:;\'\"\\/?\|=+-_*&^%$#@!~()[]{}<> `';
let sterilizedChars = {
  ".": "&#46;",
  ",": "&#44;",
  ":": "&#58;",
  ";": "&#59;",
  "'": "&#39;",
  "\"": "&#34;",
  "\\": "&#92;",
  "\|": "&#124;",
  "=": "&#61;",
  "+": "&#43;",
  "-": "&#8209;",
  "_": "&lowbar;",
  "*": "&#42;",
  "&": "&#38;",
  "^": "&#94;",
  "%": "&#37;",
  "$": "&#36;",
  "#": "&#35;",
  "@": "&#64;",
  "!": "&#33;",
  "~": "&#126;",
  "(": "&#40;",
  ")": "&#41;",
  "[": "&#91;",
  "]": "&#93;",
  "{": "&#123;",
  "}": "&#125;",
  "<": "&#60;",
  ">": "&#62;",
  " ": "&nbsp;",
  "\`": "&#96;",
  "/": "&#47;",
  "?": "&#63;"
}
let gradients = [
  '.:=+*#%@',
  '.:;lIE8%',
  ' .\':!;LlIE9G8%',
  'iufwieufholiuwhgefoiuwgyefouiywvefoiuyg .,:;\'\"\\/|=+_*&^%$#@!~`',
  ' .,:;\'\"\\/\|=+_*&^%$#@!~`[]'
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
  // completely clears outBlock by filling it with the new value
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
  newF = max(0, min(f, 1));
  if (newF !== 1) {
    return currentGradient[floor(newF * currentGradient.length)];
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
    // if it is on the screen
    if (x + currentTranslation[0] >= 0 && x + currentTranslation[0] <= width && y + currentTranslation[1] >= 0 && y + currentTranslation[1] <= height) {
      let p = screen2Char(x + currentTranslation[0], y + currentTranslation[1]);
      outBlock[p[0]][p[1]] = char;
    }
  } else if (mode === 'char') {
    // if it is on the screen
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
  // d is max(dx, dy) (in character coordiantes, so usually the x is bigger), aka the L-infinity norm
  let d;

  // account for different modes
  if (coordinateMode === 'screen') {
    d = max(abs(x2-x1)/charWidth, abs(y2-y1)/charHeight);
  } else if (coordinateMode === 'char') {
    d = max(abs(x2-x1), abs(y2-y1));
  }

  if (d !== 0) {
    // basically negative numbers have a tendency to round the wrong way, if you add a tiny offset to them it fixes it
    let roundingOff = 0.0001;
    let points = [];
    
    // there will be 'd' points calculated which means theres no overlap of points and no gaps exactly (however, it may not be pixel perfect)
    for (let i = 0; i < floor(d) + 1; i++) {

      // both coordinate modes do basically the same thing, they just lerp between the two endpoints and place points along the way
      if (coordinateMode === 'screen') {
        
        points.push(screen2Char(lerp(x1 + roundingOff, x2 + roundingOff, i/d), lerp(y1 + roundingOff, y2 + roundingOff, i/d)));
      } else if (coordinateMode === 'char') {

        points.push([floor(lerp(x1 + roundingOff, x2 + roundingOff, i/d)), floor(lerp(y1 + roundingOff, y2 + roundingOff, i/d))]);
      }
      // i store the coordinate in the list first so that i dont need to calculate it twice or save it in a variable, just saves a little memory (but of course then references a list, so that might slow it back down, idk exactly)
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
  // the way circles work is just by creating a regular polygon with a number of sides proportional to the radius

  let verts;

  // in character coordinates, if you drew a circle with a constant width in characters it would be an ellipse, so you have to account for that
  let verticalRadius;

  if (coordinateMode === 'screen') {

    verts = floor(radius/10 + 4);
    verticalRadius = radius;
  } else if (coordinateMode === 'char') {

    verts = floor(radius * charWidth/10 + 4);
    verticalRadius = radius * charWidth / charHeight;
  }
  
  // the angle between vertices formed at the center
  let angStep = 1 / verts * TWO_PI;
  let points = [];

  for (let i = 0; i < verts; i++) {
    let angle = i * angStep;
    
    points.push(charLine(x + radius*cos(angle), y + verticalRadius*sin(angle), x + radius*cos(angle - angStep), y + verticalRadius*sin(angle - angStep), char));
  }
  
  // the points are returned so that the filling algorithm knows the border of the shape
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
  
  // number of vertices is proportional to the size of the larger radius
  let verts;
  if (coordinateMode === 'screen') {

    verts = floor(max(newW, newH)/10 + 4);
  } else if (coordinateMode === 'char') {

    // the radii have to be converted to pixels to see which one is really bigger
    if (newW * charWidth > newH * charHeight) {

      verts = floor(newW * charWidth/10 + 4);
    } else {

      verts = floor(newH * charHeight/10 + 4);
    }
  }

  // the angle between vertices formed at the center
  let angStep = 1 / verts * TWO_PI;
  let points = [];
  
  for (let i = 0; i < verts; i++) {
    let angle = i * angStep;
    
    points.push(charLine(x + newW*cos(angle), y + newH*sin(angle), x + newW*cos(angle - angStep), y + newH*sin(angle - angStep), char));
  }
  
  // the points are returned so that the filling algorithm knows the border of the shape
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
  // intead of doing the line -> filled approach like every other shape, I decided to just do a for loop because doing all the shape stuff is way overkill for just a rectangle
  let newX, newY, newW, newH;
  
  if (coordinateMode === 'screen') {
    [newX, newY] = screen2Char(x, y);
    [newW, newH] = screen2Char(w, h);
  } else if (coordinateMode === 'char') {
    [newX, newY] = [x/charWidth, y/charHeight];
    [newW, newH] = [w, h];
  }

  // start at the top left of the rectangle and iterate left then down until its all drawn
  for (let curY = newY; curY <= newY + newH; curY++) {
    for (let curX = newX; curX <= newX + newW; curX++) {

      // if the pixel is on an edge, make it the stroke colour
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
  
  // adjust for coordinate mode
  if (mode === "screen") {
    nx = x/charWidth;
    ny = y/charHeight;
  }

  // go through each character in the text and place it sequentially
  for (let i = 0; i < text.length; i++) {
    if (!safetyOverride) {

      // if using safety, only place safe characters
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

  // split up the text according to the width
  let lines = textLineSplitter(text, newWidth - 4, background);
  
  if (coordinateMode == SCREEN) {
    x /= charWidth;
    y /= charHeight;
  }
  
  if (background === undefined) {

    // if no background provided, don't add one
    charLineRect(x * charWidth, y * charHeight, width, (lines.length + 3) * charHeight);
  } else {

    // set fill to desired background, draw box, then set it back
    let temp = currentFill;
    charFill(background);
    charRect(x * charWidth, y * charHeight, width, (lines.length + 3) * charHeight);
    charFill(temp);
  }
  
  // go through and place each line on its own line inside the box
  for (let i = 0; i < lines.length; i++) {
    putText(lines[i], x + 2, y + i + 2, CHAR, true);
  }
}

/**
 * `textLineSplitter()` takes in a string and splits it into various lines according to `lineWidth`.
 * @param {string} text The text to be split
 * @param {number} lineWidth The maximum width (in characters) that one line can be.
 * @returns {array} A list of the different lines that the text has been split into.
 */
function textLineSplitter(text, lineWidth, blankNewLineFill='-') {
  // unfortunately this is a bit of a hack, I instatiate the list of lines with enough spots that every word could be on its own line
  // after the text has actually been split, I remove all the empty lines
  let lines = new Array(text.split(' ').length).fill('');
  
  let currentWidth = 0;
  let currentLine = 0;
  
  for (let word of text.split(' ')) {
    if (word[0] === '\n') {
      lines[currentLine] = lines[currentLine].slice(0, -1);
      currentLine++;
      currentWidth = 0;
      if (word.length > 1) {
        word = word.slice(1, word.length);
      } else {
        word = blankNewLineFill;
      }
      
    }
    if (word.length + currentWidth < lineWidth) {
      
      // if word fits on current line, add it
      lines[currentLine] += word + ' ';
      currentWidth += word.length + 1;
    } else if (word.length + currentWidth === lineWidth) {
      
      // if word just barely fits on current line, then add it but start on the next line for the next word
      lines[currentLine] += word;
      currentLine++;
      currentWidth = 0;
    } else {
      // if word doesn't fit, remove the space from the last word placed then place the current word on a new line
      lines[currentLine] = lines[currentLine].slice(0, -1);
      currentLine++;
      lines[currentLine] += word + ' ';
      currentWidth = word.length + 1;
    }
  }
  
  // remove all empty lines
  lines = lines.filter(l => l !== '');
  
  // my deepest apologies
  // checks if the very last character is a space, and if it is then remove it
  if (lines[lines.length-1][lines[lines.length-1].length-1] === ' ') {
    lines[lines.length-1] = lines[lines.length-1].slice(0, -1);
  }
  
  // return the split up lines
  return lines;
}

function bigText(text, x, y, char, mode) {

  if (typeof text !== 'string') {
    text = text.toString();
  }

  if (coordinateMode == SCREEN) {
    x /= charWidth;
    y /= charHeight;
  }

  if (mode == CENTER) {
    x -= text.length * 3;
  }

  for (let c = 0; c < text.length; c++) {
    let index = (text[c].charCodeAt(0) - 33);

    if (index < 0 || index > 92) { // if it is a space or any other weird character
      continue;
    } else {
      index *= 6;
    }

    for (let l = index; l < index+5; l++) {

      for (let p = 0; p < 5; p++) {
        if (bt[l][p] !== '0') {
          charPoint(x + p + (c*6), y + l - index, char, CHAR);
        }
      }
    }
  }
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
  // this takes outBlock (which is basically the current frame) and converts it into a string
  out = '';

  // first just put every character into one long string
  for (let i = 0; i < resY; i++) {
    for (let j = 0; j < resX; j++) {
      // console.log(outBlock[i][j]);
      if (notAllowedCharacters.includes(outBlock[j][i])) {
        out = out.concat(sterilizedChars[outBlock[j][i]]);
      } else {
        out = out.concat(outBlock[j][i]);

      }
      
      // console.log(out);
    }
    out = out.concat("\n");
  }

  // set the text
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

  // p5 has a bunch of handy functions for fonts, all of this finds the width/height of a character (assuming the font is monospaced, which is critical)
  textAlign(LEFT, TOP);
  textFont(font);
  textSize(res);
  textLeading(textSize());
  charWidth = textWidth('0');

  // space above the line + space below the line = total height of character
  charHeight = textAscent() + textDescent();

  // add one so that there isn't a gap along the edges
  resX = floor(windowWidth/charWidth) + 1;
  resY = floor(windowHeight/charHeight) + 1;

  // instantiate outBlock
  outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill('.'));

  // set the text size according to the variables calculated above
  document.getElementById('textCanvas').style.fontSize = `${textSize()}px`;
  document.getElementById('textCanvas').style.lineHeight = `${charHeight}px`;

  // disable right click
  document.addEventListener('contextmenu', event => event.preventDefault());
}

/**
 * `putImage()` draws an image using ascii characters. Analagous to `image()` in p5. If the image is transparent, anything that is transparent at all will not be drawn (so things that are partially transparent wont work, but if its a transparent background it works fine). 

The image takes in a width and height. If one is provided while the other is zero, the zero will scale to match the one that is provided.
 * @param {p5.Image} img The image to display
 * @param {number} x The X coordinate of the top left of the image
 * @param {number} y The Y coordinate of the top left of the image
 * @param {number} w The width to display the image
 * @param {number} h The height to display the image
 */
function putImage(img, x, y, w, h) {
  let wid = w;
  let hei = h;

  // if either the width or height is zero, scale it according to the original aspect ratio
  if (wid === 0) {

    wid = hei / img.height * img.width;
  } else if (hei === 0) {

    hei = wid / img.width * img.height;
  }

  if (coordinateMode === SCREEN) {
    wid /= charWidth;
    hei /= charHeight;

    x /= charWidth;
    y /= charHeight;
  }

  img.loadPixels();

  // essentially draw a rectangle, where each character in it is sampled from the image at that point
  for (let curY = 0; curY < hei; curY += 1) {
    for (let curX = 0; curX < wid; curX += 1) {
      // pixels array is weird
      let index = 4 * (floor(curY / hei * img.height) * img.width + floor(curX / wid * img.width));

      // respective channels of the image at the current point
      let r = img.pixels[index];
      let g = img.pixels[index+1];
      let b = img.pixels[index+2];
      let a = img.pixels[index+3];

      if (a >= 128) {
        charPoint(x + curX, y + curY, colourMapper((r+g+b)/3/255), CHAR);
      }
    }
  }
}

function sortByY(points) {
  // this sorts the points by their Y values, into a map where each Y value is a key has a list of x values as its value
  let yMap = new Map();

  for (let i = 0; i < points.length; i++) {
    // if the Y is already in the map, add to the list
    if (yMap.has(points[i][1])) {
      yMap.get(points[i][1]).push(points[i][0]);

    // otherwise, add the Y value to the list and get the list started
    } else {
      yMap.set(points[i][1], [points[i][0]]);
    }
  }

  return yMap;
}

function fillShape(points, char) {
  // basically a simple implemenation of scan-line polygon filling

  // points is a map output by sortByY above

  // iterate through all the Ys
  for (let [y, xs] of points)  {
    // sort the Xs in ascending order 
    xs.sort((a, b) => a-b);

    // make sure there is always a pair of points
    if (xs.length === 1) {
      xs.push(xs[0]);
    }

    // iterate through the Xs
    for (let x = xs[0]; x < xs[xs.length-1]; x++) {
      // MAKE SURE that it doesn't put a point over a point already in the list (which would mean a point is overlapping the border, not good)
      if (!xs.includes(x)) {
        charPoint(x, y, char, 'char');
      }
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BELOW HERE IS UNDOCUMENTED!!!!!!!!
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// I haven't actually made anyting 3d work, so i dont really think it's necessary to document them. Especially since if i actually made them work, its a good chance they'd be dramatically different than how they currently are.

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

