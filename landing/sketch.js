

var gravity = 0.8;   // downward acceleration
var springy = 0.95; // how much velocity is retained after bounce
var drag = 0.0001;    // drag causes particles to slow down
var np = 100;      // how many particles


function particleStep() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > width) { // bounce off right wall
        this.x = width - (this.x - width);
        this.dx = -this.dx * springy;
    } else if (this.x < 0) { // bounce off left wall
        this.x = -this.x;
        this.dx = -this.dx * springy;
    }
    if (this.y > height) { // bounce off bottom
        this.y = height - (this.y - height);
        this.dy = -this.dy * springy;
    } else if (this.y < 0) { // bounce off top
        this.y = -this.y;
        this.dy = -this.dy * springy;
    }

    this.dy = this.dy + gravity; // force of gravity
    // drag is proportional to velocity squared
    // which is the sum of the squares of dy and dy
    var vs = Math.pow(this.dx, 2) + Math.pow(this.dy, 2);
    // d is the ratio of old velocty to new velocity
    var d = vs * drag;
    // d goes up with velocity squared but can never be
    // so high that the velocity reverses, so limit d to 1
    d = min(d, 1);
    // scale dx and dy to include drag effect
    this.dx *= (1 - d);
    this.dy *= (1 - d);

    //
    var rpx = mouseX;
    var rpy = mouseY;
    var rpc = 2000;
    var d = dist(rpx, rpy, this.x, this.y);
    var f = rpc / (Math.pow(d, 1.5));
    var dirx = (this.x - rpx) / d;
    var diry = (this.y - rpy) / d;
    this.dx += dirx * f;
    this.dy += diry * f;
    //
}

function particleDraw() {
    stroke(this.color);
    strokeWeight(this.size);
    point(this.x, this.y);
}

// create a "Particle" object with position and velocity
function makeParticle(px, py, pdx, pdy) {
    p = {x: px, y: py,
         dx: pdx, dy: pdy,
         age: 0,
         size: random(5, 20),
         color: ("lightpink"),
         step: particleStep,
         draw: particleDraw
        }
    return p;
}

var particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < np; i++) {
        // make a particle
        var p = makeParticle(width / 2, height / 2,
                             random(-50, 50), random(-50, 50));
        // push the particle onto particles array
        particles.push(p);
    }
}

// draw all particles in the particles array
function draw() {
    background(250);
    push();
    noStroke();
    fill(245);
    pop();

    for (var i = 0; i < particles.length; i++) { // for each particle
        var p = particles[i];
        p.step();
        p.draw();
    }
}