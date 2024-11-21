const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('Usu').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Mensaje de bienvenida
            // Redirigir al usuario o mostrar la página principal
        } else {
            alert(result.error); // Mostrar error si las credenciales son incorrectas
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error con la conexión al servidor');
    }
});
