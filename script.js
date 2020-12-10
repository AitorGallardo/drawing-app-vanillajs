import Canvas from './canvas.js'

const canvas = document.querySelector("canvas");

const stroke_sizes_buttons = document.querySelectorAll('.stroke-size-selectors > button')
const colors_buttons = document.querySelectorAll('.grid-color > *')
const clear_button = document.querySelector('#clear')


const canvas_buttons = {stroke_sizes_buttons,colors_buttons, clear_button}
const _Canvas = new Canvas(canvas, canvas_buttons);


colors_buttons.forEach((color)=>{
    color.addEventListener('click',()=>{
        _Canvas.pickColor(color.id)
    })
})

stroke_sizes_buttons.forEach((stroke_size)=>{
    const size = parseInt(stroke_size.id.split('-')[1]);
    stroke_size.addEventListener('click',()=>{
        _Canvas.size = size;
    })
})

clear_button.addEventListener('click',()=>{
    _Canvas.clear();
})
