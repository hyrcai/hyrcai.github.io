/*-----------------------------------------------*/
//setup 🟩
// get elements
let home = document.getElementsByClassName('home');
home = home[0];
let cursor = document.getElementById('cursor');
let projects = document.getElementsByClassName('project');
//let covers = document.getElementsByClassName('cover');
let labels = document.getElementsByClassName('label');
let tags = document.getElementsByTagName('button');
let nav = document.getElementsByTagName('nav');
nav = nav[0];
let header = document.getElementsByTagName('header');
let buttons = document.getElementsByTagName('button');
header = header[0];
// get window width and height
var winWidth = window.innerWidth || document.documentElement.clientWidth || 
    document.body.clientWidth;
var winHeight = window.innerHeight || document.documentElement.clientHeight|| 
    document.body.clientHeight;
// load a random message in the footer
let messages = document.getElementById('messages').getElementsByTagName('p');
var show = getRandomNumber(0, messages.length, 0);
messages[show].style.display = "inline";
// add type and medium attributes to projects
for (var i = 0; i < projects.length; i++) {
    var thisProject = projects[i];
    let thisLabel = thisProject.querySelector('.label');
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
    thisProject.setAttribute("type", types);
    thisProject.setAttribute("medium", mediums);
}
//check for safari

/*-----------------------------------------------*/
//style
// set variables for styling 🟩
var margin = 48;
var offsetX = margin;
var offsetY = margin;
if (header) {
    offsetY += header.offsetHeight;
}
var variation = 80;
var threshold = 400;
var rows, columns, x, y, xInterval, yInterval, xVariation, yVariation;
var factor;

// style covers based on active view 🟩
styleVisibleProjects();
document.addEventListener('click', (event) => {
    styleVisibleProjects();
})
function styleVisibleProjects() {
    var visibleProjects;
    if (home && home.classList.contains('list')) {
        visibleProjects = document.querySelectorAll('.project.spotlight:not(.hidden)');
        styleList(visibleProjects);
    }
    else if (home && home.classList.contains('gallery')) {
        visibleProjects = document.querySelectorAll('.project:not(.hidden)');
        styleGallery(visibleProjects);
    }
}
function styleList(visibleProjects) {
    for (var i = 0; i < visibleProjects.length; i++) {
        let thisProject = visibleProjects[i];
        let perspective = thisProject.querySelector('.perspective');
        let thisLabel = thisProject.querySelector('.label');
        let covers = thisProject.getElementsByClassName('cover');

        //  position perspective divs correctly 🟩
        perspective.style.transform = "rotateX(0deg) rotateY(0deg)";

        // show labels 🟩
        thisLabel.classList.add('no-transition');
        thisLabel.style.opacity = 1;
        thisLabel.style.zIndex = 1;
        thisLabel.offsetHeight;
        thisLabel.classList.remove('no-transition');

        // set cover positions 🟨
        // set up variables
        var pWidth = perspective.clientWidth;
        var pHeight = perspective.clientHeight;
        x = pWidth / 2;
        y = pHeight / 2;

        for (var c = 0; c < covers.length; c++) {
            let thisCover = covers[c];

            // add some randomness
            factor = 0.5;
            xVariation = getRandomNumber(-variation * (covers.length * factor), variation * (covers.length * factor), 0);
            yVariation = getRandomNumber(-variation * (covers.length * factor), variation * (covers.length * factor), 0);
            // set
            thisCover.style.left = x + xVariation  + "px";
            thisCover.style.top = y + yVariation + "px";

            // scale by width or height 🟨
            var width = thisCover.clientWidth;
            var height = thisCover.clientHeight;
            var factor = covers.length * 0.01;
            if (width > height) {
                thisCover.style.width = winWidth * (0.2 - factor) + "px";
            }
            if (height > width) {
                thisCover.firstElementChild.style.height = winWidth * (0.2 - factor) + "px";
                thisCover.firstElementChild.style.width = "auto";
            }
            if (width == height) {
                thisCover.style.width = winWidth * (0.15 - factor) + "px";
            }
        }
    }
    // set height to position footer properly 🟩
    home.style.height = "";
}
function styleGallery(visibleProjects) {
    for (var i = 0; i < visibleProjects.length; i++) {
        let thisProject = visibleProjects[i];
        let covers = thisProject.getElementsByClassName('cover');
        let thisLabel = thisProject.querySelector('.label');

        // hide all labels 🟩
        thisLabel.classList.add('no-transition');
        thisLabel.style.opacity = 0;
        thisLabel.offsetHeight;
        thisLabel.classList.remove('no-transition');

        // position variables
        columns = Math.floor(winWidth / 400);
        xInterval = (winWidth - (margin * 6)) / columns;
        yInterval = xInterval * 1.2;

        for (var c = 0; c < covers.length; c++) {
            let thisCover = covers[c];

            // get position
            x = Math.ceil((i + 1) % columns) * xInterval + (margin * 2);
            y = Math.ceil((i + 1) / columns) * yInterval;

            // add some randomness 🟩
            factor = margin;
            xVariation = getRandomNumber(-variation - (covers.length * factor), variation + (covers.length * factor), margin);
            yVariation = getRandomNumber(-variation - (covers.length * factor), variation + (covers.length * factor), margin);

            //set position
            thisCover.style.left = x + xVariation + (margin * 2) + "px";
            thisCover.style.top = y + yVariation - header.offsetHeight + (margin * 10) + "px";

            // scale by width or height 🟩
            var width = thisCover.clientWidth;
            var height = thisCover.clientHeight;
            var factor = covers.length * 0.01;
            if (width > height) {
                thisCover.style.maxWidth = winWidth * (0.14 - factor) + "px";
            }
            if (height > width) {
                thisCover.firstElementChild.style.height = winWidth * (0.14 - factor) + "px";
                thisCover.firstElementChild.style.width = "auto";

//                thisCover.firstElementChild.style.width = "auto";
            }
            if (width == height) {
                thisCover.style.maxWidth = winWidth * (0.12 - factor) + "px";
            }
        }
    }
    // set height to position footer properly  🟩
    home.style.height = y + (margin * 2) + "px";
}

