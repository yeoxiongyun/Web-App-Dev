// Call the function to load dynamic images
import { loadDynamicImages } from '../../misc/img-dynamic-src.js';
const IMAGES_DIR = '../../images/';
loadDynamicImages(IMAGES_DIR);
// –––––––––––––––––––––––––––––––––––––––––––––––––– //



const notesContainer = document.querySelector('.notes-container');
const createButton = document.querySelector('.button');
let notes = document.querySelectorAll('.input-box');

createButton.addEventListener('click', ()=> {
  let inputBox = document.createElement('p');
  let img = document.createElement('img');
  inputBox.className = 'input-box';
  inputBox.setAttribute('contenteditable', 'true');
  // img.src = 'trash.png';
  img.setAttribute('img-dynamic-src', 'trash.png');
  notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG'){
      e.target.parentElement.remove();
      saveData();
  }
  else if (e.target.tagName === 'P'){
      notes = document.querySelectorAll('.input-box');
      notes.forEach(nt => {
        nt.onkeyup = function() {
          saveData();
        }
      })
  }
}, false);

function saveData() {
  localStorage.setItem('notes', notesContainer.innerHTML);
}

function loadData() {
  // localStorage.removeItem('notes');  // Deletes the 'notes' item
  notesContainer.innerHTML = localStorage.getItem('notes');
}

loadData();

document.addEventListener('keydown', event=> {
  if (event.key === 'Enter') {
    document.execCommand('insertLineBreak');
    event.preventDefault();
  }
})