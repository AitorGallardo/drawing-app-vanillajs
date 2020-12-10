// if jumps between 'mousemove' events are bigger than 
// the stablished size, than the printed line stands out and its circles are shown

function calcAndDrawNeededCircles(x,y,x1,y1,size,ctx){

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
            drawCircle(newX,y1,size,ctx)
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
            drawCircle(x1,newY,size,ctx)
            newY = incrementY(newY)
        }
    }else{
        drawCircle(x1,y1,size,ctx)
    }
}

function drawLine(x0, y0, x1, y1, size,ctx) {
    ctx.beginPath();
    ctx.lineWidth = size*2;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function drawCircle(x,y,size,ctx) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.stroke();
}

function pickColor(color,ctx) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function pickStrokeSize(sz){
    size = sz;
}

function clear(canvas,ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export {
    calcAndDrawNeededCircles,    
    drawLine,    
    drawCircle,    
    pickColor,    
    clear,    
    pickStrokeSize       
}