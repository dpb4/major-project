let points = 10;
let mult = 2;
let running = false;
let lines = 0;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);
  setCoordinateMode(SCREEN);
}

function draw() {
  let pointsArray = new Array(points).fill(0).map(() => new Array(2).fill(0));
  for (let i = 0; i < points; i += 1) {
    pointsArray[i][0] = map(cos(TWO_PI*i/points), -1, 1, 100, height-100);
    pointsArray[i][1] = map(sin(TWO_PI*i/points), -1, 1, 100, height-100);
  }

  for (let i = 0; i < points; i += 1) {
    charPoint(pointsArray[i][0], pointsArray[i][1], '@', SCREEN);
  }

  for (let i = 0; i < lines; i += 1) {
    let src = (i+1) % points;
    let dest = (src * mult) % points;
    charLine(pointsArray[src][0], pointsArray[src][1], pointsArray[dest][0], pointsArray[dest][1]);
  }

  if (running) {
    lines += 1;
  }

  printOut();
}

function keyTyped() {
  outBlock = new Array(resX).fill(0).map(() => new Array(resY).fill('.'));
  if (key == ' ') {
    running = true;
    lines = 0;
  }
  if (key == 'w') {
    points += 1;
  }
  if (key == 's') {
    points -= 1;
  }
  if (key == 'a') {
    mult = max(mult-1, 2);
  }
  if (key == 'd') {
    mult += 1;
  }
  if (key == 'q') {
    points = 10;
    mult = 2;
  }
}