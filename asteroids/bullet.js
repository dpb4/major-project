class Bullet {
  constructor(x, y, speed, dir) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle(dir).mult(speed);
    this.ticks = 0;
  }

  display() {
    charStroke('@');
    charPoint(this.pos.x, this.pos.y);
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }

    this.display();
    this.ticks++;
  }
}