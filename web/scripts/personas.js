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

        personas.forEach(persona => {
            divPersona = document.createElement("div");
            divPersona.className = "persona";

            divPersona.innerHTML = `
        <table class="table-personas">
            <tr>
                <th>ID</th>
                <td>${persona.id}</td>
            </tr>
            <tr>
                <th>DNI</th>
                <td>${persona.dni}</td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>${persona.nombre}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${persona.email}</td>
            </tr>
            <tr>
                <th>ID Rol</th>
                <td>${persona.id_rol}</td>
            </tr>
        </table>
        <div class="link-container">
            <a href="/personaDetalle/actualizar/${persona.id}" class="link edit"><i class="fa-solid fa-pen-to-square"></i></a>
            <a href="#" class="eliminar-enlace link delete" data-id="${persona.id}"><i class="fa-solid fa-trash"></i></a>
        </div>
        <div class="clearfix"></div>
    `;
            prueba.appendChild(divPersona);

            let eliminarEnlace = divPersona.querySelector('.eliminar-enlace');
            eliminarEnlace.addEventListener('click', function (event) {
                event.preventDefault();
                const idPersona = this.getAttribute('data-id');
                confirmarEliminacion(idPersona);
            });
        });
    } else {
        divPersona = document.createElement("div");
        divPersona.className = "personas-error";
        divPersona.innerHTML = `<h2>Error, no se han podido cargar las personas. Vuelva a intentarlo más tarde.</h2>`;
    }
});

function confirmarEliminacion(idPersona) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar esta persona?");
    if (confirmacion) {
        window.location.href = `/personas/borrarPersona/${idPersona}`;
    } else {
        console.log("Eliminación cancelada");
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
