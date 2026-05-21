const heart = document.querySelector(".heart");
const cart = document.querySelector(".cart");

if (!heart || !cart) {
    console.warn("heart або cart не знайдено на сторінці");
} else {
    const path = heart.querySelector('path');

    cart.addEventListener('click', async () => {
        const productEl = cart.closest('[data-product-id]');
        if (!productEl) {
            console.error("data-product-id не знайдено");
            return;
        }
        const productId = productEl.dataset.productId;

        try {
            const response = await fetch('http://localhost:3000/api/cart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId: Number(productId),
                    quantity: 1
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Помилка при додаванні до кошика");
                return;
            }
            alert(data.message)
        } catch (err) {
            alert("Помилка сервера: " + err);
        }
    });

    heart.addEventListener('click', async () => {
        const productEl = heart.closest('[data-product-id]');
        if (!productEl) {
            console.error("data-product-id не знайдено");
            return;
        }
        const productId = productEl.dataset.productId;

        const isFilled = path.getAttribute('fill') === '#d35252';
        path.setAttribute('fill', isFilled ? '#ffffff' : '#d35252');

        try {
            const response = await fetch('http://localhost:3000/api/favourite/toggle', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ productId: Number(productId) })
            });

            if (!response.ok) {
                // Відкатуємо зміну якщо сервер повернув помилку
                path.setAttribute('fill', isFilled ? '#d35252' : '#ffffff');
            }

        } catch (err) {
            // Відкатуємо зміну при помилці мережі
            path.setAttribute('fill', isFilled ? '#d35252' : '#ffffff');
            alert("Помилка сервера: " + err);
        }
    });
}