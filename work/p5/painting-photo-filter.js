/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Project-09-Portrait
*/

var img;

//brush start position is top left corner of the canvas
var x = 0;
var y = 0;

//load image
function preload() {
    img = loadImage("https://hannah-cai.github.io/play/p5/photo.jpg");
}

function setup() {
    createCanvas(480, 480);
    background("RosyBrown");

    //load pixels from image
    img.loadPixels();
}

function draw() {
    
    //get the color of the image at the current position (x, y)
    var col = img.get(x, y);

    //click and drag to erase
    if (mouseIsPressed) {
        noStroke();
        fill("RosyBrown");
        ellipse(mouseX, mouseY, random(5, 20));

    } else { //if mouse isn't pressed,

        //draw an ellipse with random size at (x, y) with the color from col
        noStroke();
        fill(col);
        ellipse(x, y, random(5, 20));

        //ellipse follows mouse around; move mouse around to paint
        var dirX = mouseX - x;
        var dirY = mouseY - y;
        x += dirX / 5;
        y += dirY / 5; 
    }
}



