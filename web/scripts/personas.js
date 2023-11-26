import { Categoria } from "../modelos/categoria.js";
import { Persona } from "../modelos/persona.js";
import { Comercio } from "../modelos/comercio.js";


var divCategorias = document.getElementById("crudCategorias");
var divPersonas = document.getElementById("crudPersonas");
var divComercios = document.getElementById("crudComercios");


const tablasCreadas = {
    personas: false,
    categorias: false,
    comercios : false
};

let tipo2;
var idComercio = null;
var idCat = null;
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
            divComercios.style.display = "none";

            break;
        case "categorias":
            divPersonas.style.display = "none";
            divComercios.style.display = "none";
            divCategorias.style.display = "block";
            break;
        case "comercios":
            divPersonas.style.display = "none";
            divCategorias.style.display = "none";
            divComercios.style.display = "block";
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
                openModal("../paginas/crearActualizarCategoria.php");

            }
            else{
                if(tipo2 === "personas"){
                     openModal("../paginas/crearEditarPersona.php");
                }
                else{
                    openModal("../paginas/crearEditarComercio.php");

                }
            }
        });

        const enlacesEditar = divTabla.querySelectorAll(nombreEnlaceEditar);
        enlacesEditar.forEach(enlaceEditar => {
            enlaceEditar.addEventListener('click', (e) => {
                e.preventDefault();
                if(tipo2 === "categorias"){

                  idCat = enlaceEditar.getAttribute('data-id');

                  openModalActualizar("../paginas/crearActualizarCategoria.php", idCat, elementos);

                }else{
                    if(tipo2 == "personas"){
                idPersona = enlaceEditar.getAttribute('data-id');
                openModalActualizar("../paginas/crearEditarPersona.php", idPersona, elementos);
                    }
                    else{
                        idComercio = enlaceEditar.getAttribute('data-id');
                        openModalActualizar("../paginas/crearEditarComercio.php", idComercio, elementos);

                    }
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
        case "comercios":
            return datosComercios(data);
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
        case "comercios":
            return `
                <th>ID</th>
                <th>Nombre</th>
                <th>Logo</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Operaciones <a href="#" class="enlaceCrear${tipo} linkAddUser"><i class="fa-solid fa-user-plus"></i></a></th>
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
        3: "Id: 3 - Comerciante",
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
            case "comercios":
                return `
                    <td>${elemento.id}</td>
                    <td>${elemento.nombre}</td>
                    <td>${elemento.logo}</td>
                    <td>${elemento.email}</td>
                    <td>${elemento.telefono}</td>
                    <td>${elemento.direccion}</td>
                    <td>
                        <a href="#" class="linkEdit${tipo}" data-id="${elemento.id}"><i class="fa-solid fa-user-pen"></i></a>
                        <a href="#" class="eliminar-enlace linkDeleteUser" data-id="${elemento.id}"><i class="fa-solid fa-user-minus"></i></a>
                    </td>
                `;
        default:
            return "";
    }
}

let idPersona = null;

window.addEventListener("load", async function () {
    // Tu código relacionado con la carga de la página
    //cookie?
    mostrarTabla("personas");
});

function confirmarEliminacion(id, tipo) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar esta ${tipo}?`);
    if (confirmacion) {
        if(tipo2 === "personas"){
        window.location.href = `/personas/borrarPersona/${id}`;
        }
        else{
            if(tipo2 === "categorias"){
        window.location.href = `/categorias/borrarCategoria/${id}`;
            }else{
                window.location.href = `/comercios/eliminar/${id}`;

            }

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

     const data = {
            id: idPersona,
            dni: dni,
            email: email,
            nombre: nombre,
            passwd: passwd,
            rol: idRol
        };
        insertarActualizar(data, url);
    document.getElementById("myModal").style.display = "none";
});

$(document).on("click", "#btnCrearComercio", function () {
    const nombre = document.getElementById("nombreComercio").value;
    const logo = document.getElementById("logoComercio").value;
    const email = document.getElementById("emailComercio").value;
    const telefono = document.getElementById("telefonoComercio").value;
    const direccion = document.getElementById("direccionComercio").value;

    let url;
    if (this.value === "Actualizar") {
        url = `/comercios/actualizar/${idComercio}`;
    } else {
        url = `/comercios/insertar`;
    }

     const data = {
            id: idComercio,
            nombre: nombre,
            logo: logo,
            email: email,
            telefono: telefono,
            direccion: direccion
        };
        insertarActualizar(data, url);
    document.getElementById("myModal").style.display = "none";
});

$(document).on("click", "#btnCrearCategoria", function () {
    const nombre = document.getElementById("nombreCat").value;
   
    let url;
    if (this.value === "Actualizar") {
        url = `/categorias/actualizar/${idCat}`;
    } else {
        url = `/categorias/insertar`;
    }

     const data = {
            idCat: idCat,
            nombre: nombre
        };
        insertarActualizar(data, url);
    document.getElementById("myModal").style.display = "none";
});

function openModalActualizar(url, id, elementos) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("modalContent").innerHTML = data;

            if(tipo2 === "personas"){
                cargarDatosPersonaEnFormulario(id, elementos);
                document.getElementById("btnCrearPersona").value = "Actualizar";
                document.getElementById("myModal").style.display = "block";
            }
            else{
                if (tipo2 === "categorias") {
                    const categoria = elementos.find(elemento => elemento.id === idCat);
                    document.getElementById("nombreCat").value = categoria.nombre;
                    document.getElementById("btnCrearCategoria").value = "Actualizar";
                    document.getElementById("myModal").style.display = "block";
                  

                }else{
                cargarDatosComercioEnFormulario(id, elementos);
                document.getElementById("btnCrearComercio").value = "Actualizar";
                document.getElementById("myModal").style.display = "block";
                }
            }

           
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
});

function cargarDatosPersonaEnFormulario(idPersona, elementos){
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
}

function cargarDatosComercioEnFormulario(idComercio, elementos){
    const comercioSeleccionado = elementos.find(elemento => elemento.id === idComercio);

    document.getElementById("nombreComercio").value = comercioSeleccionado.nombre;
    document.getElementById("emailComercio").value = comercioSeleccionado.email;
    document.getAnimations("logoComercio").value = comercioSeleccionado.logo;
    document.getElementById("telefonoComercio").value = comercioSeleccionado.telefono;
    document.getElementById("direccionComercio").value = comercioSeleccionado.direccion;
}

async function insertarActualizar(data, url) {
    try {
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

function datosComercios(data) {
    return data.map(personaJson => {
        return new Comercio(
            personaJson.id,
            personaJson.nombre,
            personaJson.logo,
            personaJson.email,
            personaJson.telefono,
            personaJson.direccion
        );
    });
}