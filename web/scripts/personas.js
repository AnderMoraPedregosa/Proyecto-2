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

window.addEventListener("load", async function () {
    let prueba = document.getElementById("crudUsers");
    let body = await getPersonas();
    let divPersona;

    if (body['status'] == 'success') {
        let personas = datosPersonas(body['data']);

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
            <th>Operaciones <a href="#" class="enlaceCrearUsuario linkAddUser" ><i class="fa-solid fa-user-plus"></i></i></a>
            </th>
        `;
        table.appendChild(headersRow);

        // Datos de las personas
        personas.forEach(persona => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.dni}</td>
                <td><i class="fa-solid fa-user"></i>${persona.nombre}</td>
                <td>${persona.email}</td>
                <td>${persona.id_rol}</td>
                <td>
                    <a href="/personaDetalle/actualizar/${persona.id}" class="linkEditUser"><i class="fa-solid fa-user-pen"></i></a>
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

        //crearUsuario
        let enlaceCrearUsuario = divPersona.querySelector('.enlaceCrearUsuario');

    // Agregar evento de clic al enlace de crear usuario
    enlaceCrearUsuario.addEventListener('click', function (event) {
        event.preventDefault();
        mostrarFormulario();
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

function mostrarFormulario(){
    
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
