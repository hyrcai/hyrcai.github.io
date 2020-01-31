var xoff = 0, inc = 0.1, pointList = [];
var r = 100;
var rad;
var detail = 25;
var lat, long;
var globe = new Array(detail + 1);
let pg;

function setup(){
  createCanvas(
    window.innerWidth,
    window.innerHeight,
    WEBGL
  );

  imageMode(CENTER);
  pg = createGraphics(width, height);
  pg.colorMode(HSB);
  // drawinPg();
  background(0);
}

function drawinPg(){
  for(var j=0; j<pg.height; j++){
    for(var i=0; i<pg.width; i++){
      pg.stroke(map(i, 0, 200, 0, 70), 255, 255);
      if(dist(i,j,pg.width*.5,pg.height*.5)<pg.width*.5) pg.point(i, j); 
    }
  }
}

function draw(){
  background(25);
  orbitControl();
 stroke(255);
  //rotateX(HALF_PI);

  ambientMaterial(255);

  if (pointList.length >= detail/2){
    pointList.splice(0, 1);
  }

  push();
  rotateY(frameCount * 0.02);
  rotateX(frameCount * 0.02);
  rotateZ(frameCount * 0.02);
  for (i = 0; i <= detail; i++) {
    var rad = map(noise(xoff), 0, 1, 0, 25);
    pointList.push(rad);
    if(i>detail*.5) xoff -= inc;
    else xoff += inc;

    lat = map(i, 0, detail, 0, PI);
    globe[i] = new Array(detail + 1);
    for (j = 0; j <= detail; j++) {
        long = map(j, 0, detail, 0, TWO_PI);
        // for (l = 0; l <= detail / 2; l++){
        k = (i > detail / 2) ? detail - i : i;
      var x = r * sin(lat) * cos(long) + pointList[j];
      var y = r * sin(lat) * sin(long) + pointList[j + 1];
      var z = r * cos(lat) + pointList[j + 2];
        // }
              globe[i][j] = createVector(x, y, z);
    }
  }
  // texture(pg);
  for (i = 0; i < detail; i++) {
    beginShape(POINTS);
    for (j = 0; j <= detail; j++) {
        var v1 = globe[i][j];
        var v2 = globe[i + 1][j];
        vertex(v1.x, v1.y, v1.z);    
        vertex(v2.x, v2.y, v2.z);
    }
    endShape(CLOSE);
  }
  pop();

//  sphere(1);
  var v = createVector(0.25, 0.25, 0);
  v.normalize();
  ambientLight(100);
  directionalLight(255, 255, 255, v);
  // pointLight(255, mouseX - height / 2, mouseY - height / 2, 250);
}