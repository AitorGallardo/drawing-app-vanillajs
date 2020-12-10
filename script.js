const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let x = 0;
let y = 0;
const size = 5;
let mousedown = false;

canvas.addEventListener('mousedown', (e) => {
    x = e.offsetX;
    y = e.offsetY;

    mousedown = true;
})
canvas.addEventListener('mouseup', (e) => {
    mousedown = false;
})



canvas.addEventListener('mousemove', (e) => {

    if (mousedown) {
        const x1 = e.offsetX;
        const y1 = e.offsetY;

        drawCircle(x,y,size)
        drawLine(x, y, x1, y1,size)
        x = x1;
        y = y1;
    }
})


function drawLine(x0, y0, x1, y1, size) {
    ctx.beginPath();
    ctx.lineWidth = size*2;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function drawCircle(x,y,size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.stroke();
}



function changeColor() {
    ctx.strokeStyle = "#FF0000";
}