const currentPage = window.location.pathname;

const navLinks = document.querySelectorAll('.navbar-menu a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});