const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Додаємо клас, коли елемент з'являється
      entry.target.classList.add('active');
    } else {
      // Опціонально: видаляємо клас, щоб анімація повторювалася
      // entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.1 // Анімація спрацює, коли 10% елемента буде видно
});

// Знаходимо всі елементи з класом .reveal та запускаємо спостереження
const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));