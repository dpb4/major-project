// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let font;
let resX, resY;
let charWidth, charHeight;

let block;
let row;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(0, 0);

  background(0, 0);
  fill(255);

  charSetup();
  // charBackground('.');
  gradientStyle(0);
  
  // for (let i = 0; i < windowWidth; i += charWidth) {
  //   console.log(colourMapper(i/windowWidth));
  //   charLine(i, 0, i, windowHeight, colourMapper(i/windowWidth));
  // }
}

function draw() {
  // your code goes here
  charBackground('.');
  
  charLineTriangle(0, 0, 300, 500, mouseX, mouseY);


  printOut();
}

function keyPressed() {
  charStroke(randChar()); 
}