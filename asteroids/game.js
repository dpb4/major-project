class Game {
  constructor() {
    this.start();
  }
  
  start() {
    this.p1 = new Player(width/2, height/2, 0, 0.1, 0.01, PI/30);
    this.bullets = [];
    this.asteroids = [new Asteroid(3, createVector(width/2, height * 0.75), 0, 0)];

    this.started = false;

    this.score = 0;
  }

  addBullet() {
    this.bullets.push(new Bullet(this.p1.pos.x + this.p1.l*cos(this.p1.dir), this.p1.pos.y + this.p1.l*sin(this.p1.dir), bulletSpeed, this.p1.dir));
  }

  checkBullets() {
    for (let b = this.bullets.length-1; b >= 0; b--) {
      this.bullets[b].update();

      if (this.bullets[b].ticks > bulletLifespan) {
        this.bullets.splice(b, 1);
        continue;
      }

      for (let a = 0; a < this.asteroids.length; a++) {
        if (this.bullets[b].pos.dist(this.asteroids[a].pos) < this.asteroids[a].radius) {
          
          if (this.asteroids[a].size > 1) {
            // add velocity
            let diff = p5.Vector.sub(this.bullets[b].pos, this.asteroids[a].pos);
            let ang = atan2(diff.y, diff.x);
            // console.log(ang * 180 / PI);
            this.asteroids.push(new Asteroid(this.asteroids[a].size-1, this.asteroids[a].pos, ang + PI/2, 3));
            this.asteroids.push(new Asteroid(this.asteroids[a].size-1, this.asteroids[a].pos, ang - PI/2, 3));
          }
          
          this.score += asteroidScores[this.asteroids[a].size-1];

          this.bullets.splice(b, 1);
          this.asteroids.splice(a, 1);
          break;
        }
      }
    }
  }

  checkAsteroids() {
    for (let a = this.asteroids.length-1; a >= 0; a--) {
      this.asteroids[a].update();

      if (this.p1.point1.dist(this.asteroids[a].pos) < this.asteroids[a].radius || this.p1.point2.dist(this.asteroids[a].pos) < this.asteroids[a].radius || this.p1.point3.dist(this.asteroids[a].pos) < this.asteroids[a].radius) {
        this.loseLife();
      }
    }
  }

  loseLife() {
    this.p1.lives--;
    if (this.p1.lives === 0) {
      this.onDeath();
    }
  }

  onDeath() {
    this.started = false;
    highscore = max(highscore, this.score);
    storeItem("highscore", highscore);
  }

  displayGameInfo() {
    bigText(this.score, width/2, charHeight*2, '%', CENTER);
  }

  displayMenu() {
    // title
    putImage(title, width/2 - titleWidth/2, titleTopOffset, titleWidth, 0);

    // play button
    charStroke('#');
    charFill('/');
    charRect(width/2 - buttonWidth/2, height/2 - buttonHeight/2, buttonWidth, buttonHeight);
    // putText(playText, floor(width/2/charWidth - playText.length/2), floor(height/2/charHeight), CHAR, true);
    setCoordinateMode(CHAR);
    bigText("PLAY", width/2/charWidth, height/2/charHeight - 2, '@', CENTER);


    // help button
    setCoordinateMode(SCREEN);
    charStroke('?');
    charFill('?');
    charCircle(width/2, height/2 + qButtonOffset, qButtonSize);
    putText('--HELP--', floor(width/2/charWidth)-4, floor((height/2 + qButtonOffset)/charHeight), CHAR, true);

    bigText(`HIGHSCORE:${highscore}`, charWidth*2, height - charHeight*6, '%');
  }

  updateMenu() {
    if (dist(mouseX, mouseY, width/2, height/2 + qButtonOffset) <= qButtonSize) {
      charStroke('#');
      charTextBox(helpText, width/2 - buttonWidth/2, height/2 + buttonHeight/2 + helpBoxOffset, max(buttonWidth, 270), '-');
    }

    if (mouseX >= width/2 - buttonWidth/2 && mouseY >= height/2 - buttonHeight/2 && mouseX <= width/2 + buttonWidth/2 && mouseY <= height/2 + buttonHeight/2) {
      if (mouseIsPressed) {
        this.start();
        this.started = true;
      }
    }
  }

  update() {
    if (this.started) {
      this.p1.update();
      this.checkBullets();
      this.checkAsteroids();
      this.displayGameInfo();
    } else {
      this.displayMenu();
      this.updateMenu();
    }

  }
}