document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('php/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        console.log(result); // Registro en la consola para depuración

        if (result.success) {
            alert(result.message);
            window.location.href = 'encuestas.html';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al procesar tu solicitud.');
    }
});

