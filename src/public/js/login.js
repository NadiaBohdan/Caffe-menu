// Отримуємо елементи за правильними ID з HTML-файлу
const identifierInput = document.querySelector("#phone-email"); // Поле для пошти/телефону
const userPass = document.querySelector("#user-pass");
const saveButton = document.querySelector("#save-login"); // Виправили ID кнопки

saveButton.addEventListener('click', async () => {
    // Валідація: перевіряємо, чи користувач взагалі щось ввів
    if (!identifierInput.value.trim() || !userPass.value.trim()) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // respons - відповідь сервера
        // await - чекаємо на виконання промісу
        const respons = await fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Передаємо значення з нашого єдиного поля
                identifier: identifierInput.value.trim(), 
                password: userPass.value
            })
        });

        const data = await respons.json();

        if (!respons.ok) {
            alert(data.message || "Сталася помилка при вході");
            return;
        }

        // Якщо все ок, редиректимо на головну
        window.location.href = "http://localhost:3000/";
    } catch(err) {
        alert("Backend besprizornic: " + err);
    }
});