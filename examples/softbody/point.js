class Point {
  constructor(x, y, damping) {
    this.pos = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.damping = damping;
  }

  applyForce(f) {
    // f.sub(p5.Vector.mult(this.velocity, this.damping));

    this.acceleration.add(f);

    this.velocity.add(p5.Vector.mult(this.acceleration, timestep));

    this.pos.add(p5.Vector.mult(this.velocity, timestep));
  }

  display() {
    charCircle(this.pos.x, this.pos.y, 20);
  }
}