/* Hannah Cai
Section C
hycai@andrew.cmu.edu
Final Project
*/

//particle position arrays
var particleNumber = 100; //number of particles
var psize = 2; //particle size
var px = []; //particle x position
var py = []; //particle y position
var pz = []; //particle z position
var distanceToPoint; //dist from (mouseX, mousY) to (px, py)
var amplitude = 3.14 * 3; //amplitude of bobbing animation
var waveSpeed; //speed of bobbing animation
var theta = 0; //plugin for sin()

//particle sound arrays
var threshold = 150; //minimum distance between mouse and particle to trigger glow/sound
var notes = [130.81, 146.83, 164,81, 174.61, 196, 220, 246.94, //pitches of whole notes from C3
            261.63, 293.66, 329.63, 349.23, 392.00, 440, 493.88, 
            523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 
            1046.5, 1174.66, 1318.51, 1396.91, 1567.98, 1760, 2093]; //to C7
var ppitch = []; //pitch values for each particle
var pOsc = []; //oscillator for each particle
var pvolume = 0; //volume of each particle
var pOscOn = []; //array of booleans for if the oscillators are on

//misc other particle arrays
var pClicked = []; //array of booleans for if the particle was clicked
var glowSize; //size of particle glow
var maxGlow = 100; //max size of glow

//arrays for cursor
var xarray = [0, 10, 20, 30, 40, 50];
var yarray = [0, 10, 20, 30, 40, 50];
var s;

//arrays for camera and perspective
var camX;
var camY;
var camZ;
var rotateX;
var rotateY;

//arrays for lines between particles
var connect = [];
var connectionThreshold = 200;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); //fit canvas to window size

    //set up variables; store in arrays
    for (i = 0; i < particleNumber; i++) {
        px.push(random(-width * 0.8, width * 0.8));
        py.push(random(-height, height));
        pz.push(random(-width, height / 2));
        ppitch.push(notes[floor(random(0, notes.length))]);
        pOscOn.push(false);
        pClicked.push(false);
        makeOsc(i);
    }
}

function makeOsc(index) {
    myOsc = new p5.SinOsc();
    myOsc.freq(ppitch[index]);
    pOsc.push(myOsc); //store oscillators in pOsc array
}

function playOsc(index) {
    var maxVolume = 0.01;
    pvolume = constrain(pvolume, 0, maxVolume);
    //turn clicked particles permanently on
    if (pClicked[index] === true) { 
        pvolume = maxVolume;
    } else { 
    //unclicked particles get louder as the mouse gets closer
        pvolume = map(distanceToPoint, threshold, 0, 0, maxVolume);
    }
    //make particles with lower pitches louder, so all ranges are heard clearly
    var factor =  map(ppitch[index], ppitch[0], ppitch[ppitch.length - 1], 5, 1);
    pvolume *= factor;
    pOsc[index].amp(pvolume);
}

function stopOsc(index) {
    pOsc[index].stop();
}

function draw() {
    background(0);
    noStroke(); //get rid of default black stroke

    //map camera position to mouse position to simulate orbit control
    camX = map(mouseX, 0, width, -width / 2, width / 2);
    camY = map(mouseY, 0, height, -height / 2, height / 2);
    camZ = (height/2.0) / tan(PI*30.0 / 180.0);
    camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);

    //set up particles
    for (i = 0; i < particleNumber; i++) {
        drawLines(i); //draw lines between clicked particles
        //create bobbing movement

        waveSpeed = map(pz[i], -width, height, 20000, 70000); //create parallax effect
        theta += (TWO_PI / waveSpeed);
        if (theta > amplitude) {
            theta = -theta;
        }
        py[i] += sin(theta);

        push();
        translate(px[i], py[i], pz[i]);
        drawGlow(i); //draw glow of each particle
        //draw each particle
        fill(255); 
        smooth();
        sphere(psize);
        pop();

        // //play a particle's oscillator if the mouse's 
        // //distance is less than the threshold
        // if (distanceToPoint <= threshold) {
        //     if (pOscOn[i] == false) {
        //         pOsc[i].start();
        //         pOscOn[i] = true;
        //     }
        //     playOsc(i);
        // }

        // //stop a particle's oscillator if the mouse's 
        // //distance is greater than the threshold
        // if (distanceToPoint > threshold && pClicked[i] == false) {
        //     stopOsc(i);
        //     pOscOn[i] = false;
        // }
    }

    //cursor
    noCursor(); //turn off the cursor icon, display below instead
    //this is basically the code from the snake lab we did
    for (var i = 0; i < xarray.length; i++) {
        fill(255, 255, 200);
        s = 8 - (xarray.length - i);
        ellipse(xarray[i], yarray[i], s, s);
    }
    xarray.push(mouseX - width / 2);
    yarray.push(mouseY - height / 2);
    if (xarray.length > 8) {
        xarray.shift();
        yarray.shift();
    }
}

function drawGlow(index) {
    push();
    noStroke();
    //rotate the (flat) ellipses to face the cameras to simulate 3d glow
    rotateX(radians(map(camY, -height / 2, height / 2, 40, -40)));
    rotateY(radians(map(camX, -width / 2, width / 2, -45, 45)));

    //calculate distance from mouse to each point
    distanceToPoint = dist(mouseX - width / 2, mouseY - height / 2, px[index], py[index]);
    
    //clicked particles have a pulsing glow;
    //unclicked particles glow when the mouse hovers close to them
    if (pClicked[index] === true) {
        glowSize = map(sin(theta), TWO_PI, 0, psize, maxGlow);
    } else {
        glowSize = map(distanceToPoint, maxGlow, psize, psize, maxGlow);
    }
    //draw the actual glow (a radial alpha gradient)
    for (r = psize; r < glowSize; r += 1.5) {
        fill(255, 255, 200, map(r, psize, glowSize, 2, 0));
        ellipse(0, 0, r);
    }
    pop();
}

function drawLines(index) {
    push();
    //push the indices of clicked particles in the "connect" array;
    //turn off/remove particles from the array if clicked again
    if (pClicked[index] == true && ! connect.includes(index)) {
        connect.push(index);
    } else if (pClicked[index] == false) {
        connect.splice(index, 1);
    }

    //connect groups of particles that are clicked if the distance between is less than the threshold
    stroke(255);
    strokeWeight(0.5);
    noFill();
    for (i = 0; i < connect.length; i++) {
        for (j = i + 1; j < connect.length; j++) {
            if (dist(px[connect[i]], py[connect[i]], pz[connect[i]], 
                px[connect[j]], py[connect[j]], pz[connect[j]]) < connectionThreshold) {
                beginShape(LINES);
                vertex(px[connect[i]], py[connect[i]], pz[connect[i]]);
                vertex(px[connect[j]], py[connect[j]], pz[connect[j]]);
                endShape();
            }
        }
    }
    noStroke();
    pop();
}

//if window is resized, refit the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
    for (i = 0; i < particleNumber; i++) {
        distanceToPoint = dist(mouseX - width / 2, mouseY - height / 2, px[i], py[i]);
        //toggle pClicked on and off if mouse clicks within 10 pixels of a particle
        if (distanceToPoint < 10 && pClicked[i] == false) {
            pClicked[i] = true;
        } else if (distanceToPoint < 10 && pClicked[i] == true) {
            pClicked[i] = false;
        }
    }
}

