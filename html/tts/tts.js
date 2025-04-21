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
// ------------------------------------------------------------------------------------------- //


let speech = new SpeechSynthesisUtterance();
let voices = []
let voiceSelect = document.querySelector('select');

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; // Default voice

    // Populate the voice options
    voices.forEach(voice => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

voiceSelect.addEventListener('change', () => {
    speech.voice = voices.find(voice => {
        return voice.name === voiceSelect.selectedOptions[0].getAttribute('data-name');
    });
});

document.querySelector('button').addEventListener('click', () => {
    speech.text = document.querySelector('textarea').value;
    window.speechSynthesis.speak(speech);
})