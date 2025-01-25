/**
 * Navigation Highlighting Script
 *
 * This script highlights the active navigation link based on the current page URL.
 * It iterates through all navigation links and compares their href attributes with the current pathname.
 * If a match is found, the corresponding link is marked as active, and its SVG icon color is updated.
 */

const currentPage = window.location.pathname;

// Select all navigation links from menu and icons
const navLinks = document.querySelectorAll('.navbar-menu a, .navbar-icons a');

/**
 * Iterate through each navigation link and check if it matches the current page URL.
 * If it matches, add the 'active' class and change the SVG icon color to blue.
 */
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        
        // Check if the link contains an SVG element and change its color
        if (link.querySelector('svg')) {
            link.querySelector('svg').style.fill = 'var(--blue)';
        }
    }
});
