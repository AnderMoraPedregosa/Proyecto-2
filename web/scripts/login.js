const contenedor = document.getElementById('contenedor');
const registrarseBtn = document.getElementById('registrarse');
const iniciarSesionBtn = document.getElementById('iniciar-sesion');

registrarseBtn.addEventListener('click', () => {
    contenedor.classList.add("active");
});

iniciarSesionBtn.addEventListener('click', () => {
    contenedor.classList.remove("active");
});



async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// EventListener cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login');

    loginButton.addEventListener('click', async function () {
        const emailUsuario = document.getElementById('emailUsuario').value;
        const password = document.getElementById('passwd').value;

        // Llama a la función hashPassword para obtener el hash de la contraseña
        const hashedPassword = await hashPassword(password);

        // Envia los datos al servidor
        const response = await fetch('../servidor/bbdd/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailUsuario: emailUsuario,
                hashedPassword: hashedPassword,
            }),
        });
        
        try {
            const data = await response.json();
            if (data.success) {
                console.log('Inicio de sesión exitoso');
            } else {
                console.log('Inicio de sesión fallido:', data.error || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al analizar la respuesta JSON:', error);
        }
        
    });
});
