const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const userPhone = document.querySelector("#user-phone");
const userPass = document.querySelector("#user-pass");
const userPassR = document.querySelector("#user-pass-r");

const saveButton = document.querySelector("#save-signup");

saveButton.addEventListener('click', async () => {
    try {
        //respons - відповідь серверу
        //await - ждун
        //post- створити; get-отримати; delete - видалити; put - оновити
        const fullName = userName.value.split(" ")

        const respons = await fetch('http://localhost:3000/api/auth/register', {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName : "kaban",
                lastName : "sad",
                email : userEmail.value,
                phoneNumber : userPhone.value,
                password : userPass.value,
                confirmPassword : userPassR.value,
                role : "user"
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


