// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let p, q;
let c;
let gravity = 1;
let timestep = 0.25;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);

  p = new Point(width/2, height/2, 10);
  q = new Point(width/4, height/2, 10);

  c = new Connection(p, q, 1, 0.1, width/4);
}

function draw() {
  // your code goes here!
  charBackground(0);
  c.update();

  p.display();
  q.display();
  c.display();
  // p.applyForce(0.01, 0);

  printOut();
}

function mouseClicked() {
  q.pos.x = mouseX;
  q.pos.y = mouseY;
  console.log("click", q.pos.x, q.pos.y);
}
