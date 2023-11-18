<<<<<<< HEAD
//movimientos LOGIN
let contenedor = document.getElementById('contenedor');
let registrarseBtn = document.getElementById('registrarse');
let iniciarSesionBtn = document.getElementById('iniciar-sesion');

    registrarseBtn.addEventListener('click', () => {
        contenedor.classList.add("active");
    });

    iniciarSesionBtn.addEventListener('click', () => {
        contenedor.classList.remove("active");
    });


        //funcion asincrona para hashear una contraseña usando SHA-256
        async function hashPassword(password) {
            let encoder = new TextEncoder();
            let data = encoder.encode(password);
            let hashBuffer = await crypto.subtle.digest('SHA-256', data);
            let hashArray = Array.from(new Uint8Array(hashBuffer));
            let hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }
=======
const contenedor = document.getElementById('contenedor');
const registrarseBtn = document.getElementById('registrarse');
const iniciarSesionBtn = document.getElementById('iniciar-sesion');

registrarseBtn.addEventListener('click', () => {
    contenedor.classList.add("active");
});

iniciarSesionBtn.addEventListener('click', () => {
    contenedor.classList.remove("active");
});


import { Persona } from "../modelos/persona.js";


async function hashPassword(password) {
    let encoder = new TextEncoder();
    let data = encoder.encode(password);
    let hashBuffer = await crypto.subtle.digest('SHA-256', data);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    let hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function getUsuario() {
    const response = await fetch("../index.php?accion=login");
    const data = await response.json();
    return data;
}

window.addEventListener("load", async function () {
    var personas = await getUsuario();

    personas.forEach(async (personaJson) => {

        const newPersona = new Persona(
            personaJson.id,
            personaJson.dni,
            personaJson.nombre,
            personaJson.passwd,
            personaJson.email,
            personaJson.id_rol

           
        );
        console.log(newPersona.nombre);
       
        
    });

});

/*
>>>>>>> desarrollo

        // EventListener cuando el DOM esté cargado
        document.addEventListener('DOMContentLoaded', function () {
            let loginButton = document.getElementById('login');

            loginButton.addEventListener('click', async function (event) {
                event.preventDefault(); 
                let emailUsuario = document.getElementById('emailUsuario').value;
                let password = document.getElementById('passwd').value;

                // Llama a la función hashPassword para obtener el hash de la contraseña
                let hashedPassword = await hashPassword(password);

                // Envia los datos al servidor
                let response = await fetch('../servidor/bbdd/login.php', {
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
                    let data = await response.json();
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


           // EventListener cuando el DOM esté cargado
        document.addEventListener('DOMContentLoaded', function () {
            let registroButton = document.getElementById('registro');

            registroButton.addEventListener('click', async function (event) {
                event.preventDefault(); 
            
                //valores recogidos de los inputs y del radiobutton  de registrar
                let nombreUsuario = document.getElementById('nombreUsuario').value;
                let dniUsuario = document.getElementById('dniUsuario').value;
                let emailUsuario = document.getElementById('emailUsuario').value;
                let contraseñaUsuario = document.getElementById('contraseñaUsuario').value;
                let tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked').value;
            
                try {
                    let response = await fetch('../servidor/bbdd/registro_usuario.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nombreUsuario: nombreUsuario,
                            dniUsuario: dniUsuario,
                            emailUsuario: emailUsuario,
                            contraseñaUsuario: contraseñaUsuario,
                            tipoUsuario: tipoUsuario
                        }),
                    });
            
                    let data = await response.text();
                    try {
                        data = JSON.parse(data);
                        if (data.success) {
                            console.log('Registro exitoso');
                        } else {
                            console.log('Error en el registro:', data.error || 'Ocurrió un problema durante el registro');
                        }
                    } catch (error) {
                        console.error('Error al analizar la respuesta JSON:', error);
                    }
                } catch (error) {
                    console.error('Error al realizar la solicitud:', error);
                }
            });
            
    
});

*/

