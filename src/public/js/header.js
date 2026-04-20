const header = document.getElementById('dropdown-header');
const menu = document.getElementById('dropdown-menu');
const headerText = header.querySelector('.text');
const headerIcon = header.querySelector('.icon');

// Перемикання видимості
header.addEventListener('click', () => {
  menu.classList.toggle('visible');
  // Змінюємо стрілку (опціонально)
  const arrow = header.querySelector('.arrow');
  arrow.innerText = menu.classList.contains('visible') ? '▼' : '▲';
});

// Клік по пункту
menu.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    // 1. Беремо іконку та текст з обраного пункту
    const newText = item.innerText.replace(item.querySelector('.icon').innerText, '').trim();
    const newIcon = item.querySelector('.icon').innerText;

    // 2. Оновлюємо шапку
    headerText.innerText = newText;
    headerIcon.innerText = newIcon;

    // 3. Закриваємо меню
    menu.classList.remove('visible');
  });
});

// Закриття при кліку зовні
window.onclick = function(event) {
  if (!event.target.closest('.profile-dropdown')) {
    menu.classList.remove('visible');
  }
}