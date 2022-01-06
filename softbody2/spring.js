class Spring {
  constructor(anchorX, anchorY, pointX, pointY, springiness, mass, damping) {
    this.anchor = createVector(anchorX, anchorY);
    this.point = createVector(pointX, pointY);

    this.springiness = springiness;
    this.mass = mass;
    this.damping = damping;

    this.restingLength = this.anchor.dist(this.point);
    this.restingPosition = this.point.copy();
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
  }

  display() {
    charStroke(1);
    charFill(0.5);
    charRect(this.anchor.x - 10, this.anchor.y - 10, 20, 20);
    charCircle(this.point.x, this.point.y, 20);
    charLine(this.anchor.x, this.anchor.y, this.point.x, this.point.y);
  }

  update() {
    let displacement = this.anchor.dist(this.point) - this.restingLength;
    let directionVector = p5.Vector.sub(this.point, this.anchor).normalize();

    // console.log(displacement, degrees(atan2(directionVector.y, directionVector.x)));
    directionVector.mult(displacement);
    // let displacement = p5.Vector.sub(this.point, this.restingPosition);

    let dampingForce = p5.Vector.mult(this.velocity, this.damping);
    let springForce = p5.Vector.mult(directionVector, -this.springiness);

    // console.log(displacement, springForce);

    let totalForce = p5.Vector.add(springForce, p5.Vector.sub(createVector(0, this.mass * gravity), dampingForce));

    this.acceleration = totalForce.div(this.mass);
    this.velocity.add(this.acceleration.mult(timeScale));
    this.point.add(p5.Vector.mult(this.velocity, timeScale));
  }
}