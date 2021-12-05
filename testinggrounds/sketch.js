// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let p1, p2, p3, p4;

function preload() {
  font = loadFont("./assets/CONSOLA.TTF");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0, 0);
  fill(255);

  charSetup(12);
  charBackground(0);
  gradientStyle(2);
  p1 = random(width);
  p2 = random(height);
  p3 = random(width);
  p4 = random(height);

  charStroke(1);
  charFill(0.5);
  
}


// charCircle(mouseX, mouseY, dist(mouseX, mouseY, width/2, height/2));
// charTriangle(mouseX, mouseY, p1, p2, p3, p4);
// charRect(width/2, height/2, mouseX - width/2, mouseY - height/2);
// charEllipse(width/2, height/2, mouseX - width/2, mouseY - height/2);
function draw() {
  // your code goes here!
  charBackground();

  charRect(0, 0, mouseX, mouseY);
  printOut();

  
}

function keyPressed() {
  p1 = random(width);
  p2 = random(height);
  p3 = random(width);
  p4 = random(height);

  // putText("testing", random(width), random(height));
}

// function foo() {
//   let c = getCubeVertices(300);
//   // c = c.map(x => x + mouseX + 1);
//   // console.log(c);
//   for (let i = 0; i < 8; i++) {
//     c[i*3] += mouseX + 1;
//     c[i*3+1] += mouseY + 1;
//   }
//   for (let i = 0; i < 12; i++) {
//     let i1 = cubeEdges[i*2];
//     let i2 = cubeEdges[i*2 + 1];
//     let p1 = [c[i1*3], c[i1*3 + 1], c[i1*3 + 2]];
//     let p2 = [c[i2*3], c[i2*3 + 1], c[i2*3 + 2]];

//     let ps = [p1[0]/p1[2], p1[1]/p1[2], p2[0]/p2[2], p2[1]/p2[2]];
//     ps = ps.map(x => x * 300);
//     charLine(ps[0], ps[1], ps[2], ps[3], ps[4], ps[5]);
//     console.log(p1[0]/p1[2], p1[1]/p1[2], p2[0]/p2[2], p2[1]/p2[2]);
//   }
// }
