/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-05-Wallpaper
*/

var x;
var y;
var x1;
var y1;
var x2;
var y2;
var x3;
var y3;
var x4;
var y4;

function setup() {
    createCanvas(710, 480);
    background(255);
}

function draw() {
    noLoop();
    smooth();
    angleMode(DEGREES);
    scale(1);
    translate(-90, 90);
    //dot grid
    for (x = 20; x < 1000; x += 50) {
        for (y = -99; y < 5000; y += 50) {
            stroke(0); 
            strokeWeight(1);
            point(x, y);
        }
    }

//yellow leaf
    for (x2 = 80; x2 < 2000; x2 += 320) {
        for (y2 = 70; y2 < 5000; y2 += 200) {
            //leaf
            fill(239, 211, 94);
            noStroke();
            push();
            translate(x2, y2 - 115);
            rotate(45);
            rect(0, 0, 55, 55, 15, 75, 0, 75);
            pop();
            //spot1
            stroke(192, 119, 50); 
            strokeWeight(5);
            point(x2 - 10, y2 - 85);
            //spot 2
            strokeWeight(2);
            point(x2 + 10, y2 - 73);
            //spot 3
            point(x2 - 12, y2 - 55);
            //stem
            strokeWeight(1);
            line(x2, y2 - 108, x2, y2 - 10);
        }
    }

//purple leaves
    for (x4 = 160; x4 < 1000; x4 += 320) {
        for (y4 = -90; y4 < 5000; y4 += 200) {
            //leaf 1
            noStroke();
            fill(149, 84, 90);
            ellipse(x4 + 0.5, y4 - 90, 12, 22); 
            //right leaves/branches
            for (i = 0; i < 3; i ++) {
                push();
                noStroke();
                translate(x4 + 9, y4 - (80 - 25 * i));
                rotate(45);
                ellipse(0, 0, 12, 22); 
                pop();
                stroke(89, 37, 37); 
                strokeWeight(1);
                line(x4, y4 - (72 - 25 * i), x4 + 15, y4 - (88 - 25 * i));
            }
            //left leaves/branches
            for (i = 0; i < 3; i ++) {
                push();
                noStroke();
                translate(x4 - 8, y4 - (80 - 25 * i));
                rotate(-45);
                ellipse(0, 0, 12, 22); 
                pop();
                line(x4, y4 - (72 - 25 * i), x4 - 15, y4 - (88 - 25 * i));
            }
            //stem
            line(x4, y4 - 100, x4, y4);
            //spot 1
            stroke(239, 211, 94); 
            strokeWeight(1);
            point(x4 + 13, y4 - 80);
            //spot 2
            point(x4 - 6, y4 - 33);
        }
    }

    //green leaves
    for (x1 = 250; x1 < 1000; x1 += 320) {
        for (y1 = -240; y1 < 5000; y1 += 200) {
            //leaf 1
            fill(159, 193, 64);
            noStroke();
            ellipse(x1, y1 - 75, 8, 52); 
            //leaf 2
            push();
            translate(x1 + 17, y1 - 60);
            rotate(208);
            ellipse(0, 0, 5, 35); 
            pop();
            //leaf 3
            push();
            translate(x1 - 18, y1 - 50);
            rotate(337);
            ellipse(0, 0, 4, 35); 
            pop();
            //branch for leaf 2
            stroke(104, 140, 27); 
            strokeWeight(1);
            line(x1, y1 - 30, x1 + 25, y1 - 75);
            //branch for leaf 3
            line(x1, y1 - 10, x1 - 25, y1 - 65);
            //stem
            line(x1, y1 - 100, x1, y1);
        }
    }

//purple flowers
    for (x3 = 330; x3 < 5000; x3 += 390) {
        for (y3 = -260; y3 < 5000; y3 += 200) {
            //stem
            stroke(159, 193, 64); 
            line(x3, y3 - 108, x3, y3);
            //flower 1
            fill(250, 204, 255);
            noStroke();
            ellipse(x3, y3 - 108, 5);
            ellipse(x3 - 2.5, y3 - 105.5, 5);
            ellipse(x3 + 2.5, y3 - 105.5, 5);
            ellipse(x3, y3 - 103, 5);
            //flower 1 center
            push();
            fill(149, 84, 90);
            rect(x3 - 0.5, y3 - 106, 1, 1);
            //flower 2
            x3 -= 2;
            y3 += 7;
            fill(250, 204, 255);
            ellipse(x3, y3 - 108, 5);
            ellipse(x3 - 2.5, y3 - 105.5, 5);
            ellipse(x3 + 2.5, y3 - 105.5, 5);
            ellipse(x3, y3 - 103, 5);
            //flower 2 center
            fill(149, 84, 90);
            rect(x3 - 0.5, y3 - 106, 1, 1);
            //flower 3
            x3 += 6;
            y3 += 7;
            fill(250, 204, 255);
            ellipse(x3, y3 - 108, 5);
            ellipse(x3 - 2.5, y3 - 105.5, 5);
            ellipse(x3 + 2.5, y3 - 105.5, 5);
            ellipse(x3, y3 - 103, 5);
            //flower 3 center
            fill(149, 84, 90);
            rect(x3 - 0.5, y3 - 106, 1, 1);
            //flower 4
            x3 -= 7;
            y3 += 5;
            fill(250, 204, 255);
            ellipse(x3, y3 - 108, 5);
            ellipse(x3 - 2.5, y3 - 105.5, 5);
            ellipse(x3 + 2.5, y3 - 105.5, 5);
            ellipse(x3, y3 - 103, 5);
            //flower 4 center
            fill(149, 84, 90);
            rect(x3 - 0.5, y3 - 106, 1, 1);
            //flower 5
            x3 += 8;
            y3 += 8;
            fill(250, 204, 255);
            ellipse(x3, y3 - 108, 5);
            ellipse(x3 - 2.5, y3 - 105.5, 5);
            ellipse(x3 + 2.5, y3 - 105.5, 5);
            ellipse(x3, y3 - 103, 5);
            //flower 5 center
            fill(149, 84, 90);
            rect(x3 - 0.5, y3 - 106, 1, 1);
            //flower 6
            x3 -= 8;
            y3 += 6;
            fill(250, 204, 255);
            ellipse(x3, y3 - 108, 5);
            ellipse(x3 - 2.5, y3 - 105.5, 5);
            ellipse(x3 + 2.5, y3 - 105.5, 5);
            ellipse(x3, y3 - 103, 5);
            //flower 6 center
            fill(149, 84, 90);
            rect(x3 - 0.5, y3 - 106, 1, 1);
            pop();
            //leaves
            fill(149, 84, 90);
            push();
            translate(x3 + 7, y3 - 90);
            rotate(-45);
            ellipse(0, 0, 10, 3);
            pop();
            push();
            fill(149, 84, 90);
            translate(x3, y3 - 90);
            rotate(45);
            ellipse(0, 0, 10, 3);
            pop();
        }
    }
    noLoop();
}



