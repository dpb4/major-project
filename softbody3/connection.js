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
    this.p2.applyForce(p5.Vector.add(springForce, p5.Vector.sub(createVector(0, this.p2.mass * gravity), p5.Vector.mult(this.p2.velocity, this.damping))));
    this.p1.applyForce(p5.Vector.add(p5.Vector.mult(springForce, -1), p5.Vector.sub(createVector(0, this.p1.mass * gravity), p5.Vector.mult(this.p1.velocity, this.damping))));
  }

  display() {
    this.p1.display();
    this.p2.display();
    stroke(1);
    charLine(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
  }
}

class Connection2 {
  constructor(body, index1, index2, springiness, damping) {
    this.body = body;
    this.index1 = index1;
    this.index2 = index2;

    this.springiness = springiness;
    this.damping = damping;

    this.restingLength = points[this.index1].pos.dist(points[this.index2].pos);
  }

  stressPoints() {
    let displacement = (points[this.index1].pos.dist(points[this.index2].pos) - this.restingLength) / 2;
    let directionVector = p5.Vector.sub(points[this.index2].pos, points[this.index1].pos).normalize();
    directionVector.mult(displacement);

    let springForce = p5.Vector.mult(directionVector, -this.springiness);

    // total force = spring force + gravity - damping
    p2.applyForce(p5.Vector.add(springForce, p5.Vector.sub(createVector(0, points[this.index2].mass * gravity), p5.Vector.mult(points[this.index2].velocity, this.damping))));
    p1.applyForce(p5.Vector.add(p5.Vector.mult(springForce, -1), p5.Vector.sub(createVector(0, points[this.index1].mass * gravity), p5.Vector.mult(points[this.index1].velocity, this.damping))));
  }

  display() {
    points[this.index1].display();
    points[this.index2].display();
    stroke(1);
    charLine(points[this.index1].pos.x, points[this.index1].pos.y, points[this.index2].pos.x, points[this.index2].pos.y);
  }
}