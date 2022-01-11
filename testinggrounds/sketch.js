// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let p1, p2, p3, p4;
let z;
let t;

let c = [];
let model;
let view;
let projection;

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
  // let n = getCubeVertices(1);
  // // n = n.map(x => x * 200 - 100);
  // for (let i = 0; i < 8; i++) {
  //   c[i] = [n[i*3], n[i*3+1], n[i*3+2]];
  // }
  // console.log(c);


  // model = createTranslationMatrix(4, -0.5, -0.5, -10);
  // view = createIdentityMatrix(4);
  // projection = generateProjectionMatrix(90, width/height, 0.1, 100);

  // logMatrix(model);
  // logMatrix(view);
  // logMatrix(projection);
  
  // p1 = random(width);
  // p2 = random(height);
  // p3 = random(width);
  // p4 = random(height);

  charStroke(1);
  charFill(0.5);
  z = -10;
  // charTranslate(width/2, height/2);
  // noLoop();
  t = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at malesuada erat. Donec efficitur accumsan dolor non pharetra. Nam vel turpis sed metus feugiat tempor sed ac sem. Duis vitae lacinia dolor, at tincidunt ex. Quisque condimentum gravida nibh non vestibulum. Etiam molestie cursus turpis, sit amet aliquet ligula scelerisque molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque faucibus mauris eu nisl auctor, ut aliquam justo consequat. Maecenas rutrum facilisis faucibus. Phasellus non feugiat nibh, semper volutpat eros. Integer viverra mi interdum augue consequat vulputate in eget felis. Proin maximus enim luctus lacus ornare, ac semper ligula aliquam. Suspendisse non nunc placerat, gravida eros ut, semper diam. Pellentesque a leo lorem.';
}



function draw() {
  // your code goes here!
  charBackground();
  // let nc;
  // nc = c.map(v => matrixVectorMult(model, setVecDimension(v, 4)));
  // // console.log(c);
  // nc = c.map(v => matrixVectorMult(view, setVecDimension(v, 4)));
  // // console.log(c);
  // nc = c.map(v => matrixVectorMult(projection, setVecDimension(v, 4)));
  // console.log(c);

  charTextBox(t, 0, 0, mouseX);

  // for (let i = 0; i < 8; i++) {
  //   c[i] = matrixVectorMult(projection, setVecDimension(c[i], 4));
  // }
  // c.map(v => [(v[0] + 1) / 2 * width, (v[1] + 1) / 2 * height]);
  // console.log(c);

  // for (let i = 0; i < 8; i++) {
  //   c[i] = [(c[i][0] + 1) / 2 * width, (1 - (c[i][1] + 1) / 2) * height];
  // }
  // console.log(c);

  // for (let i = 0; i < 8; i++) {
  //   charPoint((nc[i][0] + 1) / 2 * width, (1 - (nc[i][1] + 1) / 2) * height);
  //   // charPoint(c[i][0], c[i][1]);
  // }

  // model = createTranslationMatrix(4, -0.5, -0.5, -10);
  // charStroke(0.5);
  // charPoint(-129, -100);
  // charPoint(129, 100);
  // charPoint(mouseX, mouseY);

  // charEllipse(0, 0, 50, 50);
  // for (let i = 0; i < 12; i++) {
  //   p1 = c[cubeEdges[i*2]];
  //   p2 = c[cubeEdges[i*2 + 1]];

  //   charLine(p1[0], p1[1], p2[0], p2[1]);
  // }
  // charLineCircle(0, 0, dist(mouseX, mouseY, width/2, height/2));
  // charTriangle(mouseX, mouseY, p1, p2, p3, p4); 
  // charEllipse(0, 0, mouseX - width/2, mouseY - height/2);
  // charRect(0, 0, mouseX - width/2, mouseY - height/2);
  // console.log(charLine(0, 0, mouseX, mouseY));
  // z--;
  printOut();

  
}

function keyPressed() {
  // p1 = random(-width/2, width/2);
  // p2 = random(-height/2, height/2);
  // p3 = random(-width/2, width/2);
  // p4 = random(-height /2, height/2);

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
