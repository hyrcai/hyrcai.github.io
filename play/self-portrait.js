/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-01-Face
*/

function setup() {
  createCanvas(240,240);
  a = width / 2;
  b = width / 2;
  c = width / 2;
}

function draw() {
  scale(0.2, 0.2);

  background(202,248,255);

  // clouds
  strokeWeight(0);
  fill(255,255,255);
  rectMode(CENTER);
  rect(324 - a,250,500,222,111,111,111,111);
  a = a - 2.5;
  if (a < -1150) {
  a = 600;
  }
  rect(1117 - b,866,316,175,87,87,87,87);
    b = b - 4;
  if (b < -400) {
  b = 1500;
  }
  rect(955 - c,623,194,71,35,35,35,35);
    c = c - 3;
  if (c < -350) {
  c = 1200;
  }

  // hair
  strokeWeight(0);
  fill(35,36,40);
  rectMode(CENTER);
  rect(553,595,529,812,209,144,144,144);

  // shirt
  fill(255,214,174);
  rect(582,1153,729,542,187,187);
  noFill();
  stroke(255,159,159);
  strokeWeight(5)
  angleMode(DEGREES)
  arc(579,884,153,150,360,180);

  // face base
  strokeWeight(0);
  fill(255,240,202);
  rectMode(CENTER);
  rect(547,479,394,456,119,117,197,197);
  rect(578,764,121,237);
  ellipse(578,878,120,120)

  // hair 2
  strokeWeight(0);
  fill(35,36,40);
  ellipse(359,294,71,71);
  quad(433,229,748,247,758,432,391,279);

  // face details
    // nose, ears
  noFill();
  stroke(255,159,159);
  angleMode(RADIANS);
  strokeWeight(5);
  arc(656,448,74,75,PI + HALF_PI,HALF_PI);
  arc(657,500,30,29,HALF_PI,PI + HALF_PI);
  strokeWeight(10);
  arc(644,465,152,152,PI + HALF_PI,HALF_PI);
  arc(392,519.5,49,49,HALF_PI,PI + HALF_PI);
  angleMode(DEGREES)
  arc(380,434,125,124,270,80);
    // eyes
  strokeWeight(0);
  fill(255,255,255);
  rect(525,436,75,40,20,20,20,20);
  rect(374,439,47,40,20,20,20,20);
  fill(35,36,40);
  rect(532,421,70,11,5,5,5,5);
  rect(378,424,40,11,5,5,5,5);
  ellipse(502,438,33,44);
  ellipse(361,439,23,40);
    // eyebrows
  rect(555,371,104,19,10,10,10,10);
  rect(359,374,49,19,10,10,10,10);
    // cheek
  fill(255,221,197);
  ellipse(543,563,145,145);
    // mouth
  fill(255,159,159);
  triangle(405,607,421,621,399,621);
  strokeCap(ROUND);
  stroke(255,159,159);
  strokeWeight(10);
  line(405,607,421,621);
  line(421,621,399,621);
  line(399,621,405,607);

    // moles
  strokeWeight(0)
  fill(35,36,40);
  ellipse(503,623,5,5);
  ellipse(586,533,2.5,2.5);
  ellipse(452,626,2.5,2.5);

  // fin!
}