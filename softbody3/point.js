class Point {
  constructor(pointX, pointY, mass) {
    this.pos = createVector(pointX, pointY);
    this.mass = mass;

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.lastPos = this.pos.copy();
  }

  display() {
    charStroke(1);
    charFill(0.5);
    charCircle(this.pos.x, this.pos.y, 20);
  }

  applyForce(force) {
    this.lastPos = this.pos.copy();

    this.acceleration = p5.Vector.div(force, this.mass);
    this.velocity.add(p5.Vector.mult(this.acceleration, timeScale));
    this.pos.add(p5.Vector.mult(this.velocity, timeScale));

    this.checkCollision();
    // console.log("force applied", this.pos);
    // this.display();
  }

  dragged() {
    // this.velocity = p5.Vector.sub(this.pos, this.lastPos).mult(1);
  }

  checkCollision() {
    if (this.pos.y >= height) {
      this.pos.y = height-1;

      if (this.velocity.y >= 0){
        this.velocity.y = 0;
      }

      if (this.acceleration.y >= 0){
        this.acceleration.y = 0;
      }
    }

    if (this.pos.x >= width) {
      this.pos.x = width-1;

      if (this.velocity.x >= 0){
        this.velocity.x = 0;
      }
      
      if (this.acceleration.x >= 0){
        this.acceleration.x = 0;
      }
    }

    if (this.pos.x <= 0) {
      this.pos.x = 1;

      if (this.velocity.x <= 0){
        this.velocity.x = 0;
      }
      
      if (this.acceleration.x <= 0){
        this.acceleration.x = 0;
      }
    }
  }
}