/*-----------------------------------------------*/
//mouse interactions
let addPerspective = document.getElementsByClassName('perspective');
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;

//    //position cursor
//    cursor.style.top = 2 + mouseY + "px";
//    cursor.style.left = 2 + mouseX + "px";
//    console.log(cursor.style.left, mouseX);

    //get projects
    for (var i = 0; i < projects.length; i++) {
        var thisProject = projects[i];
        var thisLabel = thisProject.querySelector('.label');
        var covers = thisProject.getElementsByClassName('cover');

        // change cover size based on mouse position 🟩
        for (var c = 0; c < covers.length; c++) {
            var thisCover = covers[c];
            var dist = calculateDistance(thisCover, mouseX, mouseY);
            if (dist < threshold) {
                thisCover.style.transform = 'translate(-50%, -50%) scale(' + (1 + (threshold - (dist)) / (threshold)) + ')';
            } else {
                thisCover.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }

        /*-------------------------------------*/
        // list view 
        if (home.classList.contains('list')) {
            //add perspective based on mouse position
            for (var p = 0; p < addPerspective.length; p++) {
                var perspective = getPerspective(12);
                addPerspective[p].style.transform = "rotateX(" + perspective[1] + "deg) rotateY(" + perspective[0] + "deg)";
            }
        }

        /*-------------------------------------*/
        // gallery view 
        if (home.classList.contains('gallery')) {
            //add perspective based on mouse position
            var perspective = getPerspective(12);
            home.style.transform = "rotateX(" + perspective[1] + "deg) rotateY(" + perspective[0] + "deg)";
            
            //show label if mouse is over cover
            thisLabel.style.opacity = 0;
            thisLabel.style.left = mouseX - (144) - (thisLabel.offsetWidth / 2) + 'px';
            thisLabel.style.top = mouseY - offsetY + margin + 'px';
            if (thisProject.matches(':hover')) {
                thisLabel.style.opacity = 1;
//                thisLabel.style.zIndex = 1010 + ;
            }
        }
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
//function hide(elem) {
//    //    elem.classList.add('hidden');
//    window.setInterval(elem.classList.toggle('hidden'), 2000);
//}