/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-11-Composition
*/

//turtle code
function turtleLeft(d) {
    this.angle -= d;
}
function turtleRight(d) {
    this.angle += d;
}
function turtleForward(p) {
    var rad = radians(this.angle);
    var newx = this.x + cos(rad) * p;
    var newy = this.y + sin(rad) * p;
    this.goto(newx, newy);
}
function turtleBack(p) {
    this.forward(-p);
}
function turtlePenDown() {
    this.penIsDown = true;
}
function turtlePenUp() {
    this.penIsDown = false;
}
function turtleGoTo(x, y) {
    if (this.penIsDown) {
      stroke(this.color);
      strokeWeight(this.weight);
      line(this.x, this.y, x, y);
    }
    this.x = x;
    this.y = y;
}
function turtleDistTo(x, y) {
    return sqrt(sq(this.x - x) + sq(this.y - y));
}
function turtleAngleTo(x, y) {
    var absAngle = degrees(atan2(y - this.y, x - this.x));
    var angle = ((absAngle - this.angle) + 360) % 360.0;
    return angle;
}
function turtleTurnToward(x, y, d) {
    var angle = this.angleTo(x, y);
    if (angle < 180) {
        this.angle += d;
    } else {
        this.angle -= d;
    }
}
function turtleSetColor(c) {
    this.color = c;
}
function turtleSetWeight(w) {
    this.weight = w;
}
function turtleFace(angle) {
    this.angle = angle;
}
function makeTurtle(tx, ty) {
    var turtle = {x: tx, y: ty,
                  angle: 0.0, 
                  penIsDown: true,
                  color: color(0),
                  weight: strokeWeight(w),
                  left: turtleLeft, right: turtleRight,
                  forward: turtleForward, back: turtleBack,
                  penDown: turtlePenDown, penUp: turtlePenUp,
                  goto: turtleGoTo, angleto: turtleAngleTo,
                  turnToward: turtleTurnToward,
                  distanceTo: turtleDistTo, angleTo: turtleAngleTo,
                  setColor: turtleSetColor, setWeight: turtleSetWeight,
                  face: turtleFace};
    return turtle;
}

/////my code

var angle;
var x;
var y;
var w = 5;
var minAngle = 1;
var maxAngle = 30;
var minRatio = .6;
var maxRatio = .9;

function setup() {
    createCanvas(480, 480);
    background(250);
    strokeJoin(MITER);
    strokeCap(PROJECT);
    frameRate(1);
}

function tree(length, turtle, w, r, l) {
  if (length > 10) { //create recursive branches
    ratio = random(minRatio, maxRatio)
    turtle.forward(length);
    turtle.setWeight(w * ratio)
    turtle.right(r);
    tree(length * ratio, turtle, w*ratio, random(minAngle,maxAngle), random(minAngle, maxAngle));
    turtle.left(r+l);
    tree(length * ratio, turtle, w*ratio, random(minAngle, maxAngle), random(minAngle, maxAngle));
    turtle.right(l);
    turtle.setWeight(w / ratio)
    turtle.back(length);
  } else { //draw flowers!
    turtle.setColor("Pink");
    turtle.setWeight(10);
    turtle.forward(10);
    turtle.setColor(75);
    turtle.setWeight(w);
    turtle.back(10);
  }
  noLoop();
}

function draw() {
    var turtle = makeTurtle(width / 2, height);
    //trunk
    turtle.penDown();
    turtle.right(270);
    turtle.forward(length);
    //branches
    tree(100, turtle, w, random(minAngle,maxAngle), random(minAngle,maxAngle))
}

//refresh the canvas when mouse is clicked
function mouseClicked() {
  setup();
  draw();
}