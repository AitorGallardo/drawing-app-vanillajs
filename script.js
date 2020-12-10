const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const stroke_sizes_buttons = document.querySelectorAll('.stroke-size-selectors > button')
const colors_buttons = document.querySelectorAll('.grid-color > *')
const clear_button = document.querySelector('#clear')

let x = 0;
let y = 0;
let size = 1;
let mousedown = false;
let mouseenter = false;




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
        //calcAndDrawNeededCircles(x,y,x1,y1)
        drawCircle(x1,y1,size)
        drawLine(x, y, x1, y1,size)
        x = x1;
        y = y1;
    }
})

// if jumps between 'mousemove' events are bigger than 
// the stablished size, than the printed line stands out and its circles are shown

function calcAndDrawNeededCircles(x,y,x1,y1){

    const xdif = x1-x
    const ydif = y1-y
    const abs_xdif = Math.abs(xdif)
    const abs_ydif = Math.abs(ydif)
    const circleDiameter = size*2;

    /* If the diff between position0-position1 is bigger than the printed circle,
        then more circles has to be done */
    if(abs_xdif > circleDiameter){

        const nCircles = Math.round(abs_xdif/circleDiameter)
        console.log(`NCIRCLES`,nCircles);
        
        const getTypeOfIncrementX = ()=>{
            if(xdif>0) return (newPosition)=>(newPosition+=circleDiameter)
            if(xdif<0) return (newPosition)=>(newPosition-=circleDiameter)
        }

        const incrementX = getTypeOfIncrementX()
        let newX=x1
        for(let i=0; i < nCircles; i++){
            drawCircle(newX,y1,size)
            newX = incrementX(newX)
        }
    } else if(abs_ydif > circleDiameter){

        const nCircles = Math.round(abs_ydif/circleDiameter)

        const getTypeOfIncrementY = ()=>{
            if(ydif>0) return (newPosition)=>(newPosition+=circleDiameter)
            if(ydif<0) return (newPosition)=>(newPosition-=circleDiameter)
        }

        const incrementY = getTypeOfIncrementY()
        let newY=y1
        for(let i=0; i < nCircles; i++){
            drawCircle(x1,newY,size)
            newY = incrementY(newY)
        }
    }else{
        drawCircle(x1,y1,size)
    }
}

colors_buttons.forEach((color)=>{
    color.addEventListener('click',()=>{
        pickColor(color.id)
    })
})

stroke_sizes_buttons.forEach((stroke_size)=>{
    const size = parseInt(stroke_size.id.split('-')[1]);
    stroke_size.addEventListener('click',()=>{
        pickStrokeSize(size)
    })
})

clear_button.addEventListener('click',()=>{
    clear();
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

function pickColor(color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pickStrokeSize(sz){
    size = sz;
}