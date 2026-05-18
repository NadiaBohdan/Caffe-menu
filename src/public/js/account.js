const logOut = document.querySelector("#logout");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const userPhone = document.querySelector("#input-log");

const editButton = document.querySelector("#save-signup");


editButton.addEventListener('click', async () => {
    try {
        //respons - відповідь серверу
        //await - ждун
        //post- створити; get-отримати; delete - видалити; put - оновити
        const fullName = userName.value.split(" ")

        const respons = await fetch(/*'http://localhost:3000/api/auth/register'*/, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName : fullName[0],
                lastName : fullName[1],
                email : userEmail.value,
                phoneNumber : userPhone.value
            })
        })
        const data = await respons.json();

        if (!respons.ok) {
            alert(data.message || "Any error")
            return;
        }

        window.location.href = "http://localhost:3000/"
    } catch(err){
        alert("Backend besprizornic:" + err);
    }
})


logOut.addEventListener('click', async () => {
    try {
        const respons = await fetch('http://localhost:3000/api/auth/logout', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }
        })
        const data = await respons.json();

        if (!respons.ok) {
            alert(data.message || "Any error")
            return;
        }

        window.location.href = "http://localhost:3000/"
    } catch(err){
        alert("Backend besprizornic:" + err);
    }
})


