import { Categoria } from "../modelos/categoria.js";
import { Persona } from "../modelos/persona.js";

var divCategorias = document.getElementById("crudCategorias");
var divPersonas = document.getElementById("crudPersonas");

const tablasCreadas = {
    personas: false,
    categorias: false,
    comercios : false
    // Agrega más tipos según sea necesario
};

let tipo2;
const btnUsuarios = document.getElementById("btnUsuarios");
const btnCategorias = document.getElementById("btnCategorias");
const btnComercios = document.getElementById("btnComercios");

btnUsuarios.addEventListener("click", () => mostrarTabla("personas"));
btnCategorias.addEventListener("click", () => mostrarTabla("categorias"));
btnComercios.addEventListener("click", () => mostrarTabla("comercios"));

function ocultarMostrarTablas(){
    switch(tipo2){
        case "personas":
            divPersonas.style.display = "block";
            divCategorias.style.display = "none";
            break;
        case "categorias":
            divPersonas.style.display = "none";
            divCategorias.style.display = "block";
            break;
    }
}

async function mostrarTabla(tipo) {
    try {
        tipo2 = tipo;
        ocultarMostrarTablas();
        const data = await getData(tipo);
        //coger el div correspondiente
        const divTabla = document.getElementById(`crud${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);

        if (!tablasCreadas[tipo]) {
            tablasCreadas[tipo] = true;
            crearTabla(data, tipo, divTabla);
        }
    
    } catch (error) {
        console.error('Error en la llamada a la API:', error.message);
    }
}

function crearTabla(data, tipo, divTabla) {
    if (data.status === "success") {
        const elementos = obtenerElementos(data.data, tipo);

        const divElemento = document.createElement("div");
        divElemento.className = tipo.toLowerCase();

        const table = document.createElement("table");
        table.className = `table-${tipo.toLowerCase()}`;

        const headersRow = document.createElement("tr");
        headersRow.innerHTML = obtenerEncabezados(tipo);
        table.appendChild(headersRow);

        elementos.forEach(elemento => {
            const row = document.createElement("tr");
            row.innerHTML = obtenerFila(elemento, tipo);
            table.appendChild(row);
        });

        divElemento.appendChild(table);

        divTabla.innerHTML = "";
        divTabla.appendChild(divElemento);

        // Agregar eventos a los enlaces
        const nombreEnlaceCrear = `.enlaceCrear${tipo}`;
        const nombreEnlaceEditar = `.linkEdit${tipo}`;

        document.querySelector(nombreEnlaceCrear)?.addEventListener('click', (e) => {
            e.preventDefault();
            if(tipo2 === "categorias"){
                let nombreCategoria = prompt("Ingrese el nombre de la categoría:");
            if (nombreCategoria) {
                console.log("estoy")
                // Enviar el nombre de la categoría al servidor para insertarla
                insertarCategoria(nombreCategoria);
            }
            }
            else{
            openModal("../paginas/crearEditarPersona.php");
            }
        });

        const enlacesEditar = divTabla.querySelectorAll(nombreEnlaceEditar);
        enlacesEditar.forEach(enlaceEditar => {
            enlaceEditar.addEventListener('click', (e) => {
                e.preventDefault();
                if(tipo2 === "categorias"){
                    let nombreCategoria = prompt("Ingrese el nombre de la categoría a modificar:");
                }else{
                idPersona = enlaceEditar.getAttribute('data-id');
                openModalActualizar("../paginas/crearEditarPersona.php", idPersona, elementos);
                }
            });
        });

        const enlacesEliminar = divTabla.querySelectorAll('.eliminar-enlace');
        enlacesEliminar.forEach(enlaceEliminar => {
            enlaceEliminar.addEventListener('click', (e) => {
                e.preventDefault();
                const id = enlaceEliminar.getAttribute('data-id');
                confirmarEliminacion(id, tipo);
            });
        });
        
    } else {
        manejarErrorTabla(divTabla, tipo);
    }
}

async function insertarCategoria(nombreCategoria) {
    try {
        const base_url = window.location.origin;
        const response = await fetch(`${base_url}/categorias/insertar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nombreCategoria }),
        });

        if (!response.ok) {
            throw new Error(`Error al insertar la categoría. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData.status === "success") {
            console.log('Categoría insertada exitosamente:', responseData.data);
            // Actualizar la tabla para mostrar la nueva categoría
            ocultarMostrarTablas("categorias");
        } else {
            console.error('Error al insertar la categoría:', responseData.message);
        }
    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}

async function getData(tipo) {
    try {
        const base_url = window.location.origin;
        const response = await fetch(`${base_url}/${tipo}/todos`);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(`Error al obtener ${tipo}. Código de estado: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`La respuesta no es un JSON válido. Contenido: ${text}`);
        }

        return data;
    } catch (error) {
        console.error('Error en la llamada a la API:', error.message);
        return { status: 'error', message: `Error en la llamada a la API de ${tipo}` };
    }
}

