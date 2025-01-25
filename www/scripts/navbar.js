const currentPage = window.location.pathname;

const navLinks = document.querySelectorAll('.navbar-menu a, .navbar-icons a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        if (link.querySelector('svg')) {
            link.querySelector('svg').style.fill = 'var(--blue)';
        }
    }
});
