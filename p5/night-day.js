/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-03-Dynamic Drawing
*/

var R = 211; //sky color variables
var G = 239;
var B = 252;
angleSun = 0; //sun and moon rotation angles
angleMoon = 0;
cloudColor = 250; 
cloudX = 0;
var dimness = 0;

function setup() {
  createCanvas(640,480);
}

function draw() {
  rectMode(CORNER); 
  var cmouseX = constrain(mouseX,0,600); //constrains mouseX to canvas
  // sky
  background(R,G,B);
  // stars
  fill(211,239,252);
  strokeWeight(1);
  stroke(211,239,252);
  point(386,153);
  point(360,200);
  point(266,225);
  point(395,355);
  // sun
  push();
  noStroke();
  fill(255,247,215);
  ellipseMode(CENTER);
  translate(675,500);
  angleMode(DEGREES);
  rotate(angleSun); //rotates the sun
  ellipse(-390,-300,10,10); //relative to translated origin
  pop();
  // moon
  push();
  noStroke();
  fill(250);
  ellipseMode(CENTER);
  translate(675,500);
  angleMode(DEGREES);
  rotate(angleMoon); //rotates the moon
  ellipse(-390,-300,10,10); //relative to translated origin
  fill(R,G,B); //fills with sky color
  ellipse(-389,-301,10,10); //second circle that forms the moon
  pop();
  // clouds
  noStroke();
  fill(cloudColor);
  rect(286 + cloudX,226,54,17,10);
  rect(306 + cloudX,236,55,17,10);
  rect(242 + cloudX,265,91,17,10);
  rect(215 + cloudX,275,73,17,10);
  rect(353 + cloudX,305,67,17,10);
  rect(338 + cloudX,314,58,17,10);
  rect(150 + cloudX,340,70,17,10);
  rect(150 + cloudX,350,40,17,10);
  //wall
  fill(255 - dimness,232 - dimness,204 - dimness);
  rect(440,0,200,480);
  rect(165,0,310,80);
  rect(0,0,200,480);
  rect(180,400,310,80);
  //window shadow
  noFill();
  stroke(244 - dimness,216 - dimness,216 - dimness);
  strokeWeight(30);
  rect(206,80,250,335); //big frame
  strokeWeight(10);
  line(204,134,444,134); //horizontal part of 'T'
  line(324,134,324,389); //vertical part of 'T'
  //window frame
  stroke(255 - dimness);
  strokeWeight(30);
  rect(200,60,250,335); //big frame
  strokeWeight(10);
  line(200,130,440,130); //horizontal part of 'T'
  line(320,130,320,385); //vertical part of 'T'
  //shades
  noStroke();
  fill(255 - dimness,232 - dimness,204 - dimness);
  rect(200,70,250,5); 
  rect(200,80,250,5);
  rect(200,90,250,5);
  rect(200,100,250,5);
  rect(200,110,250,5);
  stroke(255 - dimness,232 - dimness,204 - dimness)
  strokeWeight(1);
  line(266,70,266,110); //hanging lines
  line(377,70,377,110);
  strokeWeight(1);
  line(425,70,425,351); //pull line
  rectMode(CENTER);
  rect(425,350,2,8,2,2,0,0); //pull line handle
  stroke(250 - dimness);
  strokeWeight(3);
  line(230,60,230,260); //rod

  //changes based on mouseX's position on the canvas 
  R = ((527.5 - mouseX) / 2.5); 
  G = ((597.5 - mouseX) / 2.5);
  B = ((630 - mouseX) / 2.5); //lighter/darker sky color
  angleSun = ((0 - mouseX) / 10);
  angleMoon = ((cmouseX - 600) / 10);
  cloudColor = ((775 - cmouseX) / 3); //lighter/darker
  cloudX = ((640 - cmouseX) / 12); //horizontal shift
  dimness = ((25 + cmouseX) / 25);
}

