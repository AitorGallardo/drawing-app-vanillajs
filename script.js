import Canvas from './canvas.js'

const canvasEl = document.querySelector("canvas");

const stroke_sizes_buttons = document.querySelectorAll('.stroke-size-selectors > button')
const color_buttons = document.querySelectorAll('.grid-color > *')
const clear_button = document.querySelector('#clear')


const canvasObj = new Canvas(canvasEl);


color_buttons.forEach((color_button)=>{
    color_button.addEventListener('click',()=>{
        removeSelectedClass(color_buttons);
        color_button.classList.add('selected-button')
        canvasObj.pickColor(color_button.id)
    })
})

stroke_sizes_buttons.forEach((stroke_size_button)=>{
    const size = parseInt(stroke_size_button.id.split('-')[1]);
    stroke_size_button.addEventListener('click',()=>{
        removeSelectedClass(stroke_sizes_buttons);
        stroke_size_button.classList.add('selected-button')
        canvasObj.size = size;
    })
})

clear_button.addEventListener('click',()=>{
    canvasObj.clear();
})

function removeSelectedClass(collection){
    collection.forEach((ea)=>{
        ea.classList.remove('selected-button');
    })
}
