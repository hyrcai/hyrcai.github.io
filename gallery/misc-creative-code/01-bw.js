/* Hannah Cai
1/5/22
abstract quarter circles
01-bw
*/

var x;
var y;
var canvasSize = 500;
var margin = 10;
//var arc = [[0, HALF_PI], [HALF_PI, PI], [PI, QUARTER_PI], [QUARTER_PI, TWO_PI]];

function setup() {
    //    make canvas responsive
    createCanvas(canvasSize, canvasSize);
    background(255);
    fill(0);
    noStroke();
    angleMode(DEGREES);
    var grid = floor(random(3, 11));
    var gridSize = floor((canvasSize-(2*margin))/grid);
    for (x = margin; x <= canvasSize-(2*margin); x += gridSize) {
        for (y = margin; y <= canvasSize-(2*margin); y += gridSize) {
            var randomAngle = floor(random(0, 5));
//            print(randomAngle);
            if (randomAngle == 1) {
                arc(x + gridSize, y, gridSize * 2, gridSize * 2, randomAngle * 90, (randomAngle + 1) * 90);
            }
            else if (randomAngle == 2) {
                arc(x + gridSize, y + gridSize, gridSize * 2, gridSize * 2, randomAngle * 90, (randomAngle + 1) * 90);
            }
            else if (randomAngle == 3) {
                arc(x, y + gridSize, gridSize * 2, gridSize * 2, randomAngle * 90, (randomAngle + 1) * 90);
            }
            else if (randomAngle == 4) {
                arc(x, y, gridSize * 2, gridSize * 2, randomAngle * 90, (randomAngle + 1) * 90);
            }
        }
    }
}

function mouseClicked() {
    setup();
}

