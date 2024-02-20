// get elements
let nav = document.getElementsByTagName('nav');
nav = nav[0];
let header = document.getElementsByTagName('header');
header = header[0];
let main = document.getElementsByTagName('main');
main = main[0];
var style;
var marginX = 0;
let gallery = document.getElementById('gallery');
let galleryStacks;
if (gallery) {
    galleryStacks = gallery.querySelectorAll('.stack:not(.hidden)');
}
let buttons = document.getElementsByTagName('button');
let overview = document.getElementById('overview');
let labels = document.getElementsByClassName('label');
let tags = document.getElementsByTagName('button');
let otherStacks = document.querySelectorAll('.stack-b, .stack-s');
let actions = 0;
var winWidth, winHeight, clientWidth;


// media queries
var widescreen = window.matchMedia("(min-width: 1800px)");
var tablet = window.matchMedia("(max-width: 1200px)");
var landscape = window.matchMedia("(max-width: 800px)");
var mobile = window.matchMedia("(max-width: 550px)");

// add type and medium attributes to gallery stacks
if (gallery) {
    for (var i = 0; i < galleryStacks.length; i++) {
        var thisStack = galleryStacks[i];
        if (thisStack.querySelector('.label')) {
            let thisLabel = thisStack.querySelector('.label');
            var labelButtons = thisLabel.getElementsByTagName('button');
            var types = "";
            var mediums = "";
            for (var b = 0; b < labelButtons.length; b++) {
                var thisTag = labelButtons[b];
                if (thisTag.getAttribute('type')) {
                    types += thisTag.getAttribute('type') + " ";
                }
                if (thisTag.getAttribute('medium')) {
                    mediums += thisTag.getAttribute('medium') + " ";
                }
            }
            thisStack.setAttribute("type", types);
            thisStack.setAttribute("medium", mediums);
        }
    }
}

// set variables for styling
var margin = 48;
var offsetX = margin;
var offsetY = margin;
// if (header) {
//     offsetY += header.offsetHeight;
// }
var variation = 160;
var threshold = 400;
var rows, columns, x, y, xInterval, yInterval, xVariation, yVariation;
var factor;
if (widescreen.matches) {
    style = window.getComputedStyle(main);
    marginX = style.marginLeft;
    marginX = parseInt(marginX);
}


// style main gallery project stacks
if (gallery) {
    styleElements(galleryStacks);
}

// // style other stacks
// styleElements(otherStacks);

// shuffle covers on click
document.addEventListener('click', (event) => {
    actions++;
    if (event.target.tagName == 'BUTTON') {
        galleryStacks = gallery.querySelectorAll('.stack:not(.hidden)');
        styleElements(galleryStacks);
        // set height to position footer properly
        gallery.style.height = (Math.ceil(galleryStacks.length / columns) * yInterval) + (margin * 3) + "px";
        if (galleryStacks.length == 0) {
            gallery.style.height = (margin * 10) + "px";
        }
    }
})

// re-style on window resize
window.addEventListener('resize', function (event) {
    actions++;
    setTimeout(function () {
        if (widescreen.matches) {
            style = window.getComputedStyle(main);
            marginX = style.marginLeft;
            marginX = parseInt(marginX);
            console.log("resize: " + marginX);
        }
        styleElements(galleryStacks);
    }, 200);
}, true);

function styleElements(elements) {
    // get window width and height
    winWidth = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
    winHeight = window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight;
    clientWidth = gallery.offsetWidth;

    for (var i = 0; i < elements.length; i++) {
        let thisStack = elements[i];
        let thisLabel = thisStack.querySelector('.label');
        let covers = thisStack.querySelector('.covers');

        // hide labels
        if (thisLabel) {
            thisLabel.classList.add('hidden');
        }

        // add some randomness 
        if (covers.children.length <= 5) {
            factor = (covers.children.length + 1) * 24;
        } else {
            factor = (covers.children.length * 0.8) * 20;
        }

        for (var c = 0; c < covers.children.length; c++) {
            var thisCover = covers.children[c];

            // only run on setup
            if (actions == 0) {
                // put covers into their own divs
                let parent = covers;
                let cover = document.createElement('div');
                cover.classList.add('cover');
                parent.replaceChild(cover, thisCover);
                cover.appendChild(thisCover);
                thisCover = cover;
            }

            // position variables
            columns = Math.floor(clientWidth / 400);
            if (columns == 0) {
                columns = 1;
            }
            if (columns > 5) {
                columns = 5;
            }
            if (mobile.matches) {
                yInterval = xInterval * 0.8;
                xInterval = (winWidth - (margin * 2)) / columns;
            } else if (landscape.matches) {
                yInterval = xInterval * 0.5;
                xInterval = (winWidth - (margin * 2)) / columns;
            } else if (tablet.matches) {
                yInterval = xInterval * 0.8;
                xInterval = (winWidth - (margin * 2)) / columns;
            } else if (widescreen.matches) {
                yInterval = xInterval * 1.5;
                xInterval = (clientWidth - (margin * 4)) / columns;
            } else {
                yInterval = xInterval * 1.2;
                xInterval = (winWidth - (margin * 8)) / columns;
            }

            // get position
            x = Math.ceil(i % columns) * xInterval + (margin * 4);
            y = (Math.ceil((i + 1) / columns) * yInterval) - yInterval - margin;
            if (landscape.matches) {
                x = (winWidth / 2) - (margin * 2.5);
            }

            // set variation
            xVariation = getRandomNumber(-variation - (covers.children.length / 2), variation + (covers.children.length / 2), margin);
            yVariation = getRandomNumber(-variation - (covers.children.length / 2), variation + (covers.children.length / 2), margin);

            // set position
            thisCover.style.left = x + xVariation + (margin * 2) + "px";
            if (header) {
                thisCover.style.top = y + yVariation - header.offsetHeight + (margin * 6) + "px";
            } else {
                thisCover.style.top = y + yVariation + (margin * 6) + "px";
            }

            // scale by width or height 
            var winFactor;
            var coverFactor = covers.children.length * 0.005;
            var maxSize;
            var width, height;
            var thisVideo;
            if (mobile.matches) {
                winFactor = 2.25;
            } else if (landscape.matches) {
                winFactor = 1.75;
            } else if (tablet.matches) {
                winFactor = 1.5;
            } else if (widescreen.matches) {
                winFactor = 0.5;
            } else {
                winFactor = 1;
            }
            if (thisCover.querySelector('img')) {
                width = thisCover.querySelector('img').clientWidth;
                height = thisCover.querySelector('img').clientHeight;
            } else if (thisCover.querySelector('video')) {
                thisVideo = thisCover.querySelector('video');
                width = thisVideo.videoWidth;
                height = thisVideo.videoHeight;
            }
            if (width > height) {
                maxSize = 0.14;
                thisCover.style.width = (winWidth * winFactor) * (maxSize - coverFactor) + "px";
                thisCover.style.height = "auto";
            } else if (height > width) {
                maxSize = 0.12;
                thisCover.style.height = (winWidth * winFactor) * (maxSize - coverFactor) + "px";
                thisCover.style.width = "auto";
            } else if (width == height) {
                maxSize = 0.12;
                thisCover.style.width = (winWidth * winFactor) * (maxSize - coverFactor) + "px";
                thisCover.style.height = (winWidth * winFactor) * (maxSize - coverFactor) + "px";
            }

        }
    }
    // set height to position footer properly
    gallery.style.height = (Math.ceil(galleryStacks.length / columns) * yInterval) + "px";
}

