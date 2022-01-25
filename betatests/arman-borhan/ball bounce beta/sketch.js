// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballX;
let ballY;
let r = 25;
let dx = 5;
let dy = 3;
let ballFill;
let strokeFill;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ballX = width/2;
  ballY = height/2;

  ballFill = randChar();
  strokeFill = randChar();

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);
}

function draw() {
  charBackground();
  moveBall();
  displayBall();

  printOut();
}

function displayBall() {
  charFill(ballFill);
  charStroke(strokeFill);
  charCircle(ballX, ballY, r*2);
}

function moveBall() {
  ballX += dx;
  ballY += dy;

  if (ballX + r >= width || ballX - r <= 0) {
    dx = -dx;
    ballFill = randChar();
    strokeFill = randChar();
  }

  if (ballY + r >= height || ballY - r <= 0) {
    dy = -dy;
    ballFill = randChar();
    strokeFill = randChar();
  }
}