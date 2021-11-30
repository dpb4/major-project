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

  charStroke(1);
  charFill(0.5);
}

function draw() {
  // your code goes here!
  charBackground();

  putText("testinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg  -gg -- ggggggggggggggggggggggggggggggggggggggggggg", mouseX, mouseY);
  // charCircle(mouseX, mouseY, dist(mouseX, mouseY, width/2, height/2));
  // charTriangle(mouseX, mouseY, p1, p2, p3, p4);
  // charRect(width/2, height/2, mouseX - width/2, mouseY - height/2);

  printOut();
}

function keyPressed() {
  p1 = random(width);
  p2 = random(height);
  p3 = random(width);
  p4 = random(height);

  // putText("testing", random(width), random(height));
}