// mouse interactions
let addPerspective = document.getElementsByClassName('perspective');
var mousePageX, mousePageY, mouseClientY, scrollTop;

if (tablet.matches) {
    document.addEventListener('scrollend', (event) => {
        // setTimeout(() => {
            scrollTop = document.documentElement.scrollTop;
            positionElements((winWidth / 2) - margin, winHeight / 2, winHeight / 2, scrollTop)
        // }, "325")
    })
} else {
    document.addEventListener('mousemove', (event) => {
        mousePageX = event.pageX;
        mousePageY = event.pageY;
        mouseClientY = event.clientY;
        setTimeout(() => {
            scrollTop = document.documentElement.scrollTop;
            positionElements(mousePageX, mousePageY, mouseClientY, scrollTop);
        }, "10")
    })
    document.addEventListener('scroll', (event) => {
        setTimeout(() => {
            scrollTop = document.documentElement;
            positionElements(mousePageX, mousePageY, mouseClientY);
        }, "750")
    })
}

function positionElements(mousePageX, mousePageY, mouseClientY) {
    // get gallery stacks
    if (gallery) {
        for (var i = 0; i < galleryStacks.length; i++) {
            var thisStack = galleryStacks[i];
            var thisLabel = thisStack.querySelector('.label');
            var stackCovers = thisStack.getElementsByClassName('cover');

            // change cover size based on mouse position
            for (var c = 0; c < stackCovers.length; c++) {
                var thisCover = stackCovers[c];
                var dist = calculateDistance(thisCover, mousePageX, mouseClientY);
                if (dist.middle < threshold) {
                    thisCover.style.transform = 'translate(-50%, -50%) scale(' + (1 + (threshold - (dist.middle)) / (threshold / 2)) + ')';
                } else {
                    thisCover.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            }

            // gallery view 
            // add perspective based on mouse position
            var perspective = getPerspective(mousePageX, mouseClientY, 12);
            gallery.querySelector('.container').style.transform = "rotateX(" + perspective[1] + "deg) rotateY(" + perspective[0] + "deg)";

            thisLabel.classList.add('hidden');
            if (gallery.matches(':hover')) {
                thisLabel.classList.remove('display-none');
                var dist = calculateDistance(gallery, mousePageX, mouseClientY);
                thisLabel.style.transform = "translate(" + (mousePageX - marginX - 144 - (thisLabel.offsetWidth / 2)) + "px , " + (dist.top + (margin * 1.2)) + "px)";
                if (thisStack.matches(':hover')) {
                    thisLabel.classList.remove('hidden');
                }
            }
            setTimeout(function () {
                $("div[class*='label hidden']").addClass('display-none');
            }, 750);
        }
    }
}

// utility functions
function getRandomNumber(min, max, margin) {
    return Math.floor((Math.random() * (max - min - margin)) + min);
}
function calculateDistance(elem, X, Y) {
    const rect = elem.getBoundingClientRect();
    return {
        middle: Math.floor(Math.sqrt(Math.pow(X - (rect.left + (rect.width / 2)), 2) + Math.pow(Y - (rect.top + (rect.height / 2)), 2))),
        top: Math.floor(Math.sqrt(Math.pow(Y - (rect.top), 2)))
    }
}
function getPerspective(X, Y, maxRotation) {
    var pos = [X / winWidth, Y / winHeight];
    for (var j = 0; j < pos.length; j++) {
        if (pos[j] < 0) {
            pos[j] = 0;
        }
        if (pos[j] > 1) {
            pos[j] = 1;
        }
    }
    pos[0] = Math.round(((pos[0] * 2) - 1) * maxRotation);
    pos[1] = Math.round(((pos[1] * -2) + 1) * maxRotation);
    return pos;
}