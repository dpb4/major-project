// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let p1, p2, p3, p4;

let tx, ty;
let tr;

let wingAngle;
let wingSize;
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

  tx = 0;
  ty = 0;

  wingAngle = 3*PI/4;
  wingSize = 100;
}


  // charCircle(mouseX, mouseY, dist(mouseX, mouseY, width/2, height/2));
  // charTriangle(mouseX, mouseY, p1, p2, p3, p4);
  // charRect(width/2, height/2, mouseX - width/2, mouseY - height/2);
  // charEllipse(width/2, height/2, mouseX - width/2, mouseY - height/2);
function draw() {
  // your code goes here!
  charBackground();

  tx = lerp(tx, mouseX, 0.1);
  ty = lerp(ty, mouseY, 0.1);

  tr = atan2(mouseY-ty, mouseX-tx);

  charTriangle(tx, ty, tx + wingSize*cos(tr + wingAngle), ty + wingSize*sin(tr + wingAngle), tx + wingSize*cos(tr - wingAngle), ty + wingSize*sin(tr - wingAngle));

  printOut();
}

function keyPressed() {
  p1 = random(width);
  p2 = random(height);
  p3 = random(width);
  p4 = random(height);

  // putText("testing", random(width), random(height));
}
