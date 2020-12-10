import * as Utils from './utils.js'

export default function Canvas(canvas, buttons = {}) {

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");


    this.x = 0;
    this.y = 0;
    this.size = 1;
    this.mousedown = false;

    this.pickColor = (color) => Utils.pickColor(color,this.ctx);
    this.clear = () => Utils.clear(this.canvas,this.ctx);

    this.canvas.addEventListener('mousedown', (e) => {
        this.x = e.offsetX;
        this.y = e.offsetY;

        this.mousedown = true;
        console.log(`mouseDOWN`,);
    })
    this.canvas.addEventListener('mouseup', (e) => {
        this.mousedown = false;
        console.log(`mouseUP`,);
    })

    this.canvas.addEventListener('mouseout', (e) => {
        this.mousedown = false;
        console.log(`mouseOUT`,);
    })

    this.canvas.addEventListener('mousemove', (e) => {
        console.log(`mouseMOVE`,);

        if (this.mousedown) {
            const x1 = e.offsetX;
            const y1 = e.offsetY;
            //console.log(`x,y,x1,y1`,x,y,x1,y1);
            //calcAndDrawNeededCircles(x,y,x1,y1,size,ctx)
            Utils.drawCircle(x1, y1, this.size, this.ctx)
            Utils.drawLine(this.x, this.y, x1, y1, this.size,this. ctx)
            this.x = x1;
            this.y = y1;
        }
    })
}


