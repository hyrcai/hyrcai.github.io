/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-04-String Art
*/

var x1 = 100;
var y1 = 100;
var x2 = 300;
var y2 = 300;
var t = 25;


function setup() {
    createCanvas(480,480);
    background(255);
}

function draw() {
    scale(1.2);
    frameRate(40); //slowed down speed
    background(255,5); //translucent background
    stroke(0);
    strokeWeight(.3);

    //dotted square frame
    for (i = 100; i <= 300; i += 5) {
        point(i,100);
        point(i,300);
    }
    for (i = 100; i <= 300; i += 5) {
        point(100,i);
        point(300,i);
    }

    // bottom left and top right corner curves
    line(x1,300,100,y1);
    line(300,400 - y1,400 - x1,100);
    line(400 - x1,300,100,400 - y1);
    line(300,y1,x1,100);

    // top left and bottom right corner curves
    line(100,y2,x1,100);
    line(300,400 - y2,400 - x1,300);

    //string animation
    x1 += .5;
    y1 += .5;
    x2 -= .5;
    y2 -= .5;

    //constrain movement within square
    x1 = constrain(x1,100,300);
    y1 = constrain(y1,100,300);
    x2 = constrain(x2,100,300);
    y2 = constrain(y2,100,300);

    //resets string animation when it hits the square's sides
    if (x1 == 300 && y1 == 300 && x2 == 100 && y2 == 100) {
        x1 = x2;
        y1 = y2;
        y2 = 300;
    }
}

