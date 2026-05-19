const heartsArray = document.querySelectorAll(".heart");
const cartArray = document.querySelectorAll(".cart");

cartArray.forEach(cart => {
    cart.addEventListener('click', async () => {
        const productId = cart.closest('[data-product-id]').dataset.productId;

        try {
            const respons = await fetch('http://localhost:3000/api/cart', {
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

            const data = await respons.json();

            if (!respons.ok) {
                alert(data.message || "Any error");
                return;
            }
        } catch(err) {
            alert("Backend besprizornic:" + err);
        }
    });
});

heartsArray.forEach(heart => {
    const path = heart.querySelector('path');

    heart.addEventListener('click', async () => {
        const productId = heart.closest('[data-product-id]').dataset.productId;

        if (path.getAttribute('fill') !== '#d35252') {
            path.setAttribute('fill', '#d35252');
        } else {
            path.setAttribute('fill', '#ffffff');
        }

        await fetch('http://localhost:3000/api/favourite/toggle', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ productId: Number(productId) })
        });
    });
});