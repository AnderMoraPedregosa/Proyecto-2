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
            <th>Operaciones <a href="#" class="enlaceCrearUsuario linkAddUser" ><i class="fa-solid fa-user-plus"></i></i></a>
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
         $(".enlaceCrearUsuario").click(function (e) {
            e.preventDefault();
            openModal("../paginas/partials/crearEditarPersona.php");
        });

         // Agregar evento al enlace "Crear Usuario" para abrir el modal
         $(".linkEditUser").click(function (e) {
            e.preventDefault();
            idPersona = this.getAttribute('data-id');
        
            openModalActualizar("../paginas/partials/crearEditarPersona.php", idPersona, personas);
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
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            // Inserta el contenido en el modal
            $("#modalContent").html(data);
            // Muestra el modal
            $("#myModal").show();
        },
        error: function (error) {
            console.error('Error al cargar el contenido:', error);
        }
    });
}

       // Agregar evento al botón "Crear Persona" en el modal
       $(document).on("click", "#btnCrearPersona", function () {
        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const dni = document.getElementById("dni").value;
        const passwd = document.getElementById("passwd").value;
        const idRol = document.querySelector('input[name="id_rol"]:checked').value;


        alert(document.getElementById("btnCrearPersona").value);

        // Verificar si el botón tiene el valor "Actualizar"
        if (this.value === "Actualizar") {
            alert("Estoy en Actualizar");
            // Realizar lógica para actualizar
            let url = `/personas/actualizar/${idPersona}`;
            alert(url);
            insertarActualizarPersona(idPersona, nombre, email, dni, passwd, idRol, url );
        } else {
            let url = `/personas/insertar/${idPersona}`;
            insertarActualizarPersona(idPersona, nombre, email, dni, passwd, idRol, );
        }

        // Cerrar el modal después de la operación
        document.getElementById("myModal").style.display = "none";
    });

function openModalActualizar(url, idPersona, personas) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            // Inserta el contenido en el modal
            $("#modalContent").html(data);

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

            //cambiar valor del boton
            document.getElementById("btnCrearPersona").value = "Actualizar";

            // Muestra el modal
            $("#myModal").show();
        },
        error: function (error) {
            console.error('Error al cargar el contenido:', error);
        }
    });
}

// Cierra el modal al hacer clic en la "x"
$("#closeModalBtn").click(function () {
    $("#myModal").hide();
});

/*
// Cierra el modal al hacer clic fuera del contenido del modal
$(window).click(function (event) {
    if (event.target == $("#myModal")[0]) {
        $("#myModal").hide();
    }
});

*/



function insertarActualizarPersona(idPersona, nombre, email, dni, passwd, idRol, url) {
    fetch(url, {
        method: 'POST', // o el método correcto según tu API
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPersona, nombre, email, dni, passwd, idRol }),
    })
    .then(response => response.text())
    .catch(error => console.error('Error en la operación:', error.message));
    
    
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
