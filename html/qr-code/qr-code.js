// Call the function to load dynamic images
import { loadDynamicImages } from '../../misc/img-dynamic-src.js';
const IMAGES_DIR = '../../images/';
loadDynamicImages(IMAGES_DIR);

console.log("qr-code.js is loaded!");


const QR_CODE_API = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';

let imgBox = document.getElementById('imgBox');
let qrImage = document.getElementById('qrImage');
let qrText = document.getElementById('qrText');

export function generateQRCode() {
    qrImage.src = QR_CODE_API + qrText.value;
    imgBox.classList.add('show-img');
}

let btn = document.getElementById('button');
document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('button'); // Ensure button is selected
    btn.addEventListener('click', generateQRCode);
});