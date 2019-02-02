/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-06-Abstract Clock
*/

function setup() {
    createCanvas(480,480);
    background(255);
}

function draw() {
    // //background
    // //wall
    // noStroke();
    // fill(222, 255, 251);
    // rect(0, 0, 480, 420);
    // table
    fill(250);
    noStroke();
    rect(0, 380, 480, 90);

    //tv
    //antennae base
    fill(0);
    ellipse(233, 165, 40, 40); 
    //antennae
    stroke(0);
    strokeWeight(2);
    line(185, 35, 220, 150); 
    line(285, 35, 245, 150); 
    //antennae tips
    strokeWeight(5);
    point(185, 35); 
    point(285, 35); 
    //feet
    noStroke();
    fill(200);
    rect(115, 408, 20, 10, 0, 0, 3, 3); 
    rect(340, 408, 20, 10, 0, 0, 3, 3); 
    //base
    fill(40);
    rect(104, 398, 265, 10); 
    //body
    rect(66, 165, 345, 233, 13, 13, 25, 25); 
    fill(0);
    rect(76, 172, 325, 220, 13, 13, 25, 25);
    //screen
    noStroke();
    fill("White");
    rect(108, 213, 192, 138, 25, 25, 28, 28); 
    //control bar
    fill(80);
    rect(327, 185, 45, 190, 3, 3, 3, 3); 
    fill(0);
    rect(329.5, 269, 40, 11);
    rect(329.5, 283, 40, 90);
    //knob 1
    fill(0);
    ellipse(350, 207, 36, 36);
    fill(80);
    ellipse(350, 207, 12, 12); 
    stroke(0);
    strokeWeight(2);
    line(350, 188, 350, 220);
    //knob 2
    fill(0);
    ellipse(350, 247, 30, 30);
    fill(80);
    ellipse(350, 247, 8, 8);
    line(350, 230, 350, 233);
    //other knobs
    fill(40);
    ellipse(387, 196, 14, 14);
    ellipse(387, 216, 11, 11);
    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(387, 271, 8, 8);
    ellipse(387, 312, 8, 8);
    ellipse(387, 354, 8, 8);

    //time variables
    // var H = hour();
    // var M = minute();
    // var S = second();
    var H = hour();
    var M = minute();
    var S = second();
    //maps time to screen width
    var mappedH = map(H, 0, 24, 0, 192);
    var mappedM = map(M, 0, 60, 0, 192);
    var mappedS = map(S, 0, 60, 0, 192);
    //color blocks
    push();
    blendMode(DIFFERENCE); //overlays the screen colors
    noStroke();
    fill("Red");
    rect(108, 213, mappedH, 138);
    fill("Green");
    rect(108, 213, mappedM, 138);
    fill("Blue");
    rect(108, 213, mappedS, 138);
    pop();

    //screen border
    noFill();
    stroke(0);
    strokeWeight(20);
    rect(98, 205, 212, 153, 32, 32, 38, 38); 
    stroke(40);
    strokeWeight(2);
    rect(90, 200, 227, 163, 4, 4, 7, 7);

}


