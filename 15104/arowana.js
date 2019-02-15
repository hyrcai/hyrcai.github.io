/* Hannah Cai
hycai@andrew.cmu.edu
Section C
Project-02-Variable-Face
*/

function setup() {
    createCanvas(640,480);
    background(250);
    rectMode(CENTER);
    ellipseMode(CENTER);
    angleMode(DEGREES);

    // color variables
    bodyR = 251;
    bodyG = 176;
    bodyB = 64;
    finR = 190;
    finG = 30;
    finB = 45;
    scaleR = 255;
    scaleG = 215;
    scaleB = 86;

    size = 1;
    shear = 0;
    gillWeight = (5); 
    showWhiskers = (1);
    whiskerAngle = (0);
    whiskerLength = (33);
    finStyle = 0;
    scaleStyle = 0;
    scaleDot = 0;
    scaleDotSize = 0;
    specimenNumber = 8108;
}

function draw() {
    background(250);
    // label
    textFont('Courier New');
    textStyle(ITALIC);
    textAlign(CENTER);
    textSize(20);
    noStroke();
    fill(0);
    text('Arowana',320,357); //species name
    textSize(14);
    text('Osteoglossidae',320,375); //scientific name
    textSize(10);
    textFont('Courier');
    text('specimen #'+specimenNumber,320,395); //"specimen # x"

    translate(320,240); 
    scale(size);
    shearX(shear);
    translate(-320,-240);

    // tail fins
    fill(finR,finG,finB);
    noStroke();
        // tail
        translate(455,213);
        rotate(-45);
        rect(0,0,112,112,0,40,100,40);
        rotate(45);
        translate(-455,-213);
        // top fin
        ellipse(390,151,71,47);
        // bottom fins
        if (finStyle <= 0.5) { //fin style 1: two short bottom fins
        shearX(35);
        rect(180,270,117,48,0,200,30,200);
        shearX(-35);
        rect(267,274,54,41,0,50,5,50);
        } else { //fin style 2: one long bottom fin
        shearX(35);
        rect(150,270,180,48,0,200,30,200);
        shearX(-35);
        noFill();
        stroke(finR,finG,finB);
        strokeWeight(1);
        arc(266,270,150,70,150,260);
        }

    // whiskers
    if (showWhiskers >= 0.5) { 
    noStroke();
    fill(bodyR,bodyG,bodyB);
    translate(137,151);
    rotate(-whiskerAngle);
    ellipse(-1,-17,4,whiskerLength);
    rotate(whiskerAngle);
    translate(-137,-151);
    }

    // body
    noStroke();
    fill(bodyR,bodyG,bodyB);
    arc(245,150,219,218,0,180); //head
    rect(322,204.5,170,109,0,100,100,0); //tail

    // scales
    strokeWeight(1);
    if (scaleStyle >= 0.5) { //scale style 1: outlines
        noStroke();
        fill(scaleR,scaleG,scaleB);
    } else { //scale style 2: half-circles
        noFill();
        strokeWeight(1);
        stroke(scaleR,scaleG,scaleB);
    }
    arc(223,168,34,34,-90,90); //row 1
    arc(223,204,34,34,-90,90);
    arc(223,240,34,34,-90,90);
    arc(240,185,34,34,-90,90); //row 2
    arc(240,221,34,34,-90,90);
    arc(257,168,34,34,-90,90); //row 3
    arc(257,204,34,34,-90,90);
    arc(257,240,34,34,-90,90);
    arc(274,185,34,34,-90,90); //row 4
    arc(274,221,34,34,-90,90);
    arc(291,168,34,34,-90,90); //row 5
    arc(291,204,34,34,-90,90);
    arc(291,240,34,34,-90,90);
    arc(308,185,34,34,-90,90); //row 6
    arc(308,221,34,34,-90,90);
    arc(325,168,34,34,-90,90); //row 7
    arc(325,204,34,34,-90,90);
    arc(325,240,34,34,-90,90);
    arc(342,185,34,34,-90,90); //row 9
    arc(342,221,34,34,-90,90);
    arc(359,168,34,34,-90,90); //row 10
    arc(359,204,34,34,-90,90);
    arc(359,240,34,34,-90,90);
    arc(376,185,34,34,-90,90); //row 11
    arc(376,221,34,34,-90,90);
    arc(393,204,27,34,-90,90); //row 12

    //scale details
    if (scaleDot >= 0.5) {
    noStroke();
    fill(scaledotR,scaledotG,scaledotB)
    arc(223,168,scaleDotSize,scaleDotSize,-90,90); //row 1
    arc(223,204,scaleDotSize,scaleDotSize,-90,90);
    arc(223,240,scaleDotSize,scaleDotSize,-90,90);
    arc(240,185,scaleDotSize,scaleDotSize,-90,90); //row 2
    arc(240,221,scaleDotSize,scaleDotSize,-90,90);
    arc(257,168,scaleDotSize,scaleDotSize,-90,90); //row 3
    arc(257,204,scaleDotSize,scaleDotSize,-90,90);
    arc(257,240,scaleDotSize,scaleDotSize,-90,90);
    arc(274,185,scaleDotSize,scaleDotSize,-90,90); //row 4
    arc(274,221,scaleDotSize,scaleDotSize,-90,90);
    arc(291,168,scaleDotSize,scaleDotSize,-90,90); //row 5
    arc(291,204,scaleDotSize,scaleDotSize,-90,90);
    arc(291,240,scaleDotSize,scaleDotSize,-90,90);
    arc(308,185,scaleDotSize,scaleDotSize,-90,90); //row 6
    arc(308,221,scaleDotSize,scaleDotSize,-90,90);
    arc(325,168,scaleDotSize,scaleDotSize,-90,90); //row 7
    arc(325,204,scaleDotSize,scaleDotSize,-90,90);
    arc(325,240,scaleDotSize,scaleDotSize,-90,90);
    arc(342,185,scaleDotSize,scaleDotSize,-90,90); //row 9
    arc(342,221,scaleDotSize,scaleDotSize,-90,90);
    arc(359,168,scaleDotSize,scaleDotSize,-90,90); //row 10
    arc(359,204,scaleDotSize,scaleDotSize,-90,90);
    arc(359,240,scaleDotSize,scaleDotSize,-90,90);
    arc(376,185,scaleDotSize,scaleDotSize,-90,90); //row 11
    arc(376,221,scaleDotSize,scaleDotSize,-90,90);
    arc(393,204,scaleDotSize,scaleDotSize,-90,90); //row 12
    }

    // eyes
    noStroke();
    fill(255);
    ellipse(172,165,25,25); //whites
    fill(0);
    ellipse(172,165,21,21); //pupil

    // gills
    noFill();
    stroke(finR,finG,finB);
    strokeWeight(gillWeight);
    arc(179,192,69,69,-40,105);

    // mouth
    strokeWeight(1);
    arc(94,204,138,138,-50,-15);

    // gill fin
    strokeWeight(gillWeight);
    fill(finR,finG,finB);
    ellipse(240,228,67,20);
}


function mousePressed() {
    size = random(.5,1.2);
    shear = random(0,15); //horizontal stretch
    showWhiskers = random(0,1);
    finStyle = random(0,1);
    scaleStyle = random(0,1);
    scaleDot = random(0,1);
    scaleDotSize = random(0,30);
    // color variables
    bodyR = random(100,250);
    bodyG = random(100,250);
    bodyB = random(100,250);
    finR = bodyR - random(50,150);
    finG = bodyG - random(50,150);
    finB = bodyB - random(50,150);
    scaleR = bodyR + random(50,100);
    scaleG = bodyG + random(50,100);
    scaleB = bodyB + random(50,100);
    scaledotR = scaleR - random(30,50)
    scaledotG = scaleG - random(30,50)
    scaledotB = scaleB - random(30,50)

    gillWeight = random(1,5);
    whiskerAngle = random(0,90);
    whiskerLength = random(30,50);
    specimenNumber = random(0,9999);
    specimenNumber = round(specimenNumber); //rounds specimen# to whole number
}
