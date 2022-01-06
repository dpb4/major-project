// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gravity = 0;
let timeScale = 0.3;
let s;
let tri;

let p1, p2, c;

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

  p1 = new Point(width/2, height/4, 20);
  p2 = new Point(width/4, height/2, 20);
  c = new Connection(p1, p2, 3, 2);

  tri = new SoftBody(4, 200, 3, 2);
}

function draw() {
  // your code goes here!
  charBackground(0);
  // s.display();
  // c.display();
  // c.stressPoints();
  tri.update();
  // console.log(tri.connections[0].p1.velocity);

  // s.update();

  printOut();
}

function mousePressed() {
  // s.point.x = mouseX;
  // s.point.y = mouseY;
  // p2.pos.x = mouseX;
  // p2.pos.y = mouseY;
  tri.points[0].pos.x = mouseX;
  tri.points[0].pos.y = mouseY;
}

class SoftBody {
  constructor(sides, radius, springiness, damping) {
    this.sides = sides;
    this.radius = radius;
    this.springiness = springiness;
    this.damping = damping;

    this.points = [];
    this.connections = [];

    for (let i = 0; i < this.sides; i++) {
      let ang = i/this.sides * TWO_PI;
      this.points.push(new Point(this.radius * cos(ang) + width/2, this.radius * sin(ang) + height/2, 20));
    }
    for (let i = 0; i < this.sides; i++) {
      this.connections.push(new Connection(this.points[i], this.points[(i+1) % this.sides], this.springiness, this.damping));
    }

    for (let i = 0; i < 2; i++) {
      this.connections.push(new Connection(this.points[i], this.points[i+2], this.springiness * 1.5, this.damping));
    }

    console.log(this.points);
    console.log(this.connections);
  }

  display() {
    charStroke(1);
    charFill(1);

    for (let i = 0; i < 4; i++) {
      charTriangle(this.points[i].pos.x, this.points[i].pos.y, this.points[(i+1) % this.sides].pos.x, this.points[(i+1) % this.sides].pos.y, this.points[(i+2) % this.sides].pos.x, this.points[(i+2) % this.sides].pos.y)
    }
  }

  update() {
    for (let i = 0; i < this.sides; i++) {
      // this.points[i].display();
    }
    for (let c of this.connections) {
      c.stressPoints();
      // c.display()
      this.display();
      // console.log(this.points[0].velocity);
    }
  }
}