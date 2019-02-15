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
    img = loadImage("https://scontent.fagc2-1.fna.fbcdn.net/v/t1.0-9/44824245_1935019013257397_3442166024294629376_n.jpg?_nc_cat=106&_nc_ht=scontent.fagc2-1.fna&oh=20689f4ef54a6fc95922b240a2579026&oe=5C552C4F");
    
    //sorry for long link, it's from facebook,
    //I tried url shorteners but they messed up the program
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



