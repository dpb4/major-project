// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let fireworks;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);

  fireworks = [];
}

function draw() {
  // your code goes here!
  charBackground();

  for (let f of fireworks) {
    f.update();
  }

  printOut();
}

function mouseClicked() {
  fireworks.push(new Firework(mouseX, mouseY, random(2, 6), 300, 90));
}

class Particle {
  constructor(x, y, speed, direction, lifespan) {
    this.x = x;
    this.y = y;

    this.speed = speed;
    this.direction = direction;

    this.totalLife = lifespan;
    this.currentLife = lifespan;

    this.velocity = p5.Vector.fromAngle(this.direction).mult(this.speed);
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.currentLife--;
  }

  display() {
    charStroke(this.currentLife / this.totalLife);
    charPoint(this.x, this.y);
  }
}

class Firework {
  constructor(x, y, size, numParticles, lifespan) {
    this.x = x;
    this.y = y;

    this.size = size;

    this.num = numParticles;

    this.lifespan = lifespan;

    this.particles = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.num; i++) {
      this.particles.push(new Particle(this.x, this.y, random(0, this.size), random(TWO_PI), random(this.lifespan * 0.9, this.lifespan * 1.1)));
    }

    // for (let i = 0; i < this.num / 10; i++) {
    //   this.particles.push(new Particle(this.x, this.y, random(this.size, this.size * 2), random(TWO_PI), random(this.lifespan, this.lifespan * 1.3)));
    // }
  }

  update() {
    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.display();

      if (p.currentLife <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }
}
