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
  charBackground(0);
  gradientStyle(2);

  // for (let i = 0; i < width; i += charWidth) {
  //   charStroke(i/width);
  //   charLine(i, 0, i, height);
  // }
  for (let i = 0; i < 1; i++) {
    charStroke(1);
    charLineTriangle(random(width), random(height), random(width), random(height), random(width), random(height));
  }
}

function draw() {
  // your code goes here!


  printOut();
}

function keyPressed() {
  charBackground(0);
  for (let i = 0; i < 1; i++) {
    charStroke(1);
    charLineTriangle(random(width), random(height), random(width), random(height), random(width), random(height));
    charTriangle(random(width), random(height), random(width), random(height), random(width), random(height));
  }
}
