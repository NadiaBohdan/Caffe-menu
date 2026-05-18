{
    const heartsArray = document.querySelectorAll(".heart");
    const cartArray = document.querySelectorAll(".cart");

    cartArray.addEventListener('click', async () => {
        try{
            const respons = await fetch('', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "cartId": 2,
                    productId: Number(productId),
                    "quantity": 1
                })
            })
            const data = await respons.json();

            if (!respons.ok) {
                alert(data.message || "Any error")
                return;
            }
        }catch(err){
            alert("Backend besprizornic:" + err);
        }
    })


    heartsArray.forEach(heart => {
        const path = heart.querySelector('path'); // беремо path всередині svg

        heart.addEventListener('click', async () => {
            const productId = heart.closest('[data-product-id]').dataset.productId;

            if (path.getAttribute('fill') !== '#d35252') {
                path.setAttribute('fill', '#d35252');

                await fetch('http://localhost:3000/api/favourite/toggle', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: Number(productId) })
                });

            } else {
                path.setAttribute('fill', '#ffffff');

                
            }
        });
    });
}
/*
hearts.addEventListener('click', async () => {
    try{


    }catch(err){
        alert("Backend besprizornic:" + err);
    }
});*/