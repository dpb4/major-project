class Connection {
  constructor(p1, p2, springiness, damping, minLength) {
    this.p1 = p1;
    this.p2 = p2;
    
    this.k = springiness;
    this.damping = damping;
    this.restingLength = p1.pos.dist(p2.pos);
    this.minLength = minLength;
  }

  display() {
    charLine(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
  }

  update() {
    // (x/|x|) * (|x|-d) * -k - bv
    let currentDistance = this.p1.pos.dist(this.p2.pos);

    let direction = p5.Vector.sub(this.p1.pos, this.p2.pos).normalize();

    let stretchAmount = currentDistance - this.restingLength;
    // let stretchAmount = this.k;

    let force = direction.mult(stretchAmount * -this.k);
    // let force = createVector(0, 0);
    force.add(createVector(0, gravity));
    // console.log(diff);
    // this.p1.applyForce(force.sub(p5.Vector.mult(this.p1.acceleration, this.damping)));
    // this.p2.applyForce(force.sub(p5.Vector.mult(this.p2.acceleration, this.damping)).mult(-1));
    this.p1.applyForce(force);
    // this.p2.applyForce(force.mult(-1));
    
  }
}