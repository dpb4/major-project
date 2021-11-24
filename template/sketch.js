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
  // for (let i = 0; i < 1; i++) {
  //   charLineTriangle(random(width), random(height), random(width), random(height), random(width), random(height));
  // }
}

function draw() {
  // your code goes here!


  printOut();
}

function keyPressed() {
  charBackground(0);
  for (let i = 0; i < 1; i++) {
    charStroke(0.3);
    let args = [random(width), random(height), random(width), random(height), random(width), random(height)];
    // charLineTriangle(args[0], args[1], args[2], args[3], args[4], args[5]);
    charTriangle(args[0], args[1], args[2], args[3], args[4], args[5]);
  }
}
