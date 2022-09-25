class Asteroid {
  constructor(size, pos, angle, speed) {
    this.size = size;
    this.pos = pos.copy();
    this.vel = p5.Vector.fromAngle(angle).mult(speed);

    this.radius = randomGaussian(size*50, size*5) / 2;

    this.vertices = this.generateShape();
  }

  generateShape() {
    let numPoints = (this.size+1)*3;
    let avgAngle = TWO_PI / numPoints;
    let points = [];

    let currentAngle = 0;
    // points.push(p5.Vector.fromAngle(currentAngle).mult(this.radius * randomGaussian(1, 0.15)).add(this.pos));
    for (let i = 0; i < numPoints; i++) {
      if (currentAngle >= TWO_PI) {break;}
      points.push(p5.Vector.fromAngle(currentAngle).mult(this.radius * randomGaussian(1, 0.15)));
      currentAngle += randomGaussian(1, 0.1)*avgAngle;
    }

    return points;
  }

  display() {
    charStroke('$');
    // charPoint(this.pos.x, this.pos.y);
    charTranslate(this.pos.x, this.pos.y);

    for (let p = 0; p < this.vertices.length-1; p++) {
      charLine(this.vertices[p].x, this.vertices[p].y, this.vertices[p+1].x, this.vertices[p+1].y);
    }
    charLine(this.vertices[this.vertices.length-1].x, this.vertices[this.vertices.length-1].y, this.vertices[0].x, this.vertices[0].y)

    charTranslate(0, 0);
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x > width + this.radius) {
      this.pos.x = -this.radius;
    } else if (this.pos.x < -this.radius) {
      this.pos.x = width+this.radius;
    }
    if (this.pos.y > height + this.radius) {
      this.pos.y = -this.radius;
    } else if (this.pos.y < -this.radius) {
      this.pos.y = height+this.radius;
    }


    this.display();
  }
}