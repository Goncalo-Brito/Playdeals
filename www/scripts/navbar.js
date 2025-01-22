const currentPage = window.location.pathname;

// Get all the links in the navbar
const navLinks = document.querySelectorAll('.navbar-menu a');

// Loop through each link and add the 'active' class to the one that matches the current page
navLinks.forEach(link => {
    // Check if the href of the link matches the current page
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});