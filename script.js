const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const stroke_sizes = document.querySelectorAll('.stroke-size-selectors > button')
const colors = document.querySelectorAll('.grid-color > *')

let x = 0;
let y = 0;
let size = 3;
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

console.log(`colors`,colors);

colors.forEach((color)=>{
    color.addEventListener('click',()=>{
        pickColor(color.id)
    })
})

stroke_sizes.forEach((stroke_size)=>{
    const size = parseInt(stroke_size.id.split('-')[1]);
    console.log(`size`,size);
    stroke_size.addEventListener('click',()=>{
        pickStrokeSize(size)
    })
})

// colors.addEventListener('click',()=>{
//     console.log(`clickingcolors`,);
// })


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



function pickColor(color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function pickStrokeSize(sz){
    console.log(`picked`,size);
    console.log(`typeof`,typeof size);
    size = sz;
}