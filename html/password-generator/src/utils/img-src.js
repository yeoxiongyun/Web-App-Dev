// CENTRALISED IMAGES DIRECTORY
// ------------------------------------------------------------------------------------------- //
// import { loadDynamicImages } from './utils/img-src';

export function loadDynamicImages(images_dir) {
    // Select all <img> elements that have the custom attribute 'img-src'
    const images = document.querySelectorAll('img[img-src]');
    
    // Loop through each image and set its `src` attribute dynamically
    images.forEach(img => {
        // Get the filename from the custom attribute or extract it from the existing `src` if not present
        const filename = img.getAttribute('img-src') || img.src.split('/').pop();

        // Set the `src` attribute to the new image path using the provided `images_dir` and filename
        img.src = `${images_dir}/${filename}`;

        // Error handler: If the image fails to load, fall back to a default image
        img.onerror = () => {
            img.src = `${images_dir}/unknown.png`;
        };
    });

    // Set up a MutationObserver to detect dynamically added images in the document
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                // Check if the added node has the custom 'img-src' attribute
                if (node.tagName === 'IMG' && node.hasAttribute('img-src')) {
                    // Dynamically set the `src` attribute for the newly added image
                    node.src = `${images_dir}/${node.getAttribute('img-src')}`;
                }
            });
        });
    });

    // Start observing changes in the document body for added nodes (images)
    observer.observe(document.body, { childList: true, subtree: true });
}

// ------------------------------------------------------------------------------------------- //