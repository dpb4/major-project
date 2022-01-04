class Point {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(f) {
    this.acceleration.add(f);

    this.velocity.add(this.acceleration);

    this.pos.add(this.velocity);
  }

  display() {
    charCircle(this.pos.x, this.pos.y, 20);
  }
}