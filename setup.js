import * as Utils from './utils.js'

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const stroke_sizes_buttons = document.querySelectorAll('.stroke-size-selectors > button')
const colors_buttons = document.querySelectorAll('.grid-color > *')
const clear_button = document.querySelector('#clear')

let x = 0;
let y = 0;
let size = 1;
let mousedown = false;


console.log(`utils`,Utils);


canvas.addEventListener('mousedown', (e) => {
    x = e.offsetX;
    y = e.offsetY;

    mousedown = true;
    console.log(`mouseDOWN`,);
})
canvas.addEventListener('mouseup', (e) => {
    mousedown = false;
    console.log(`mouseUP`,);
})

canvas.addEventListener('mouseout', (e) => {
    mousedown = false;
    console.log(`mouseOUT`,);
})

canvas.addEventListener('mousemove', (e) => {
    console.log(`mouseMOVE`,);

    if (mousedown) {
        const x1 = e.offsetX;
        const y1 = e.offsetY;
        //console.log(`x,y,x1,y1`,x,y,x1,y1);
        //calcAndDrawNeededCircles(x,y,x1,y1,size,ctx)
        Utils.drawCircle(x1,y1,size,ctx)
        Utils.drawLine(x, y, x1, y1,size,ctx)
        x = x1;
        y = y1;
    }
})


colors_buttons.forEach((color)=>{
    color.addEventListener('click',()=>{
        Utils.pickColor(color.id,ctx)
    })
})

stroke_sizes_buttons.forEach((stroke_size)=>{
    const size = parseInt(stroke_size.id.split('-')[1]);
    stroke_size.addEventListener('click',()=>{
        Utils.pickStrokeSize(size,ctx)
    })
})

clear_button.addEventListener('click',()=>{
    Utils.clear(canvas,ctx);
})