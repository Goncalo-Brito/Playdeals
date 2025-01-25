/**
 * Store Sections Toggle Script
 *
 * This script manages the visibility of different store sections (games, DLCs, and gift cards).
 * It listens for click events on the navigation buttons and displays the corresponding section.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation buttons
    const buttons = document.querySelectorAll('.button-s');

    // Define the store sections
    const sections = {
        games: document.querySelector('#games').parentElement,
        dlcs: document.querySelector('#dlcs').parentElement,
        gift_cards: document.querySelector('#gift_cards').parentElement
    };

    /**
     * Hides all store sections.
     */
    function hideSections() {
        for (let section in sections) {
            sections[section].style.display = 'none';
        }
    }

    /**
     * Displays the specified store section.
     * 
     * @param {string} section - The section ID to display.
     */
    function showSection(section) {
        hideSections();
        sections[section].style.display = 'block';
    }

    /**
     * Event listener for navigation buttons.
     * 
     * - Retrieves the target section from the href attribute and displays it.
     */
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            const target = e.target.getAttribute('href').substring(1); 
            showSection(target);
        });
    });

    // Show the "games" section by default when the page loads
    showSection('games');
});
