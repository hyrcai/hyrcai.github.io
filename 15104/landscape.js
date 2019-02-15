/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-10-Landscape
*/

var trees = []; //array for bigger trees (in the back)
var bushes = []; //array for smaller trees 
                 //I just called them bushes to make things easier
var speed = 0.00002; //leftward shift rate of mountains

function setup() {
  createCanvas(480, 480);

  // create initial trees; make 5 big and 5 small trees
  for (var t = 0; t < 5; t++){
    var tx = random(width);
    trees[t] = makeTree(tx);
    var bx = random(width);
    bushes[t] = makeBush(bx);
  }
  frameRate(30); //set tree and bush frameRate to 10
}

//make tree at x
function makeTree(tx) {
  var trees = {x: tx,
              draw: treeDraw}
  return trees;
}

//make bush at x
function makeBush(bx) {
  var bushes = {x: bx,
              draw: bushDraw}
  return bushes;
}

//draw tree
function treeDraw() {
  noStroke();
  //leaves
  fill(14, 90, 117);
  triangle(this.x - 20, 398, this.x + 20, 398, this.x, 320);
  //trunk
  stroke(13, 77, 94);
  line(this.x, 330, this.x, 400);
  //movement
  this.x -= 1;

  //make new trees
  var newTree = 0.0025; //probability for new tree "birth"
  if (random(0, 1) < newTree) {
      trees.push(makeTree(width + 20)); //push new tree into trees array
  }
}

//draw bush
function bushDraw() {
  noStroke();
  //leaves
  fill(28, 65, 72);
  triangle(this.x - 15, 403, this.x + 15, 403, this.x, 330);
  //trunk
  stroke(13, 77, 94);
  line(this.x, 340, this.x, 405);
  //movement
  this.x -= 1.2;

  //make new bushes
  var newBush = 0.0025; //probability for new bush "birth"
  if (random(0, 1) < newBush) {
      bushes.push(makeBush(width + 15)); //push new bush into bushes array
  }
}

function draw() {
  background(228, 239, 242);
  noStroke();

  //orange gradient layer
  for (var y = 100; y < 400; y++) { //for this specific y interval,
    var a = map(y, 100, 400, 0, 255); //map y interval to alpha
    stroke(240, 178, 158, a); 
    line(0, y, width, y); //draw lines with mapped alphas
  }

  //sun
  fill(240, 178, 158);
  ellipse(240, 200, 25);

  //mountain layer 1
  beginShape(); 
  stroke(149, 189, 207);
  var variance1 = 0.001;
  for (i = 0; i < width; i++) {
    var t = (i * variance1) + (millis() * speed);
    var y = map(noise(t), 0, 1, 100, height);
    line(i, y, i, height); 
    }
  endShape();

  //fog layer 1
  for (var y = 200; y < 400; y++) {
    var b = map(y, 200, 400, 0, 255);
    stroke(187, 208, 214, b);
    line(0, y, width, y);
  }

  //mountain layer 2
  beginShape(); 
  stroke(85, 170, 200);
  var variance2 = 0.0015;
  for (j = 0; j < width; j++) {
    var t = (j * variance2) + (millis() * speed);
    var y = map(noise(t), 0, 1, 150, height);
    line(j, y, j, height); 
    }
  endShape();

  //fog layer 2
  for (var y = 200; y < 480; y++) {
    var b = map(y, 200, 480, 0, 255);
    stroke(187, 208, 214, b);
    line(0, y, width, y);
  }

  //draw trees using the treeDraw function
  for (var u = 0; u < trees.length; u++) {
    trees[u].draw();
  }

  //fog layer 3
  for (var y = 350; y < 480; y++) {
    var b = map(y, 350, 480, 0, 255);
    stroke(187, 208, 214, b);
    line(0, y, width, y);
  }

  //ground layers
  noStroke();
  fill(117, 144, 139);
  rect(-1, 400, width + 1, 10);
  fill(63, 84, 77);
  rect(-1, 405, width + 1, 80);

  //draw bushes using the bushDraw function
  for (var v = 0; v < bushes.length; v++) {
    bushes[v].draw();
  }

  //removes trees when they go off the left edge of the screen;
  //stores the trees still on screen in a new array
  var treesToKeep = [];
  for (var i = 0; i < trees.length; i++){
    if (trees[i].x + 20 > 0) {
      treesToKeep.push(trees[i]);
    }
  }
  trees = treesToKeep;

  //removes bushes when they go off the left edge of the screen;
  //stores the bushes still on screen in a new array
  var bushesToKeep = [];
  for (var k = 0; k < bushes.length; k++){
    if (bushes[k].x + 15 > 0) {
      bushesToKeep.push(bushes[k]);
    }
  }
  bushes = bushesToKeep;

}

