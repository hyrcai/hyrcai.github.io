let x = 1;
let y = 1;
let easing = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  colorMode(RGB);
  background(250, 250, 250, 5);

  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;
  
  colorMode(HSB, 100, 100, 100);
  let h = millis() / 1000;
  fill(h % 100, 50, 100);
  ellipse(x, y, 500);
  // ellipse(mouseX, mouseY, 500);
}
