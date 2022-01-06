// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gravity = 0;
let timeScale = 0.3;
let s;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);

  s = new Spring(width/2, height/4, width/4, height/2, 2, 20, 1);
}

function draw() {
  // your code goes here!
  charBackground(0);
  s.display();

  s.update();

  printOut();
}

function mousePressed() {
  s.point.x = mouseX;
  s.point.y = mouseY;
}
