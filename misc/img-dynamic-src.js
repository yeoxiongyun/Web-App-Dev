// CENTRALISED IMAGES DIRECTORY
// ------------------------------------------------------------------------------------------- //
export function loadDynamicImages(images_dir) {
    const images = document.querySelectorAll('img[img-dynamic-src]');  // specific images
    images.forEach(img => {
        const filename = img.getAttribute('img-dynamic-src') || img.src.split('/').pop();
        img.src = `${images_dir}${filename}`;
        
        console.log(filename);
        // Fallback Mechanic
        img.onerror = () => {
            img.src = `${images_dir}$unknown.png`; 
        };
    });

    // Dynamically-added Images
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'IMG' && node.hasAttribute('img-dynamic-src')) {
                    node.src = `${images_dir}${node.getAttribute('img-dynamic-src')}`;
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
// ------------------------------------------------------------------------------------------- //