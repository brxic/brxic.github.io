document.addEventListener('DOMContentLoaded', function() {
    // Registrierungsformular
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwörter stimmen nicht überein.');
                return;
            }

            // Speichern der Daten in Local Storage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            alert('Registrierung erfolgreich!');
            window.location.replace("login.html");
        });
    }

    // Login-Formular
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // Abrufen der gespeicherten Daten
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            // Überprüfen der eingegebenen Daten
            if (username === storedUsername && password === storedPassword) {
                alert('Login erfolgreich!');
                window.location.replace("index.html");
            } else {
                alert('Benutzername oder Passwort ist falsch.');
            }
        });
    }
});
