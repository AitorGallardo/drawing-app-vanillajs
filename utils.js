
function drawLine(x0, y0, x1, y1, size, ctx) {
    ctx.beginPath();
    ctx.lineWidth = size * 2;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
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

/*If mouse is moved fast, there is times in which spans between pos0 and pos1 are bigger
and its needed to create more circles on the line path*/

function calcAndDrawNeededCircles(x, y, x1, y1, size, ctx) {

    const xdif = x1 - x
    const ydif = y1 - y
    const abs_xdif = Math.abs(xdif)
    const abs_ydif = Math.abs(ydif)
    const circleDiameter = size * 2;

    const x0x1_span_too_big = abs_xdif > circleDiameter
    const y0y1_span_too_big = abs_ydif > circleDiameter

    if (x0x1_span_too_big || y0y1_span_too_big) {
        const nCirclesX = Math.round(abs_xdif / circleDiameter)
        const nCirclesY = Math.round(abs_ydif / circleDiameter) //can be negatives?

        const nCircles = nCirclesX>nCirclesY? nCirclesX: nCirclesY;

        const getTypeOfIncrementX = () => {
            if (xdif > 0) return (newPosition) => (newPosition + circleDiameter)
            if (xdif < 0) return (newPosition) => (newPosition - circleDiameter)
            return (newPosition) => newPosition;
        }
        const getTypeOfIncrementY = () => {
            if (ydif > 0) return (newPosition) => (newPosition + circleDiameter)
            if (ydif < 0) return (newPosition) => (newPosition - circleDiameter)
            return (newPosition) => newPosition;
        }

        const incrementX = getTypeOfIncrementX()
        const incrementY = getTypeOfIncrementY()

        let newX = x
        let newY = y

        for (let i = 0; i < nCircles; i++) {
            drawCircle(newX, newY, size, ctx)

            newX = incrementX(newX)

            newY = incrementY(newY)
        }

    } else {
        drawCircle(x1, y1, size, ctx)
    }
}

export {
    drawLine,
    drawCircle,
    pickColor,
    clear,
    calcAndDrawNeededCircles
}