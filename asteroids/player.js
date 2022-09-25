class Player {
  constructor(x, y, dir, speed, friction, turnRate) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.dir = dir;
    this.speed = speed;
    this.friction = friction;
    this.turnRate = turnRate;

    this.w = min(width, height) / 30;
    this.l = this.w * 4/3;

    this.point1;
    this.point2;
    this.point3;

    this.lives = 3;
  }

  display() {
    charStroke('#');
    charLineTriangle(this.point1.x, this.point1.y, this.point2.x, this.point2.y, this.point3.x, this.point3.y);
  }

  checkInput() {
    if (keyIsDown(87) || keyIsDown(38)) {
    this.vel.add(p5.Vector.fromAngle(this.dir).mult(this.speed));

    if (this.vel.mag() > maxSpeed) {
      this.vel.setMag(maxSpeed);
    }

    let bottomMiddle = p5.Vector.add(this.point2, this.point3).mult(0.5);
    charStroke('!');
    charLineTriangle(
      bottomMiddle.x + this.w/3*cos(this.dir + PI/2), bottomMiddle.y + this.w/3*sin(this.dir + PI/2), 
      bottomMiddle.x + this.w/3*cos(this.dir - PI/2), bottomMiddle.y + this.w/3*sin(this.dir - PI/2), 
      this.pos.x*2 - this.point1.x, this.pos.y*2 - this.point1.y
    );

    } else {
      this.vel.mult(1 - this.friction);
    }

    if (keyIsDown(65) || keyIsDown(37)) {
      this.dir -= this.turnRate;
    } else if (keyIsDown(68) || keyIsDown(39)) {
      this.dir += this.turnRate;
    }
  }

  update() {
    this.checkInput();
    this.pos.add(this.vel);

    if (this.pos.x > width + 30) {
      this.pos.x = -30;
    } else if (this.pos.x < -30) {
      this.pos.x = width+30;
    }
    if (this.pos.y > height + 30) {
      this.pos.y = -30;
    } else if (this.pos.y < -30) {
      this.pos.y = height+30;
    }
    
    this.point1 = createVector(this.pos.x + this.l*cos(this.dir), this.pos.y + this.l*sin(this.dir));
    this.point2 = createVector(this.pos.x + this.w*cos(this.dir + 3*PI/4), this.pos.y + this.w*sin(this.dir + 3*PI/4));
    this.point3 = createVector(this.pos.x + this.w*cos(this.dir - 3*PI/4), this.pos.y + this.w*sin(this.dir - 3*PI/4))

    this.display();
  }
}