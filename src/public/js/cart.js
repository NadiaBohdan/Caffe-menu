const plusArray = document.querySelectorAll(".btn-plus");
const minusArray = document.querySelectorAll(".btn-minus");
const deleteBtn = document.querySelectorAll(".delete-btn");
const totalPrice = document.querySelector('.total-price');

const QUANTITY = 1;

function changeTotalPrice(li, action = 'plus') {
    if (!li || !totalPrice) return;
    
    const price = Number(li.dataset.price) || 0;
    const currentPrice = Number(totalPrice.textContent.split("$")[0]) || 0;
    
    let newPrice;
    if (action === 'plus') {
        newPrice = currentPrice + price;
    } else if (action === 'minus') {
        newPrice = Math.max(0, currentPrice - price);
    }

    totalPrice.textContent = newPrice + "$";
}

deleteBtn.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        try {
            const id = btn.dataset.id;
            const elementToRemove = event.currentTarget.closest('li');
            
            const counter = elementToRemove ? elementToRemove.querySelector('.counter p') : null;
            const quantity = counter ? Number(counter.textContent) : 0;
            const price = elementToRemove ? Number(elementToRemove.dataset.price) : 0;

            const response = await fetch(`/api/cart/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({ message: "Помилка видалення" }));
                alert(data.message);
                return;
            }

            if (response.status !== 204) {
                await response.json(); 
            }

            if (elementToRemove) {
                const currentPrice = Number(totalPrice.textContent) || 0;
                totalPrice.textContent = Math.max(0, currentPrice - (price * quantity)) + "$";
                
                elementToRemove.remove();
            }

        } catch(err) {
            alert(`Error: ${err.message || err}`);
        }
    });
});

minusArray.forEach(minus => {
    minus.addEventListener('click', async (e) => {
        try {
            const id = minus.dataset.id;
            const counterContainer = e.currentTarget.closest('.counter');
            const counter = counterContainer ? counterContainer.querySelector('p') : null;
            const listItem = e.currentTarget.closest('li');

            const response = await fetch('/api/cart/', {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Error: ${data.message || "some error"}`);
                return;
            }

            if (counter && data.cartItem) {
                counter.textContent = data.cartItem.quantity;
                changeTotalPrice(listItem, 'minus'); 
            }
                       
        } catch(err) {
            alert(`Error: ${err.message || err}`);
        }
    });
});

plusArray.forEach(plus => {
    plus.addEventListener('click', async (e) => {
        try {
            const id = plus.dataset.id;
            const counterContainer = e.currentTarget.closest('.counter');
            const counter = counterContainer ? counterContainer.querySelector('p') : null;
            const listItem = e.currentTarget.closest('li');

            const response = await fetch('/api/cart/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: id,
                    quantity: QUANTITY
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Error: ${data.message || "some error"}`);
                return;
            }

            if (counter && data.cartItem) {
                counter.textContent = data.cartItem.quantity;
                changeTotalPrice(listItem, 'plus'); 
            }
        } catch(err) {
            alert(`Error: ${err.message || err}`);
        }
    });
});