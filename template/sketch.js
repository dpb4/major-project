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
  gradientStyle(2);
}

function draw() {
  // your code goes here!

  printOut();
}
