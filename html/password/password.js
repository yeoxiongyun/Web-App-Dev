// Call the function to load dynamic images
import { loadDynamicImages } from '../../misc/img-dynamic-src.js';
const IMAGES_DIR = '../../images/';
loadDynamicImages(IMAGES_DIR);

const passwordBox = document.getElementById('password');
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_-+=<>?/[]{}|';

function createPassword() {
    let password = ''
    let allCharacters = '';
    const length = document.getElementById('length-value').textContent;

    // Check which checkboxes are checked and modify the allowed pool accordingly
    
    if (document.getElementById('uppercase').checked) {
        allCharacters += upperCase;  // add uppercase characters to pool
    }
    if (document.getElementById('lowercase').checked) {
        allCharacters += lowerCase;  // add lowercase characters to pool
    }
    if (document.getElementById('numbers').checked) {
        allCharacters += numbers;  // add numbers to pool
    }
    if (document.getElementById('symbols').checked) {
        allCharacters += symbols;  // add symbols to pool
    }
    if (allCharacters === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    while (length > password.length) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }
    passwordBox.value = password;
}

function copyPassword(event) {
    // Find the nearest input element
    var inputBox = event.target.closest('.display, .input-box')?.querySelector('input');
    
    // Modern clipboard API (navigator.clipboard.writeText)
    navigator.clipboard.writeText(inputBox.value).then(function() {
        console.log('Password copied to clipboard');
    }).catch(function(error) {
        console.error('Failed to copy text: ', error);
    });
}

function checkCheckbox() {
    document.getElementsByClassName('checkbox').checked = true;
}

function updateLength(event) {
    const length = event.target.value;  // update the length text
    document.getElementById('length-value').textContent = length;
}

document.getElementById('password').addEventListener('click', copyPassword);
document.getElementById('password-create').addEventListener('click', createPassword);
document.getElementById('password-img').addEventListener('click', copyPassword);
document.getElementById('password-length').addEventListener('input', updateLength);
document.getElementById('uppercase').addEventListener('click', checkCheckbox);
document.getElementById('lowercase').addEventListener('click', checkCheckbox);
document.getElementById('numbers').addEventListener('click', checkCheckbox);
document.getElementById('symbols').addEventListener('click', checkCheckbox);
document.getElementById('password-img2').addEventListener('click', copyPassword);

// document.addEventListener('DOMContentLoaded', () => {

var pass = document.getElementById('custom-password');
var msg = document.getElementById('message');
var str = document.getElementById('strength');

pass.addEventListener('input', () => {
    if (pass.value.length > 0) {
        msg.style.display = 'block';
    }
    else {
        msg.style.display = 'none';
        pass.style.borderColor = '#ccc';
    }

    // Password Strength
    if (pass.value.length > 0 && pass.value.length < 6) {
        str.innerHTML = 'weak';
        pass.style.borderColor = '#ff5925';
        msg.style.color = '#ff5925';
    }
    else if (pass.value.length >= 6 && pass.value.length < 12) {
        str.innerHTML = 'medium';
        pass.style.borderColor = 'yellow';
        msg.style.color = 'yellow';
    }
    else if (pass.value.length >= 12) {
        str.innerHTML = 'strong';
        pass.style.borderColor = '#26d730';
        msg.style.color = '#26d730';
    }
})