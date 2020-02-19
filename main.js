elements = [];
let size = window.innerHeight/3;
let ctx;

window.addEventListener("load", function(event) {
    let canvas = document.createElement("CANVAS");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    canvas.setAttribute("id", "rec");

    let body = document.getElementById("body").appendChild(canvas);
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        let x = getInt((window.innerWidth-400));
        let y = getInt((window.innerHeight-400));
        elements.push({
            colour: getColor(),
            width: size,
            height: size,
            top: y,
            left: x
        });
        draw();
    }

    canvas.addEventListener('dblclick', function (e) {
        window.setInterval(function(){
            for (let i = 0; i < elements.length; i++) {
                elements[i].left = getInt(window.innerWidth - elements[i].width);
                elements[i].top = getInt(window.innerHeight - elements[i].height);
            }
            draw();
        }, 2000);
    });

    canvas.addEventListener('click', function(event) {
        let x = event.pageX , y = event.pageY;
        for(let i = 0; i < elements.length; i++) {
            if (y > elements[i].top && y < elements[i].top + elements[i].height
                && x > elements[i].left && x < elements[i].left + elements[i].width) {
                setElement(i);
            }
        }

    }, false);
});

function getInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getColor() {
    let color = '#', letters = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

function setElement(i) {
    let s = elements[i].height/4;
    elements.splice(i,1);
    for(let i = 0; i < 4; i++) {
        elements.push({
            colour: getColor(),
            width: s,
            height: s,
            top: getInt((window.innerHeight-s)),
            left: getInt((window.innerWidth-s))
        })
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < elements.length; i++) {
        ctx.fillStyle = elements[i].colour;
        ctx.fillRect(elements[i].left, elements[i].top, elements[i].width, elements[i].height);
    }
}