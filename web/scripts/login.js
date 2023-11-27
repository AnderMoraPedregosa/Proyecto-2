// Importa la clase Persona desde el archivo persona.js
import { Persona } from "../modelos/persona.js";

let contenedor = document.getElementById('contenedor');
let registrarseBtn = document.getElementById('registrarse');
let iniciarSesionBtn = document.getElementById('iniciar-sesion');

registrarseBtn.addEventListener('click', () => {
    contenedor.classList.add("active");
});

iniciarSesionBtn.addEventListener('click', () => {
    contenedor.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function () {
     // Obtiene el input de nombre de usuario para establecer el valor basado en una cookie
     const nombreInput = document.getElementById("emailUsuarioLogin");

     // Verifica si existe la cookie "userName"
     const userNameCookie = getCookie("userName");
     alert(nombreInput);
 
     // Establecer el valor del input basado en la existencia de la cookie
     nombreInput.value = userNameCookie ? userNameCookie : "prueba";
 

    let botonRegistrar = document.getElementById("btnRegistro");

    botonRegistrar.addEventListener('click', async function (event) {
        try {
            // Evita el comportamiento predeterminado del formulario
            event.preventDefault();

            const nombreUsuario = document.getElementById('nombreUsuario');
            const dniUsuario = document.getElementById('dniUsuario');
            const emailRegistro = document.getElementById('emailUsuario');
            const telefonoUsuario = document.getElementById('telefonoUsuario');
            const contrasenyaUsuario = document.getElementById('contrasenaUsuario');
            const apellidoUsuario = document.getElementById("apellidoUsuario");

            // Validación de campos vacíos
            if (nombreUsuario.value === '' || dniUsuario.value === '' || emailRegistro.value === '' || contrasenyaUsuario.value === '' || apellidoUsuario.value === '' || telefonoUsuario.value === '') {
                alert('Por favor, complete todos los campos.');
            } else {
                // Construye un objeto con los datos del usuario
                let datos = {
                    nombre: nombreUsuario.value,
                    dni: dniUsuario.value,
                    telefono: telefonoUsuario.value,
                    email: emailRegistro.value,
                    contra: contrasenyaUsuario.value,
                    apellidos: apellidoUsuario.value,
                }

                // Realiza una solicitud de registro al servidor
                const response = await fetch('/registrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos)
                });

                // Verifica si la solicitud fue exitosa
                if (response.ok) {
                    // Obtiene la respuesta del servidor como JSON
                    const data = await response.json();

                    // Genera la sesión después de registrar al usuario
                    generarSesion(data);

                    // Inicia sesión automáticamente después del registro
                    await iniciarSesionAutomatica(emailRegistro.value, contrasenyaUsuario.value);
                } else {
                    console.error('Error al realizar la solicitud:', response.status, response.statusText);
                }
            }

        } catch (error) {
            // Maneja cualquier error que ocurra durante la solicitud
            console.error('Error en la solicitud:', error);
        }
    });

    let botonLogin = document.getElementById("btnLogin");

    botonLogin.addEventListener('click', async function (event) {
        try {
            // Evita el comportamiento predeterminado del formulario
            event.preventDefault();

            const emailUsuario = document.getElementById('emailUsuarioLogin').value;
            const passwd = document.getElementById('passwd').value;

            // Validación de campos vacíos
            if (emailUsuario == "" || passwd == "") {
                alert("Debes rellenar las credenciales")
            } else {
                // Realiza una solicitud de inicio de sesión al servidor
                const response = await fetch('/loginService', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `emailUsuario=${emailUsuario}&passwd=${passwd}`,
                });

                // Verifica si la solicitud fue exitosa
                if (response.ok) {
                    const json = await response.json();

                    // Genera la sesión después de iniciar sesión
                    generarSesion(json);
                } else {
                    // Muestra un mensaje de error si las credenciales no son válidas
                    alert("Las credenciales no son válidas")
                    console.error('Error en la solicitud:', response.statusText);
                }
            }

        } catch (error) {
            // Maneja cualquier error que ocurra durante la solicitud
            console.error('Error en la solicitud:', error);
        }
    });
});
// Función para obtener el valor de una cookie por su nombre
function getCookie(nombre) {
    const nombreCookie = `${nombre}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nombreCookie) === 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }

    return null;
}

// Función para generar la sesión del usuario
async function generarSesion(json) {
    // Construye un objeto con los datos de sesión del usuario
    let usuario = {
        "id_rol": json["user"]["id_rol"],
        "idPersona": json["user"]["id"]
    };

    // Almacena los datos de sesión en sessionStorage
    sessionStorage.setItem("user", JSON.stringify(usuario));

    console.log(json)

     // Guardar en cookie
     document.cookie = `userName=${json["user"]["email"]}; path=/`;

   
    // Redirige a la página principal
    location.href = "/";
}



// Función para iniciar sesión automáticamente después del registro
async function iniciarSesionAutomatica(email, password) {
    // Realiza una solicitud de inicio de sesión al servidor
    const response = await fetch('/loginService', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `emailUsuario=${email}&passwd=${password}`,
    });

    // Verifica si la solicitud fue exitosa
    if (response.ok) {
        // Obtiene la respuesta del servidor como JSON
        const json = await response.json();

        // Genera la sesión después de iniciar sesión automáticamente
        generarSesion(json);
        console.log('Inicio de sesión automático exitoso');
    } else {
        console.error('Error en el inicio de sesión automático:', response.statusText);
    }
}
