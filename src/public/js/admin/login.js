const identifierInput = document.querySelector("#admin-username"); // Поле для пошти/телефону
const adminPass = document.querySelector("#admin-pass");
const saveButton = document.querySelector("#save-login"); // Виправили ID кнопки

saveButton.addEventListener('click', async () => {
    // Валідація: перевіряємо, чи користувач взагалі щось ввів
    if (!identifierInput.value.trim() || !adminPass.value.trim()) {
        alert("Please fill in all fields.");
        return;
    }
    try {
        // respons - відповідь сервера
        // await - чекаємо на виконання промісу
        const respons = await fetch('http://localhost:3000/api/auth/staff/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "login": identifierInput.value.trim(),
                "password": adminPass.value
            })
        });

        const data = await respons.json();

        if (!respons.ok) {
            alert(data.message || "Сталася помилка при вході");
            return;
        }

        // Якщо все ок, редиректимо на головну
        window.location.href = "http://localhost:3000" + data.redirect;
    } catch(err) {
        alert("Backend besprizornic: " + err);
    }
});