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

document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { name: 'weather', url: '../weather/weather.html', image: `${IMAGES_DIR}cloudy.png` },
        { name: 'todo', url: '../todo/todo.html', image: `${IMAGES_DIR}todo.png` },
        { name: 'quiz', url: '../quiz/quiz.html', image: `${IMAGES_DIR}unknown.png` },
        { name: 'weather', url: '../weather/weather.html', image: `${IMAGES_DIR}wind.png` },
        { name: 'cv', url: '../CV_web_app.html', image: `${IMAGES_DIR}humidity.png` },
        { name: 'weather', url: '../weather/weather.html', image: `${IMAGES_DIR}lightning.png` },
        { name: 'cv', url: '../CV_web_app.html', image: `${IMAGES_DIR}search.png` },
        { name: 'weather', url: '../weather/weather.html', image: `${IMAGES_DIR}cloudy.png` },
        { name: 'cv', url: '../CV_web_app.html', image: `${IMAGES_DIR}sunny.png` },
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

    // Update total projects count
    totalProjectsSpan.textContent = projects.length;

    // Initialize first project preview
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

    // Double-click handler for project preview
    previewContainer.addEventListener('dblclick', (e) => {
        const preview = e.target.closest('.project-preview-container');
        if (preview) {
            window.location.href = previewIframe.src;
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

    function focusProject(projectIcon) {
        // Remove focus from all icons
        document.querySelectorAll('.project-icon').forEach(icon => {
            icon.classList.remove('focused', 'hovered');
        });
        
        // Add focus to clicked icon
        projectIcon.classList.add('focused');
        
        // Update preview iframe
        previewIframe.src = projectIcon.dataset.url;
        
        // Update index display
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