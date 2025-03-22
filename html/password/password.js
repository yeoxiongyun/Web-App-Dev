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

function copyPassword() {
    passwordBox.select();
    document.execCommand('copy');
}

function checkCheckbox() {
    document.getElementsByClassName('checkbox').checked = true;
}

function updateLength(input) {
    const length = input.value;  // update the length variable
    document.getElementById('length-value').textContent = length;
}