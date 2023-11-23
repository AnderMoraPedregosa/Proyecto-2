import { Comerciante } from "../modelos/comerciante.js";

let selectElement = document.getElementById("selectCategorias");
let titulo = document.getElementById("titulo");
let precio = document.getElementById("precio");
let descripcion = document.getElementById("desc");
let imagenesInput = document.getElementById("imagen");
let comerciante;
document.getElementById('btnCrearAnuncio').addEventListener('click', function (event) {
    event.preventDefault();
    insertarActualizarAnuncio();
});


async function insertarActualizarAnuncio() {
    try {
        if (validarFormulario()) {
            var comercianteJSON = await getComercianteByPersonaId();
            comerciante = new Comerciante(comercianteJSON["data"][0].id, comercianteJSON["data"][0].id_comercio, comercianteJSON["data"][0].id_persona)
            const url = `/anuncios/insertar`;
            // Crear un objeto para manejar los datos del formulario, incluyendo archivos
            const data = {
                titulo: titulo.value,
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
                window.location.href = "/";
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
        let campos = [
            { nombre: "Titulo", valor: titulo.value.trim(), exp: /^[A-Z][A-Za-z0-9\s'-]+$/ },
            { nombre: "Precio", valor: precio.value.trim(), exp: /^[0-9]+(\.[0-9]{1,2})?$/ },
            { nombre: "Descripcion", valor: descripcion.value.trim(), exp: /^[A-Za-z0-9\s'-]+$/ }
        ];

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



async function getComercianteByPersonaId() {
    try {
        const response = await fetch(`/comerciantes/comerciantePersona/${datosArray["idPersona"]}`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}