
var gradients;
var fillColor;
var transitionTime = 1;
var Y = [255, 248, 165];
var R = [224, 71, 66];
var R1 = [255, 133, 133];
var G = [189, 239, 175];
var B = [201, 218, 245];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    angleMode(DEGREES);
    imageMode(CENTER);

    fillColor = (50);
}

var xoff = 0, inc = 0.01, pointList = [];
var r = 100;

function draw(){
  background(250);
  
  push();
  translate(width/2, height/2);
  beginShape();
  noStroke();
  fill(fillColor);

  if(pointList.length > 180){
    pointList.splice(0, 1);
  }
  for(var i = 0; i < 360; i++){
    r = map(noise(xoff), 0, 1, 100, 125);
    pointList.push(r);
    k = (i > 180) ? 360 - i : i;
    var x = cos(i) * pointList[k];
    var y = sin(i) * pointList[k];
    vertex(x, y);
    xoff += inc;
  }
  vertex(
    pointList[0] * cos(i),
    pointList[0] * sin(i)
  );
  endShape(CLOSE);
  pop();
}

