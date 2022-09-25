let title;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
  title = loadImage("./assets/title.png");
  bt = loadStrings("./python/bigtext.txt");
}
//Ascii-teroids by Declan Bainbridge
// TODO: i-frames after life loss, scoring, lives/score display, game over screen, game reset on death, ui/ux
let game;

let playerSpeed;
let friction;
let turnRate;
let maxSpeed;
let bulletSpeed;
let bulletLifespan;

let asteroidScores = [100, 50, 20];

let titleWidth;
let titleTopOffset;
let buttonWidth;
let buttonHeight;
let playText;
let qButtonSize;
let qButtonOffset;
let helpBoxOffset;

let helpText = "Welcome to Ascii-teroids! This is a spin off of the classic Atari arcade game, asteroids. I have built it using my library, AR:p5, in order to do all of the ascii drawings. If you do not know how to play (my simplified version of) asteroids, here are your instructions: \n \nW/UP to engage thruster \nA-D/LEFT-RIGHT to turn your ship \nSPACE to fire bullets \n \nThe goal of the game is to score as many points as possible by destroying asteroids. The smaller the asteroid, the more points you get for destroying it. If you get hit by an asteroid, you will lose a life. Every 10000 points, you gain an extra life. Good luck!";

let a;
function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(0);

  game = new Game();
  this.p1 = new Player(width/2, height/2, 0, 0.1, 0.01, PI/30);

  // game parameters
  playerSpeed = game.p1.w/323;
  friction = 0.01;
  turnRate = PI/30;
  maxSpeed = game.p1.w/3;
  bulletSpeed = maxSpeed * 1.5;
  bulletLifespan = 40; // in frames

  // ui tweaks
  titleWidth = width*0.8;
  titleTopOffset = height*0.04;
  buttonWidth = max(width*0.2, 30*charWidth);
  buttonHeight = buttonWidth * 0.5;
  playText = "---PLAY!!---";
  qButtonSize = buttonHeight/4;
  qButtonOffset = buttonHeight;
  helpBoxOffset = 30;

  highscore = getItem("highscore");
  if (highscore == null) {
    highscore = 0;
    storeItem("highscore", highscore);
  }
}
let num = 0;
function draw() {
  // your code goes here!
  charBackground();
  // a.display();

  game.update();
  printOut();
}

function keyPressed() {
  if (keyIsDown(32)) {
    game.addBullet();
  }
}

