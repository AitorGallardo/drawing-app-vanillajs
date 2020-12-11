
function drawLine(x0, y0, x1, y1, size, ctx) {
    ctx.beginPath();
    ctx.lineWidth = size * 2;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function drawLinePath2D(x0, y0, x1, y1, size, ctx) {
    const line = new Path2D();
    ctx.beginPath();
    ctx.lineWidth = size * 2;
    line.moveTo(x0, y0);
    line.lineTo(x1, y1);
    ctx.stroke(line);
    return line;
}

function drawCircle(x, y, size, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.stroke();
}

function pickColor(color, ctx) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/*If mouse has been moved quickly, there is times in which spans between pos0 and pos1 events are too big
the circles in the line stands out, thats why its needed to create more circles on the line path*/
function createLineOnMouseMove(x0, y0, x1, y1, size, ctx) {

    drawLine(x0, y0, x1, y1, size, ctx);

    // if difX is positive it means line direction in x axis is positive
    const difX = (x1 - x0)
    const difY = (y1 - y0)
    const difXABS = Math.abs(x1 - x0)
    const difYABS = Math.abs(y1 - y0)
        
    
    const increment = _getTypeOfIncrement(difX,difY);

    const allPointsInLine = _getAllPointsInLine(x0, y0, x1, y1,difXABS,difYABS,increment)
    
    allPointsInLine.forEach((p)=>{
        drawCircle(p.x,p.y,size,ctx)
    })

}

/*function to create another function that either add 
    or subtract to de inital position depending on the direction of the line;*/ 

function _getTypeOfIncrement(difX,difY){

    const increment = {};

    const getTypeOfIncrementX = () => {
        if (difX > 0) return (inital, increment) => (inital + increment)
        if (difX < 0) return (inital, increment) => (inital - increment)
        return (inital,increment) => inital;
    }
    const getTypeOfIncrementY = () => {
        if (difY > 0) return (inital, increment) => (inital + increment)
        if (difY < 0) return (inital, increment) => (inital - increment)
        return (inital, increment) => inital;
    }

    increment.x = getTypeOfIncrementX();
    increment.y = getTypeOfIncrementY();

    return increment;    
}

/*This loop checks all the posible points between p0-p1 of the line. 
Then the distance between that point and the line is calculated, and if
that distance is shorter than 1px it is assumed that is indeed part of that line.*/
function _getAllPointsInLine(x0, y0, x1, y1,difXABS,difYABS,increment){

    let updatedX = x0;
    let updatedY = y0;  
    const allLinePoints = [];

    for (let ix = 0; ix <= difXABS; ix++) {
        updatedX = increment.x(x0,ix)        
        for (let iy = 0; iy <= difYABS; iy++) {
            updatedY = increment.y(y0,iy);  

            const isPointPartOfTheLine = _getDistanceFromPointToLine(updatedX,x0,x1,updatedY,y0,y1) < 1;

            if (isPointPartOfTheLine) {                
                allLinePoints.push({x:updatedX,y:updatedY})
            }
        }
    }
    return allLinePoints;
}

function _getDistanceFromPointToLine(px, lineX1, lineX2, py, lineY1, lineY2) {
    const difX = lineX2 - lineX1;
    const difY = lineY2 - lineY1;
    const distance = Math.abs(difY * px - difX * py - lineX1 * lineY2 + lineX2 * lineY1) / Math.sqrt(Math.pow(difX, 2) + Math.pow(difY, 2));

    return distance;
}


export {
    drawLine,
    drawLinePath2D,
    drawCircle,
    pickColor,
    clear,
    createLineOnMouseMove
}