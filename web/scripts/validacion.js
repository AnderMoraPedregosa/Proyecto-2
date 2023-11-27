import { Comerciante } from "../modelos/comerciante.js";
import { getPersonaById } from "./Funciones/getPersona.js";
let selectElement = document.getElementById("selectCategorias");
let tituloAnuncio = document.getElementById("tituloAnuncio");
let precio = document.getElementById("precioAnuncio");
let descripcion = document.getElementById("desc");
let imagenesInput = document.getElementById("imagen");
let imagenBlog = document.getElementById("imagenBlog");

let formBlog = document.getElementById("formBlog");
let formAnuncio = document.getElementById("formAnuncio");
let accion = window.location.pathname.split("/")
let tituloForm = document.getElementById("formTitulo");
let btnCrearProducto = document.getElementById("btnCrearProductoAside");
let btnCrearBlog = document.getElementById("btnCrearBlogAside");
let tituloBlog = document.getElementById("tituloBlog");
let textoBlog = document.getElementById("textoBlog");
switch (accion[2]) {
    case "anuncio":
        btnCrearBlog.style.display = "block";
        tituloForm.textContent = "Crear anuncio";
        formBlog.style.display = "none";
        document.getElementById('btnCrearAnuncio').addEventListener('click', function (event) {
            event.preventDefault();
            insertarActualizarAnuncio();
        });
        break;
    case "blog":
        btnCrearProducto.style.display = "block";
        tituloForm.textContent = "Crear blog";
        formAnuncio.style.display = "none";
        document.getElementById('btnCrearBlog').addEventListener('click', function (event) {
            event.preventDefault();
            insertarActualizarBlog();
        });
        break;
    default:
        window.location.href = "/error";
}

async function insertarActualizarAnuncio() {
    try {
        if (validarFormulario()) {
            var comercianteJSON = await getPersonaById();
            let comerciante = new Comerciante(comercianteJSON["data"][0].id, comercianteJSON["data"][0].id_comercio, comercianteJSON["data"][0].id_persona)
            const url = `/anuncios/insertar`;
            // Crear un objeto para manejar los datos del formulario, incluyendo archivos
            const data = {
                titulo: tituloAnuncio.value,
                precio: precio.value,
                descripcion: descripcion.value,
                cat: selectElement.value,
                imagenes: await obtenerImagenesBase64(imagenesInput.files),
                idComercio: comerciante.idComercio,
                idComerciante: comerciante.id
            };

            // Realizar la solicitud con fetch y esperar la respuesta
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                window.location.href = "/perfilAnuncios";
            } else {
                const errorText = await response.text();
                console.error(`Error en la operación: ${errorText}`);
            }
        }
    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}
async function insertarActualizarBlog() {
    try {
        if (validarFormulario()) {
            var comercianteJSON = await getPersonaById();

            let comerciante = new Comerciante(comercianteJSON["data"][0].id, comercianteJSON["data"][0].id_comercio, comercianteJSON["data"][0].id_persona)
            const url = `/blogs/insertar`;
            // Crear un objeto para manejar los datos del formulario, incluyendo archivos
            const data = {
                titulo: textoBlog.value,
                texto: textoBlog.value,
                imagenes: await obtenerImagenesBase64(imagenBlog.files),
                idComercio: comerciante.idComercio,
                idComerciante: comerciante.id
            };

            // Realizar la solicitud con fetch y esperar la respuesta
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (response.ok) {
              
            } else {
                const errorText = await response.text();
                console.error(`Error en la operación: ${errorText}`);
            }
        }
    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}
async function validarFormulario() {

    try {
        let campos;

        if (accion[2] == "blog") {
            campos = [{ nombre: "Titulo blog", valor: tituloBlog.value.trim(), exp: /^[A-Z][A-Za-z0-9\s'-]+$/ },
            { nombre: "Texto", valor: textoBlog.value.trim(), exp: /^[A-Za-z0-9\s'-]+$/ }]
        } else {
            campos = [{ nombre: "Titulo", valor: tituloAnuncio.value.trim(), exp: /^[A-Z][A-Za-z0-9\s'-]+$/ },
            { nombre: "Precio", valor: precio.value.trim(), exp: /^[0-9]+(\.[0-9]{1,2})?$/ },
            { nombre: "Descripcion", valor: descripcion.value.trim(), exp: /^[A-Za-z0-9\s'-]+$/ }] 
        }

        campos.forEach(campo => {
            if (!campo.exp.test(campo.valor)) {
                throw new Error("El campo '" + campo.nombre + "' no tiene un formato adecuado");
            }
        });

        let categoria = selectElement.value;
        if (categoria === "0") {
            throw new Error("Selecciona una categoria");
        }
        return true;
    } catch (err) {
        alert(err);
        return false;
    }
}

async function obtenerImagenesBase64(files) {
    const promesas = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve({ nombre: file.name, base64: event.target.result });
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    });

    return Promise.all(promesas);
}