function obtenerElementos(data, tipo) {
    switch (tipo) {
        case "personas":
            return datosPersonas(data);
        case "categorias":
            return datosCategoria(data);
        default:
            return [];
    }
}

function obtenerEncabezados(tipo) {
    switch (tipo) {
        case "personas":
            return `
                <th>ID</th>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Contraseña</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Operaciones <a href="#" class="enlaceCrear${tipo} linkAddUser"><i class="fa-solid fa-user-plus"></i></a></th>
            `;
        case "categorias":
            return `
                <th>ID</th>
                <th>Nombre</th>
                <th>Operaciones <a href="/categorias/insertar" class="enlaceCrear${tipo} linkAddUser"><i class="fa-solid fa-user-plus"></i></a></th>
            `;
        default:
            return "";
    }
}

function obtenerFila(elemento, tipo) {

     // Objeto de mapeo para los nombres de los roles
     const roles = {
        1: "Id: 1 - Admin",
        2: "Id: 2 - Cliente",
        3: "Id: 1 - Comerciante",
    };

    // Función para obtener el nombre del rol basado en el id_rol
    function obtenerNombreRol(idRol) {
        return roles[idRol] || "Desconocido";
    }

    switch (tipo) {
        case "personas":
            return `
                <td>${elemento.id}</td>
                <td>${elemento.dni}</td>
                <td><i class="fa-solid fa-user"></i>${elemento.nombre}</td>
                <td>${elemento.passwd}</td>
                <td>${elemento.email}</td>
                <td>${obtenerNombreRol(elemento.id_rol)}</td>
                <td>
                    <a href="#" class="linkEdit${tipo}" data-id="${elemento.id}"><i class="fa-solid fa-user-pen"></i></a>
                    <a href="#" class="eliminar-enlace linkDeleteUser" data-id="${elemento.id}"><i class="fa-solid fa-user-minus"></i></a>
                </td>
            `;
        case "categorias":
            return `
                <td>${elemento.id}</td>
                <td>${elemento.nombre}</td>
                <td>
                    <a href="/categorias/actualizar" class="linkEdit${tipo}" data-id="${elemento.id}"><i class="fa-solid fa-user-pen"></i></a>
                    <a href="#" class="eliminar-enlace linkDeleteUser" data-id="${elemento.id}"><i class="fa-solid fa-user-minus"></i></a>
                </td>
            `;
        default:
            return "";
    }
}

let idPersona = null;

//al hacer el fetch de insertar puedo pasarle como argumento el tipo y que me muestre la tabla correspondiente
window.addEventListener("load", async function () {
    // Tu código relacionado con la carga de la página
});

function confirmarEliminacion(id, tipo) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar esta ${tipo}?`);
    if (confirmacion) {
        if(tipo2 === "personas"){
        window.location.href = `/personas/borrarPersona/${id}`;
        }
        else{
        window.location.href = `/categorias/borrarCategoria/${id}`;

        }
    } else {
        console.log("Eliminación cancelada");
    }
}

function openModal(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("modalContent").innerHTML = data;
            document.getElementById("myModal").style.display = "block";
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

$(document).on("click", "#btnCrearPersona", function () {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const dni = document.getElementById("dni").value;
    const passwd = document.getElementById("passwd").value;
    const idRol = document.querySelector('input[name="id_rol"]:checked').value;

    let url;
    if (this.value === "Actualizar") {
        url = `/personas/actualizar/${idPersona}`;
    } else {
        url = `/personas/insertar`;
    }

    insertarActualizarPersona(nombre, email, dni, passwd, idRol, url);
    document.getElementById("myModal").style.display = "none";
});

function openModalActualizar(url, idPersona, elementos) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("modalContent").innerHTML = data;

            const personaSeleccionada = elementos.find(elemento => elemento.id === idPersona);

            document.getElementById("nombre").value = personaSeleccionada.nombre;
            document.getElementById("email").value = personaSeleccionada.email;
            document.getElementById("dni").value = personaSeleccionada.dni;
            document.getElementById("passwd").value = personaSeleccionada.passwd;

            const radioSelector = `input[name="id_rol"][value="${personaSeleccionada.id_rol}"]`;
            alert(personaSeleccionada.id_rol);
            const radioElement = document.querySelector(radioSelector);

            if (radioElement) {
                radioElement.checked = true;
            } else {
                console.error(`Elemento no encontrado: ${radioSelector}`);
            }

            document.getElementById("btnCrearPersona").value = "Actualizar";
            document.getElementById("myModal").style.display = "block";
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
});

async function insertarActualizarPersona(nombre, email, dni, passwd, idRol, url) {
    try {
        const data = {
            id: idPersona,
            dni: dni,
            email: email,
            nombre: nombre,
            passwd: passwd,
            rol: idRol
        };
        console.log(data);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error en la operación: ${response.statusText}`);
        }

        const responseData = await response.text();
        console.log('Operación exitosa:', responseData);

        location.reload(true);
    } catch (error) {
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

function datosCategoria(data) {
    return data.map(categoriaJson => {
        return new Categoria(
            categoriaJson.id,
            categoriaJson.nombre
        );
    });
}