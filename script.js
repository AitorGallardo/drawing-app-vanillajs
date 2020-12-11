import Canvas from './canvas.js'

const canvas = document.querySelector("canvas");

const stroke_sizes_buttons = document.querySelectorAll('.stroke-size-selectors > button')
const color_buttons = document.querySelectorAll('.grid-color > *')
const clear_button = document.querySelector('#clear')


const canvas_buttons = {stroke_sizes_buttons,color_buttons, clear_button}
const _Canvas = new Canvas(canvas, canvas_buttons);


color_buttons.forEach((color_button)=>{
    color_button.addEventListener('click',()=>{
        removeSelectedClass(color_buttons);
        color_button.classList.add('selected-button')
        _Canvas.pickColor(color_button.id)
    })
})

stroke_sizes_buttons.forEach((stroke_size_button)=>{
    const size = parseInt(stroke_size_button.id.split('-')[1]);
    stroke_size_button.addEventListener('click',()=>{
        removeSelectedClass(stroke_sizes_buttons);
        stroke_size_button.classList.add('selected-button')
        _Canvas.size = size;
    })
})

clear_button.addEventListener('click',()=>{
    _Canvas.clear();
})

function removeSelectedClass(collection){
    collection.forEach((ea)=>{
        ea.classList.remove('selected-button');
    })
}
