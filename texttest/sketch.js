// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let font;
let resX, resY;
let charWid, charHeight;

let block;
let row;

let chars = 'abcdefghijklmnopqrstuvwxxyz';

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(0, 0);

  background(0, 0);
  // stroke(255);
  fill(255);

  textAlign(LEFT, TOP);
  textFont(font);
  textSize(16);
  textLeading(textSize());

  charWid = textWidth('0');
  charHeight = textAscent() + textDescent();

  resX = floor(windowWidth/charWid);
  resY = floor(windowHeight/charHeight);

  row = '0'.repeat(resX+1);
  row += '\n';
  block = row.repeat(resY+1);

  document.getElementById('test').style.fontSize = `${textSize()}px`;
  document.getElementById('test').style.lineHeight = `${charHeight}px`;
  
  frameRate(10);
}

function draw() {
  document.getElementById('test').innerHTML = block;

  // row = chars[floor(random(chars.length))].repeat(resX+1);
  // row += '\n';
  // block = row.repeat(resY+1);
}


