import { Persona } from "../modelos/persona.js";


async function getPersonas() {
    try {
        const base_url = window.location.origin;
        const response = await fetch(`${base_url}/personas/todos`);


        if (!response.ok) {
            throw new Error(`Error al obtener personas. Código de estado: ${response.status}`);
        }


        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`La respuesta no es un JSON válido. Contenido: ${text}`);
        }


        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la llamada a la API:', error.message);
        return { status: 'error', message: 'Error en la llamada a la API' };
    }
}


var idPersona;
window.addEventListener("load", async function () {
    let prueba = document.getElementById("crudUsers");
    let body = await getPersonas();
    let divPersona;


    if (body['status'] == 'success') {
        var personas = datosPersonas(body['data']);


        divPersona = document.createElement("div");
        divPersona.className = "persona";


        let table = document.createElement("table");
        table.className = "table-personas";


        // Encabezados de la tabla
        let headersRow = document.createElement("tr");
        headersRow.innerHTML = `
            <th>ID</th>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>ID Rol</th>
            <th>Operaciones <a href="#" class="enlaceCrearUsuario linkAddUser" ><i class="fa-solid fa-user-plus"></i></a>
            </th>
        `;
        table.appendChild(headersRow);


        // Datos de las personas
        personas.forEach(persona => {
            let row = document.createElement("tr");
            console.log(persona.nombre);
            row.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.dni}</td>
                <td><i class="fa-solid fa-user"></i>${persona.nombre}</td>
                <td>${persona.email}</td>
                <td>${persona.id_rol}</td>
                <td>
                    <a href="#" class="linkEditUser" data-id="${persona.id}"><i class="fa-solid fa-user-pen"></i></a>
                    <a href="#" class="eliminar-enlace linkDeleteUser" data-id="${persona.id}"><i class="fa-solid fa-user-minus"></i></a>
                </td>
            `;
            table.appendChild(row);
        });


        divPersona.appendChild(table);


        prueba.appendChild(divPersona);


        // Agregar evento a los enlaces eliminar
        let eliminarEnlaces = divPersona.querySelectorAll('.eliminar-enlace');
        eliminarEnlaces.forEach(eliminarEnlace => {
            eliminarEnlace.addEventListener('click', function (event) {
                event.preventDefault();
                const idPersona = this.getAttribute('data-id');
                confirmarEliminacion(idPersona);
            });
        });


        // Agregar evento al enlace "Crear Usuario" para abrir el modal
        document.querySelector(".enlaceCrearUsuario").addEventListener('click', function (e) {
            e.preventDefault();
            openModal("../paginas/crearEditarPersona.php");
        });


        // Agregar evento al enlace "Editar Usuario" para abrir el modal
        let editUserLinks = divPersona.querySelectorAll('.linkEditUser');
        editUserLinks.forEach(editUserLink => {
            editUserLink.addEventListener('click', function (e) {
                e.preventDefault();
                idPersona = this.getAttribute('data-id');
                openModalActualizar("../paginas/crearEditarPersona.php", idPersona, personas);
            });
        });


    } else {
        divPersona = document.createElement("div");
        divPersona.className = "personas-error";
        divPersona.innerHTML = `<h2>Error, no se han podido cargar las personas. Vuelva a intentarlo más tarde.</h2>`;
        prueba.appendChild(divPersona);
    }
});


function confirmarEliminacion(idPersona) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar el usuario?");
    if (confirmacion) {
        window.location.href = `/personas/borrarPersona/${idPersona}`;
    } else {
        console.log("Eliminación cancelada");
    }
}


function openModal(url) {
    // Obtener valores del formulario
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido en el modal
            document.getElementById("modalContent").innerHTML = data;
            // Muestra el modal
            document.getElementById("myModal").style.display = "block";
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}




     // Agregar evento al botón "Crear Persona" en el modal
     $(document).on("click", "#btnCrearPersona", function () {
        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const dni = document.getElementById("dni").value;
        const passwd = document.getElementById("passwd").value;
        const idRol = document.querySelector('input[name="id_rol"]:checked').value;






        let url;
        // Verificar si el botón tiene el valor "Actualizar"
        if (this.value === "Actualizar") {
            // Realizar lógica para actualizar
             url = `/personas/actualizar/${idPersona}`;
        } else {


             url = `/personas/insertar`;
        }


        insertarActualizarPersona(nombre, email, dni, passwd, idRol, url);




        // Cerrar el modal después de la operación
        document.getElementById("myModal").style.display = "none";
    });






function openModalActualizar(url, idPersona, personas) {
    // Obtener valores del formulario
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido en el modal
            document.getElementById("modalContent").innerHTML = data;


            // Filtra la información de la persona por ID
            const personaSeleccionada = personas.find(persona => persona.id === idPersona);


            // Llena los campos del formulario con la información de la persona
            document.getElementById("nombre").value = personaSeleccionada.nombre;
            document.getElementById("email").value = personaSeleccionada.email;
            document.getElementById("dni").value = personaSeleccionada.dni;
            document.getElementById("passwd").value = personaSeleccionada.passwd;


            // Selector para el radio button
            const radioSelector = `input[name="id_rol"][value="${personaSeleccionada.id_rol}"]`;


            // Verifica si el elemento existe en el documento
            const radioElement = document.querySelector(radioSelector);


            if (radioElement) {
                // Si existe, establece el valor del radio button
                radioElement.checked = true;
            } else {
                // Si no existe, imprime un mensaje en la consola para depuración
                console.error(`Elemento no encontrado: ${radioSelector}`);
            }


            // Cambiar valor del botón
            document.getElementById("btnCrearPersona").value = "Actualizar";


            // Muestra el modal
            document.getElementById("myModal").style.display = "block";
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}


// Cierra el modal al hacer clic en la "x"
document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
});


async function insertarActualizarPersona(nombre, email, dni, passwd, idRol, url) {
    try {
        // Crear un objeto con las claves correspondientes
        const data = {
            id: idPersona,
            dni: dni,
            email: email,
            nombre: nombre,
            passwd: passwd,
            rol: idRol
        };

        // Realizar la solicitud con fetch y esperar la respuesta
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la operación: ${response.statusText}`);
        }

        // Obtener el texto de la respuesta
        const responseData = await response.text();

        // Imprimir un mensaje en la consola
        console.log('Operación exitosa:', responseData);

        // Recargar la página después de una operación exitosa
        location.reload(true); // El parámetro true fuerza la recarga desde el servidor, omitir si no es necesario
    } catch (error) {
        // Capturar y manejar errores
        console.error('Error en la operación:', error.message);
    }
}

function datosPersonas(data) {
    return data.map(personaJson => {
        return new Persona(
            personaJson.id,
            personaJson.dni,
            personaJson.nombre,
            personaJson.passwd,
            personaJson.email,
            personaJson.id_rol
        );
    });
}



