// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let video;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
  video = createCapture(VIDEO, setWid);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  gradientStyle(1);
}

function setWid() {
  video.size(video.width * height/video.height, height);
  video.hide();
}

function pos2pix(image, x, y) {
  x = floor(x);
  y = floor(y);
  if (x >= 0 && x < image.width && y >= 0 && y < image.height) {
    let i = (y*image.width + (image.width - x - 1))*4;
    return (image.pixels[i] + image.pixels[i + 1] + image.pixels[i + 2]) / 3;
  }
  return 0;
}

function draw() {

  charBackground('.');

  video.loadPixels();
  for (let x = 0; x < width; x += charWidth) {
    for (let y = 0; y < height; y += charHeight) {
      charStroke(pos2pix(video, x, y) / 255);

      charPoint(x, y, currentStroke);
    }
  }

  printOut();
}

function keyPressed() {
  // charStroke(randChar()); 
}