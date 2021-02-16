/*-----------------------------------------------*/
//setup 🟩
// get elements
let nav = document.querySelector('nav');
let header = document.querySelector('header');
let overview = document.getElementById('overview');
// get window width and height
var winWidth = window.innerWidth || document.documentElement.clientWidth || 
    document.body.clientWidth;
var winHeight = window.innerHeight || document.documentElement.clientHeight|| 
    document.body.clientHeight;
// load a random message in the footer
let messages = document.getElementById('messages').getElementsByTagName('p');
var show = getRandomNumber(0, messages.length, 0);
messages[show].style.display = "inline";

/*-----------------------------------------------*/
//style
// set variables for styling 🟩
var margin = 48;
var offsetX = margin;
var offsetY = nav.offsetHeight;
if (header) {
    offsetY += header.offsetHeight;
}
var variation, size;
var threshold = 400;
var rows, columns, x, y, xInterval, yInterval, xVariation, yVariation;
var factor;

//style galleries
var galleries = document.querySelectorAll('.gallery-b, .gallery-s');
var clicks = 0;
style(galleries);
document.addEventListener('click', (event) => {
    clicks++;
    style(galleries);
})

function style(galleries) {
    for (var i = 0; i < galleries.length; i++) {
        let thisGallery = galleries[i];
        //        let thisLabel = thisProject.querySelector('.label');
        let covers = thisGallery.querySelector('.covers');
        let numCovers = covers.children.length;


        // show labels 🟩
        //        thisLabel.classList.add('no-transition');
        //        thisLabel.style.opacity = 1;
        //        thisLabel.style.zIndex = 1;
        //        thisLabel.offsetHeight;
        //        thisLabel.classList.remove('no-transition');

        // set cover positions 🟨
        // set up variables
        var gWidth = thisGallery.clientWidth;
        var gHeight = thisGallery.clientHeight;

        columns = Math.floor(gWidth / 300);
        xInterval = (gWidth - (margin * 3)) / columns;
        yInterval = gWidth / (columns * (2 - (numCovers * 0.01)));

        for (var c = 0; c < numCovers; c++) {
            let thisCover = covers.children[c];

            // put covers in separate divs
            if (clicks == 0) {
                var parent = covers;
                var cover = document.createElement('div');
                cover.classList.add('cover');
                parent.replaceChild(cover, thisCover);
                cover.appendChild(thisCover);
                thisCover = cover;
            }

            // get position
            if (numCovers > 3) {
                x = Math.ceil((c + 1) % columns) * xInterval + (margin * 2);
                y = Math.ceil((c + 1) / columns) * yInterval - (margin * 3);
                variation = 160;
                size = 0.2;
            } else {
                x = (gWidth / 2) - (margin * 3);
                y = 0;
                variation = 120;
                size = 0.24;
            }

            // add some randomness 🟩
            factor = 1;
            xVariation = getRandomNumber(-variation - (numCovers * factor), variation + (numCovers * factor), margin);
            yVariation = getRandomNumber(-variation - (numCovers / 2), variation + (numCovers / 2), margin);
//            console.log(variation - (numCovers * factor));

            //set position
            thisCover.style.left = x + xVariation + "px";
            thisCover.style.top = y + yVariation + margin + "px";

            // scale by width or height 🟨
            var width = thisCover.clientWidth;
            var height = thisCover.clientHeight;
            var factor = numCovers * 0.006;
            if (width > height) {
                thisCover.firstElementChild.style.maxWidth = winWidth * (size - factor) + "px";
//                thisCover.style.height = "auto";
            } else if (height > width) {
//                thisCover.style.maxWidth = winWidth * ((size * 0.8) - factor) + "px";
////                console.log((0.12 - factor));
                thisCover.firstElementChild.style.height = winWidth * (size - factor) + "px";
                thisCover.firstElementChild.style.width = "auto";

            } else {
                thisCover.firstElementChild.style.maxWidth = winWidth * (size - factor) + "px";
            }
        }
        thisGallery.style.height = y + "px";
    }
}

/*-----------------------------------------------*/
//mouse interactions
//let addPerspective = document.getElementsByClassName('perspective');
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;

    //get projects
    for (var i = 0; i < galleries.length; i++) {
        var thisGallery = galleries[i];
        //        var thisLabel = thisProject.querySelector('.label');
        var covers = thisGallery.getElementsByClassName('cover');

        var perspective = getPerspective(12);
        thisGallery.style.transform = "rotateX(" + perspective[1] + "deg) rotateY(" + perspective[0] + "deg)";

        // change cover size based on mouse position 🟩
        for (var c = 0; c < covers.length; c++) {
            var thisCover = covers[c];
            var dist = calculateDistance(thisCover, mouseX, mouseY);
            if (dist < threshold) {
                thisCover.style.transform = 'scale(' + (1 + (threshold - (dist)) / (threshold * 0.6)) + ')';
            } else {
                thisCover.style.transform = 'scale(1)';
            }
        }

        //        //show label if mouse is over cover
        //        thisLabel.style.opacity = 0;
        //        thisLabel.style.left = mouseX - margin - (thisLabel.offsetWidth / 2) + 'px';
        //        thisLabel.style.top = mouseY - offsetY + (margin * 2) + 'px';
        //        if (thisProject.matches(':hover')) {
        //            thisLabel.style.opacity = 1;
        //            thisLabel.style.zIndex = 1001;
        //        }
    }
}

/*-----------------------------------------------*/
//utility functions 🟩
function getRandomNumber(min, max, margin) {
    return Math.floor((Math.random() * (max - min - margin)) + min);
}
function calculateDistance(elem, mouseX, mouseY) {
    var rect = elem.getBoundingClientRect();
    return Math.floor(Math.sqrt(Math.pow(mouseX - (rect.left + (rect.width / 2)), 2) + Math.pow(mouseY - (rect.top + (rect.height / 2) + window.scrollY), 2)));
}
function getPerspective(maxRotation) {
    var pos = [event.pageX / winWidth, event.pageY / winHeight];
    for (var j = 0; j < pos.length; j++) {
        if (pos[j]<0) {
            pos[j] = 0;
        }
        if (pos[j]>1) {
            pos[j] = 1;
        }
    }
    pos[0] = Math.round(((pos[0]*2)-1)*maxRotation);
    pos[1] = Math.round(((pos[1]*-2)+1)*maxRotation);
    return pos;
}