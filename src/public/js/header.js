const header = document.getElementById('dropdown-header');
const menu = document.getElementById('dropdown-menu');

if (header && menu) {
    const headerText = header.querySelector('.text');
    const headerIcon = header.querySelector('.icon');

    header.addEventListener('click', () => {
        menu.classList.toggle('visible');
        const arrow = header.querySelector('.arrow');
        arrow.innerText = menu.classList.contains('visible') ? '▼' : '▲';
    });

    menu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const newText = item.innerText.replace(item.querySelector('.icon').innerText, '').trim();
            const newIcon = item.querySelector('.icon').innerText;
            headerText.innerText = newText;
            headerIcon.innerText = newIcon;
            menu.classList.remove('visible');
        });
    });

    window.onclick = function(event) {
        if (!event.target.closest('.profile-dropdown')) {
            menu.classList.remove('visible');
        }
    }
}