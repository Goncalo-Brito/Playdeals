
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-s');
    const sections = {
        games: document.querySelector('#games').parentElement,
        dlcs: document.querySelector('#dlcs').parentElement,
        gift_cards: document.querySelector('#gift_cards').parentElement
    };

    function hideSections() {
        for (let section in sections) {
            sections[section].style.display = 'none';
        }
    }

    function showSection(section) {
        hideSections();
        sections[section].style.display = 'block';
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const target = e.target.getAttribute('href').substring(1); 
            showSection(target);
        });
    });

    showSection('games');
});
