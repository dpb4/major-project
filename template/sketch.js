// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(3);

  for (let i = 0; i < width; i += charWidth) {
    charStroke(i/width);
    charLine(i, 0, i, height);
  }
}

function draw() {
  // your code goes here!

  printOut();
}
