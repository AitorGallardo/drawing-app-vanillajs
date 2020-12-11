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
    })
    this.canvas.addEventListener('mouseup', (e) => {
        this.mousedown = false;
    })

    this.canvas.addEventListener('mouseout', (e) => {
        this.mousedown = false;
    })
    let counter = 0;
    this.canvas.addEventListener('mousemove', (e) => {
        if (this.mousedown) {
            const x1 = e.offsetX;
            const y1 = e.offsetY;

            //using counter var 2 debug
            // if(counter<10){
            //     Utils.drawCompoundLine(this.x, this.y, x1, y1, this.size,this.ctx)
            // }else{
            //     //alert()
            // }
            Utils.drawCompoundLine(this.x, this.y, x1, y1, this.size,this.ctx,counter)
            counter++;
            this.x = x1;
            this.y = y1;
        }
    })
}


