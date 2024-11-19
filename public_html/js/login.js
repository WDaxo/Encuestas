document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Usuarios predefinidos (puedes conectarlo con una API o base de datos más adelante)
    const validUsers = JSON.parse(localStorage.getItem('users')) || [
        { username: 'admin', password: '1234' },
        { username: 'user', password: 'password' }
    ];

    // Validar credenciales
    const user = validUsers.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Inicio de sesión exitoso.');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'encuestas.html'; // Redirige a encuestas.html
    } else {
        alert('Credenciales incorrectas. Inténtalo nuevamente.');
    }
});
