const plusArray = document.querySelectorAll(".btn-plus");
const minusArray = document.querySelectorAll(".btn-minus");
const deleteBtn = document.querySelectorAll(".delete-btn");

const QUANTITY = 1;

deleteBtn.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        try {
            const id = btn.dataset.id;
            
            const elementToRemove = event.currentTarget.closest('li');
            
            const response = await fetch(`/api/cart/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
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
                elementToRemove.remove();
            }

        } catch(err) {
            alert(`Error: ${err.message || err}`);
        }
    });
})

minusArray.forEach(minus => {
    minus.addEventListener('click', async (e) => {
        try {
            const id = minus.dataset.id;

            const counterContainer = e.currentTarget.closest('.counter');
            const counter = counterContainer ? counterContainer.querySelector('p') : null;

            const response = await fetch('/api/cart/', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: id
                })
            });

            const data = await response.json();

            if(!response.ok) {
                alert(`Error: ${data.message || "some error"}`);
                return;
            }

            if(counter && data.cartItem) {
                counter.textContent = data.cartItem.quantity;
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

            const response = await fetch('/api/cart/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: QUANTITY
                })
            });

            const data = await response.json();

            if(!response.ok) {
                alert(`Error: ${data.message || "some error"}`);
                return;
            }

            if(counter && data.cartItem) {
                counter.textContent = data.cartItem.quantity;
            }
        } catch(err) {
            alert(`Error: ${err.message || err}`);
        }
    });
});
