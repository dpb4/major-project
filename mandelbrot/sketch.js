// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// TODO add pattern detection, depth changer

let windowX, windowY;
let viewWidth, viewHeight;
let startMouseX, startMouseY;
let up, down;

let buttoned = false;
let buffer;

let depth = 512;

let last;
function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);

  charBackground(0);
  alert('This is a Mandelbrot fractal viewer. To move around, click and drag to select a rectangle. Your view will resize to fit the rectangle you selected. To change the maximum depth (increase/decrease accuracy of computations), click on the up or down arrow in the top left. Space will reload your current view. You can go back 1 step by pressing right click. Enjoy!');

  windowX = -2;
  viewWidth = 4;
  windowY = height/width * windowX;
  viewHeight = height/width * viewWidth;

  buffer = getVals();
  cache();
  charStroke(1);
  console.log(windowX, windowY, viewWidth, viewHeight);

  // noLoop();
  let t = `depth_cutoff:${depth}`;

  let endOfText = screen2Char(30, 30);

  up = [endOfText[0] + t.length - depth.toString().length + 2, endOfText[1] - 1];
  down = [endOfText[0] + t.length - depth.toString().length + 2, endOfText[1] + 1];

}

function draw() {
  charBackground(0);

  display();
  selection();

  printOut();
}

function mousePressed() {
  if (mouseButton === LEFT) {
    let ms = screen2Char(mouseX, mouseY);
    let dl = depth.toString().length;

    if (ms[0] === up[0] + dl && ms[1] === up[1]) {
      buttoned = true;
      depth *= 2;
      return;
    } else if (ms[0] === down[0] + dl && ms[1] === down[1]) {
      buttoned = true;
      depth *= 0.5;
      return;
    }
    startMouseX = mouseX;
    startMouseY = mouseY;
  } else if (mouseButton === RIGHT) {
    windowX = last[0];
    windowY = last[1];
    viewWidth = last[2];
    viewHeight = last[3];
    buffer = getVals();
  }
  
}

function mouseReleased() {
  let dx = mouseX - startMouseX;
  if (dx > 0 && mouseButton === LEFT && !buttoned) {
    cache();

    let pWindowX = windowX;
    windowX = mapRange(startMouseX, 0, width, windowX, windowX + viewWidth);
    windowY = mapRange(startMouseY, 0, height, windowY, windowY + viewHeight);
    viewWidth = mapRange(dx, 0, width, pWindowX, pWindowX + viewWidth) - pWindowX;
    viewHeight = height/width * viewWidth;
    
    console.log(windowX, windowY, viewWidth, viewHeight, dx/width);

    if (viewWidth < 1e-14) {
      alert("You've reached the limit of 64-bit floating point precision! You should probably turn back.");
    }
    buffer = getVals();

  }
  buttoned = false;
}

function mapRange(x, in_min, in_max, out_min, out_max) {
  // from here : https://www.arduino.cc/reference/en/language/functions/math/map/
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function evalPoint(complex, depth) {
  let z = math.complex(0, 0);

  for (let i = 0; i < depth; i++) {
    z = math.add(math.pow(z, 2), complex);
    let distFromOrigin = math.sqrt(math.add(math.pow(z.re, 2), math.pow(z.im, 2)));

    if (distFromOrigin >= 2) {
      return i/depth;
    }
  }
  return true;
}

function getVals() {
  let buffer = new Array(resX).fill(0).map(() => new Array(resY).fill(0));
  for (let x = 0; x < resX; x++) {
    for (let y = 0; y < resY; y++) {
      let realX = mapRange(x, 0, resX, windowX, windowX + viewWidth);
      let realY = mapRange(y, 0, resY, windowY, windowY + viewHeight);

      let complex = math.complex(realX, realY);

      buffer[x][y] = evalPoint(complex, depth);
      
    }
  }
  loaded = true;
  return buffer;
}

function cache() {
  last = [windowX, windowY, viewWidth, viewHeight, copyArray(buffer)];
}

function copyArray(arr) {
  let out = new Array(arr.length).fill(0).map(x=> new Array(arr[0].length).fill(0));

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      out[y][x] = arr[y][x];
    }
  }

  return out;
}

function display() {
  for (let x = 0; x < resX; x++) {
    for (let y = 0; y < resY; y++) {
      if (buffer[x][y] !== 0) {
        charPoint(x, y, colourMapper(buffer[x][y]), 'CHAR');
      }
    }
  }

  let t = `Depth_cutoff:${depth}`;
  putText(t, 30, 30);

  let endOfText = screen2Char(30, 30);
  endOfText[0] += t.length;

  charPoint(endOfText[0] + 2, endOfText[1] - 1, '^', 'CHAR');
  charPoint(endOfText[0] + 2, endOfText[1], '|', 'CHAR');
  charPoint(endOfText[0] + 2, endOfText[1] + 1, 'v', 'CHAR');
}

function selection() {
  if (mouseIsPressed && mouseButton === LEFT && !buttoned) {
    let dx = mouseX - startMouseX;
    
    charLineRect(startMouseX, startMouseY, dx, dx * height/width, '+');
  }
}

function keyPressed() {
  if (keyCode === 32) {
    buffer = getVals();
  }
}