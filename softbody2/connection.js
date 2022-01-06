class Connection {
  constructor(point1, point2, springiness, damping) {
    this.p1 = point1;
    this.p2 = point2;

    this.springiness = springiness;
    this.damping = damping;

    this.restingLength = this.p1.pos.dist(this.p2.pos);
  }

  stressPoints() {
    let displacement = (this.p1.pos.dist(this.p2.pos) - this.restingLength) / 2;
    let directionVector = p5.Vector.sub(this.p2.pos, this.p1.pos).normalize();
    directionVector.mult(displacement);

    let springForce = p5.Vector.mult(directionVector, -this.springiness);

    // total force = spring force + gravity - damping
    p2.applyForce(p5.Vector.add(springForce, p5.Vector.sub(createVector(0, this.p2.mass * gravity), p5.Vector.mult(this.p2.velocity, this.damping))));
    p1.applyForce(p5.Vector.add(p5.Vector.mult(springForce, -1), p5.Vector.sub(createVector(0, this.p1.mass * gravity), p5.Vector.mult(this.p1.velocity, this.damping))));
  }

  display() {
    this.p1.display();
    this.p2.display();
    stroke(1);
    charLine(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
  }
}

class Point {
  constructor(pointX, pointY, mass) {
    this.pos = createVector(pointX, pointY);
    this.mass = mass;

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
  }

  display() {
    charStroke(1);
    charFill(0.5);
    charCircle(this.pos.x, this.pos.y, 20);
  }

  applyForce(force) {
    this.acceleration = p5.Vector.div(force, this.mass);
    this.velocity.add(p5.Vector.mult(this.acceleration, timeScale));
    this.pos.add(p5.Vector.mult(this.velocity, timeScale));
  }
}