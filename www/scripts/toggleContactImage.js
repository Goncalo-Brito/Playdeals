document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.grid-object-m a');

    const sections = {
        Goncalo: document.querySelector('#Goncalo'),
        Andre: document.querySelector('#Andre'),
    };

    const sectionsimg = {
        Goncalo: document.getElementById('goncaloimg'),
        Andre: document.getElementById('andreimg'),
    };
    
    function hideSections() {
        for (let section in sections) {
            sections[section].style.opacity = '0';
            sections[section].style.display = 'none';
            sectionsimg[section].classList.remove('profile-image');
        }
    }

    function showSection(section) {
        hideSections();
        sections[section].style.display = 'block';
        sectionsimg[section].classList.add('profile-image');


        setTimeout(() => {
            sections[section].style.opacity = '1';
        }, 10);
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('a').getAttribute('href').substring(1); 
            showSection(target);
        });
    });

    hideSections();
});
