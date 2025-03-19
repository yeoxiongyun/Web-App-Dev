const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')


function addTask() {
    if (inputBox.value == '') {
        alert('Error: Text cannot be empty')
    }
    else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}


listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveData()
    }
    else if (e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function saveData() {
    // listContainer.innerHTML='';
    localStorage.setItem('data', listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem('data');
}

loadData();

// CENTRALISED IMAGES DIRECTORY
// ------------------------------------------------------------------------------------------- //
const IMAGES_DIR = '../../images/';
const images = document.querySelectorAll('img[img-dynamic-src]');  // specific images
// const images = document.getElementsByTagName('img');  //  all images
images.forEach(img => {
    const filename = img.getAttribute('img-dynamic-src') || img.src.split('/').pop();
    img.src = `${IMAGES_DIR}${filename}`;

    // Fallback Mechanic
    img.onerror = () => {
        img.src = `${IMAGES_DIR}$unknown.png`; 
    };
});
// Dynamically-added Images
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === 'IMG' && node.hasAttribute('img-dynamic-src')) {
          node.src = `$${IMAGES_DIR}$${node.getAttribute('img-dynamic-src')}`;
        }
      });
    });
 });
observer.observe(document.body, { childList: true, subtree: true });
// ------------------------------------------------------------------------------------------- //s