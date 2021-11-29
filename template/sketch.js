// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let p1, p2;
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
  p1 = random(width);
  p2 = random(height);
  p3 = random(width);
  p4 = random(height);

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
  charBackground();
  charTriangle(mouseX, mouseY, p1, p2, p3, p4);

  printOut();
}

function keyPressed() {
  p1 = random(width);
  p2 = random(height);
  p3 = random(width);
  p4 = random(height);
}
