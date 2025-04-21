// Call the function to load dynamic images
import { loadDynamicImages } from '../../misc/img-dynamic-src.js';
const IMAGES_DIR = '../../images/';
loadDynamicImages(IMAGES_DIR);

// Get the last modified date of the document
const lastModified = new Date(document.lastModified);
const month = lastModified.toLocaleString('default', { month: 'long' });
const year = lastModified.getFullYear();
document.getElementById('lastUpdated').textContent = `${month} ${year}`;

document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { name: 'weather', url: '../weather/weather.html', image: `${IMAGES_DIR}cloudy.png` },
        { name: 'todo', url: '../todo/todo.html', image: `${IMAGES_DIR}todo.png` },
        { name: 'quiz', url: '../quiz/quiz.html', image: `${IMAGES_DIR}unknown.png` },
        { name: 'password', url: '../password/password.html', image: `${IMAGES_DIR}password.png` },
        { name: 'notes', url: '../notes/notes.html', image: `${IMAGES_DIR}notes.png` },
        { name: 'qr-code', url: '../qr-code/qr-code.html', image: `${IMAGES_DIR}qr-code.png` },
        { name: 'text-to-speech', url: '../tts/tts.html', image: `${IMAGES_DIR}text-to-speech.png` },
        { name: 'cv', url: '../CV_web_app.html', image: `${IMAGES_DIR}fog.png` }
    ];

    // Carousell
    const carouselTrack = document.getElementById('carouselTrack');
    const totalProjectsSpan = document.querySelector('.total-projects');
    const previewIframe = document.getElementById('mainPreview');
    const previewContainer = document.getElementById('previewContainer');

    // Generate project icons
    projects.forEach((project, index) => {
        const projectIcon = document.createElement('div');
        projectIcon.className = 'project-icon' + (index === 0 ? ' focused' : '');
        projectIcon.innerHTML = `
            <img src='${project.image}' alt='${project.name} project preview'>
        `;
        projectIcon.dataset.url = project.url;
        projectIcon.dataset.index = index + 1;
        carouselTrack.appendChild(projectIcon);
    });
    // Update total projects count and initialize first project preview
    totalProjectsSpan.textContent = projects.length;

    if (projects.length > 0) {
        previewIframe.src = projects[0].url;
    }
    // Click handler for project icons
    carouselTrack.addEventListener('click', (e) => {
        const projectIcon = e.target.closest('.project-icon');
        if (projectIcon) {
            focusProject(projectIcon);
        }
    });

    // Double-click handler for project icons
    carouselTrack.addEventListener('dblclick', (e) => {
        const projectIcon = e.target.closest('.project-icon');
        if (projectIcon) {
            window.location.href = projectIcon.dataset.url;
        }
    });

    // Hover handler for project icons
    carouselTrack.addEventListener('mouseover', (e) => {
        const projectIcon = e.target.closest('.project-icon');
        if (projectIcon && !projectIcon.classList.contains('focused')) {
            projectIcon.classList.add('hovered');
        }
    });
    carouselTrack.addEventListener('mouseout', (e) => {
        const projectIcon = e.target.closest('.project-icon');
        if (projectIcon) {
            projectIcon.classList.remove('hovered');
        }
    });

    // Double-click handler for project preview
    previewContainer.addEventListener('dblclick', (e) => {
        const preview = e.target.closest('.project-preview-container');
        if (preview) {
            window.location.href = previewIframe.src;
        }
    });

    function focusProject(projectIcon) {
        // Remove focus from all icons
        document.querySelectorAll('.project-icon').forEach(icon => {
            icon.classList.remove('focused', 'hovered');
        });
        
        // Add focus to clicked icon
        projectIcon.classList.add('focused');
        
        // Update preview iframe & index display
        previewIframe.src = projectIcon.dataset.url;
        document.querySelector('.current-index').textContent = projectIcon.dataset.index;
        
        // Smooth scroll to center the focused icon
        const iconLeft = projectIcon.offsetLeft;
        const iconWidth = projectIcon.offsetWidth;
        const containerWidth = carouselTrack.offsetWidth;
        
        carouselTrack.scrollTo({
            left: iconLeft - (containerWidth/2 - iconWidth/2),
            behavior: 'smooth'
        });
    }
});