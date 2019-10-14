/* Hannah Cai
Section C
hycai@andrew.cmu.edu
[REPLACE]
*/

// var xarray = [0, 10, 20, 30, 40, 50];
// var yarray = [0, 10, 20, 30, 40, 50];

// function setup() {
//     createCanvas(500,500);
// }
// function draw() {
//     background(0);
//     fill(250);
//     noStroke();
//     for (var i = 0; i < xarray.length; i++) {
//         ellipse(xarray[i], yarray[i], 20, 20);
//     }
// }
// function mouseMoved() {
//     xarray.push(mouseX);
//     yarray.push(mouseY);
//     if (xarray.length > 20) {
//         xarray.shift();
//         yarray.shift();
//     }
// }
// function mousePressed() {
//     xarray = [];
//     yarray = [];
// }

//1
var xarray = [0, 10, 20, 30, 40, 50];
var yarray = [0, 10, 20, 30, 40, 50];

function setup() {
    createCanvas(500,500);
}
function draw() {
    background(250);
    fill(250);
    stroke("lightpink");
    for (var i = 0; i < xarray.length; i++) {
        line(xarray[i - 1], yarray[i - 1], xarray[i], yarray[i]);

    }
}
function mouseMoved() {
    xarray.push(mouseX);
    yarray.push(mouseY);
    if (xarray.length > 21) {
        xarray.shift();
        yarray.shift();
    }
}
function mousePressed() {
    xarray = [];
    yarray = [];
}

// //2
// var xarray = [0, 10, 20, 30, 40, 50];
// var yarray = [0, 10, 20, 30, 40, 50];
// function setup() {
//     createCanvas(500,500);
// }
// function draw() {
//     background(0);
//     fill(250);
//     stroke(250);
//     for (var i = 0; i < xarray.length; i++) {
//         line(xarray[i - 1], yarray[i - 1], xarray[i], yarray[i]);
//         yarray[i] += 1;
//         yarray[i] = constrain(yarray[i], 0, 499);
//     }
// }
// function mouseDragged() {
//     xarray.push(mouseX);
//     yarray.push(mouseY);
//     if (xarray.length > 20) {
//         xarray.shift();
//         yarray.shift();
//     }
// }
// function mousePressed() {
//     xarray = [];
//     yarray = [];
// }

//3
// var xarray = [0, 10, 20, 30, 40, 50];
// var yarray = [0, 10, 20, 30, 40, 50];
// var s;

// function setup() {
//     createCanvas(500,500);
//     rectMode(CENTER);
// }
// function draw() {
//     background(250);
//     fill(0);
//     noStroke();
//     for (var i = 0; i < xarray.length; i++) {
//         s = 10 - (xarray.length - i);
//         rect(xarray[i], yarray[i], s, s);
//         // yarray[i] += 1;
//         // yarray[i] = constrain(yarray[i], 0, 499);
//     }
// }
// function mouseMoved() {
//     push();
//     translate(mouseX, mouseY);
//     angleMode(DEGREES);
//     rotate(5);
//     xarray.push(mouseX);
//     yarray.push(mouseY);
//     if (xarray.length > 10) {
//         xarray.shift();
//         yarray.shift();
//     }
//         pop();
// }











