let noiseScale = 0.005;
let timeStep = 0.005;
let time;
function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(2);

  setCoordinateMode(CHAR);

  time = random(1000);
}

function draw() {
  for (let x = 0; x < resX; x++) {
    for (let y = 0; y < resY; y++) {
      charStroke((Math.tanh(5.1 * noise(x * noiseScale * charWidth, y * noiseScale * charHeight, time) - 2.55) + 1)/2);
      charPoint(x, y);
    }
  }

  time += timeStep;
  printOut();
}
