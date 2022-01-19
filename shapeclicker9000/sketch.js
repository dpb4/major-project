// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gravity = 0.1;
let p;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function randomShape() {
  let shapes = ['circle', 'square'];

  return shapes[floor(random(shapes.length))];
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);

  p = new Projectile(random(width), height, 10, 'square');
}

function draw() {
  // your code goes here!
  charBackground();

  p.update();
  p.display();
  printOut();
}

function mousePressed() {
  if (p.checkCollision(mouseX, mouseY)) {
    p.x = random(width);
    p.y = height;
    p.size = random(40, 80);
    p.shape = randomShape();
    p.velocity = p.getStartingVelocity();
  }

}

class Projectile {
  constructor(x, y, speed, shape) {
    this.x = x;
    this.y = y;

    this.speed = speed;
    this.shape = shape;

    this.size = random(40, 80);

    this.velocity = this.getStartingVelocity();
  }

  getStartingVelocity() {
    let maxY = 1;
    let maxX = (this.x/width - 0.5) * -2;

    return createVector(random(0, maxX) * this.speed, random(0.7, maxY) * this.speed);
  }

  update() {
    this.x += this.velocity.x;
    this.y -= this.velocity.y;

    this.velocity.y -= gravity;
  }

  display() {
    if (this.shape === 'circle') {
      charCircle(this.x, this.y, this.size/2);
    } else if (this.shape === 'square') {
      charRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    } else if (this.shape === 'triangle') {
      charTriangle(this.x + this.size, this.y, this.x + (this.size * cos(2 * PI / 3)), this.y + (this.size * sin(2 * PI / 3)), this.x + (this.size * cos(4 * PI / 3)), this.y + (this.size * sin(4 * PI / 3)));
    }
  }

  checkCollision(x, y) {
    if (this.shape === 'circle' || this.shape === 'triangle') {
      return dist(x, y, this.x, this.y) < this.size/2 + 10;
    } else if (this.shape === 'square') {
      return x > this.x-this.size/2 && x < this.x + this.size/2 && y > this.y-this.size/2 && y < this.y + this.size/2;
    }
  }
}
