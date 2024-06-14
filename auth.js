// Registrierung
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
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

// Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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

