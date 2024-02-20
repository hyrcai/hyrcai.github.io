let cursor = document.getElementById('cursor');

document.addEventListener('mouseover', function (event) {
    const target = event.target;
    const cursorType = window.getComputedStyle(target)["cursor"];
    if (cursorType == 'pointer') {
        cursor.classList.remove('link-in');
        cursor.classList.remove('link-out');
        cursor.classList.remove('of-interest');
        if (target.classList.contains('link-in')) {
            cursor.classList.add('link-in');
        } else if (target.classList.contains('link-out')) {
            cursor.classList.add('link-out');
        } else if (target.classList.contains('of-interest')) {
            cursor.classList.add('of-interest');
        }
    } else {
        cursor.classList.remove('link-in');
        cursor.classList.remove('link-out');
        cursor.classList.remove('of-interest');
    }
}, false);

// mouse interactions
var mousePageX, mousePageY, mouseClientY;

document.addEventListener('mousemove', (event) => {
    mousePageX = event.pageX;
    mousePageY = event.pageY;
    mouseClientY = event.clientY;
    setTimeout(() => {
        cursor.style.transform = "translate(" + mousePageX + "px , " + mouseClientY + "px)";
    }, "10")
})