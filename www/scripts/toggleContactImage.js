/**
 * Profile Section Toggle Script
 *
 * This script handles the visibility of different profile sections on the page.
 * It listens for click events on navigation buttons and displays the corresponding profile section.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get all profile section buttons
    const buttons = document.querySelectorAll('.grid-object-m a');

    // Define the profile sections and corresponding images
    const sections = {
        Goncalo: document.querySelector('#Goncalo'),
        Andre: document.querySelector('#Andre'),
    };

    const sectionsimg = {
        Goncalo: document.getElementById('goncaloimg'),
        Andre: document.getElementById('andreimg'),
    };
    
    /**
     * Hides all profile sections and removes active image styling.
     */
    function hideSections() {
        for (let section in sections) {
            sections[section].style.opacity = '0';
            sections[section].style.display = 'none';
            sectionsimg[section].classList.remove('profile-image');
        }
    }

    /**
     * Displays the selected profile section and applies active styling to the corresponding image.
     * 
     * @param {string} section - The section ID to display.
     */
    function showSection(section) {
        hideSections();
        sections[section].style.display = 'block';
        sectionsimg[section].classList.add('profile-image');

        // Add slight delay to smoothly transition opacity
        setTimeout(() => {
            sections[section].style.opacity = '1';
        }, 10);
    }

    /**
     * Event listener for navigation buttons.
     * 
     * - Prevents default anchor behavior.
     * - Retrieves target section from href attribute and displays it.
     */
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('a').getAttribute('href').substring(1); 
            showSection(target);
        });
    });

    // Hide all sections on page load
    hideSections();
});
