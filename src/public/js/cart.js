const plus = document.querySelectorAll(".btn-plus");
const minus = document.querySelectorAll(".btn-minus");
const deleteBtn = document.querySelectorAll(".delete-btn");

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

