// Importacion de las clases y funciones necesarias desde archivos externos
import { Anuncio } from "../modelos/anuncio.js";
import { Categoria } from "../modelos/categoria.js";
import { calcularTiempoTranscurrido } from "../scripts/Funciones/calcularTiempo.js"
import { Comerciante } from "../modelos/comerciante.js";
import { getPersonaById } from "./Funciones/getPersona.js";

let btnVolver = document.getElementById("volverIndexView");

btnVolver.addEventListener("click", function(){
    //volver a la pagina anterior
    window.history.back();

})
async function getDetalleAnuncio(id) {
    let response = await fetch(`/anuncios/detalles/${id}`);
    let data = await response.json();
    return data;
}


async function getCategoriaById(id) {
    let response = await fetch(`/categorias/categoria/${id}`);
    let data = await response.json();
    return data;
}
let comerciante;
let categoria;
let btnForm = document.getElementById("btnCrearAnuncio");
let selectElement = document.getElementById("selectCategorias");
let imagenesInput = document.getElementById("imagen");

window.addEventListener("load", async function () {
    // Obtener la ruta de la URL
    let path = window.location.pathname;
    // Dividir la ruta en segmentos
    let pathSegments = path.split('/');
    let accion = pathSegments[2]
    // Obtener el último segmento, que debería ser el 'id'
    let id = pathSegments.pop();


    if (id) {
        let anuncioJSON = await getDetalleAnuncio(id);
        let anuncioNew = new Anuncio(
            anuncioJSON["anuncio"][0].id,
            anuncioJSON["anuncio"][0].titulo,
            anuncioJSON["anuncio"][0].imagen_anuncio,
            anuncioJSON["anuncio"][0].descripcion,
            anuncioJSON["anuncio"][0].fecha_creacion,
            anuncioJSON["anuncio"][0].precio,
            anuncioJSON["anuncio"][0].id_categoria,
            anuncioJSON["anuncio"][0].id_comercios,
            anuncioJSON["anuncio"][0].id_comerciante
        );
        categoria = await categoriaAnuncio(anuncioNew.idCategoria);
        anuncioJSON["imagenes"].length == 1 || !anuncioJSON["imagenes"].length ?
            htmlDetalle(anuncioNew) : htmlDetalleImagenes(anuncioNew, anuncioJSON['imagenes']);

        if (accion === "actualizar") {
            // Cambiar texto del botón crear
            document.getElementById("editarAnuncio").style.display = "block";
            btnForm.value = "Actualizar";
            document.getElementById("tituloAnuncio").value = anuncioNew.titulo;
            document.getElementById("precioAnuncio").value = anuncioNew.precio;
            document.getElementById("desc").value = anuncioNew.descripcion;

            for (var i = 0; i < selectElement.options.length; i++) {
                // Si la opción está seleccionada, agregarla a la lista en JavaScript
                if (anuncioNew.idCategoria == selectElement.options[i].value) {
                    selectElement.options[i].selected = true;
                }
            }
            let comercianteJSON = await getPersonaById();
            comerciante = new Comerciante(comercianteJSON["data"][0].id, comercianteJSON["data"][0].id_comercio, comercianteJSON["data"][0].id_persona)

            const url = `/anuncios/actualizar/${anuncioNew.id}`;

            btnForm.addEventListener("click", (event) => {
                event.preventDefault();
                let titulo = document.getElementById("tituloAnuncio").value;
                let precio = document.getElementById("precioAnuncio").value;
                let descripcion = document.getElementById("desc").value;
                let cat = selectElement.value;



                insertarActualizarAnuncio(id, titulo, precio, descripcion, cat, url);

            });
        }


    } else {
        console.error("No se pudo obtener el 'id' de la URL");
    }
});





function htmlDetalle(anuncio) {
    let srcImagen = anuncio.imagen.split('/');
    let content = document.getElementById("content-detail");
    let tiempoTranscurrido = calcularTiempoTranscurrido(anuncio.fechaC);

    // Crear un contenedor principal para las dos columnas
    let container = document.createElement("div");
    container.className = "two-columns-container";

    // Columna de la izquierda con la imagen
    let imageColumn = document.createElement("div");
    imageColumn.className = "image-column";
    let imageWrap = document.createElement("div");
    imageWrap.className = "image-wrap-detalle";
    let imgElement = document.createElement("img");
    imgElement.src = srcImagen[0] == "imagenes" ? "/" + anuncio.imagen : anuncio.imagen;
    imgElement.alt = "Producto";
    imageWrap.appendChild(imgElement);
    imageColumn.appendChild(imageWrap);

    // Columna de la derecha con los detalles
    let detailsColumn = document.createElement("div");
    detailsColumn.className = "details-column";
    detailsColumn.innerHTML = `
        <h2 class="subheader">${anuncio.titulo}</h2>
        <span class="date">Publicado: ${tiempoTranscurrido}</span>
        <p>${anuncio.descripcion}</p>
        <p>${anuncio.precio} €</p>
        <p>${categoria.nombre}</p>
        <div class="clearfix"></div>
    `;

    // Agregar las columnas al contenedor principal
    container.appendChild(imageColumn);
    container.appendChild(detailsColumn);

    // Agregar el contenedor principal al contenido
    content.appendChild(container);
}


function htmlDetalleImagenes(anuncio, imagenes) {
    let contenedor = document.getElementById("content-detail");
    let tiempoTranscurrido = calcularTiempoTranscurrido(anuncio.fechaC);

    // Crear un nuevo contenedor para los detalles del anuncio
    let contenedorDetalles = document.createElement("div");

    // Crear un div para contener las imágenes y los botones
    let carrusel = document.createElement("div");
    let flechas = document.createElement("div");
    flechas.id = "flechasCarrusel";

    carrusel.id = "carrusel";
    contenedorDetalles.appendChild(carrusel);

    // Iterar sobre el array de imágenes y crear las etiquetas <img>
    imagenes.forEach(imagen => {
        let imgElement = document.createElement("img");
        imgElement.src = "/" + imagen.ruta_imagen;
        imgElement.alt = "Producto";
        carrusel.appendChild(imgElement);
    });

    // Crear botones anterior y siguiente
    let btnAnterior = document.createElement("button");
    btnAnterior.id = "anterior";
    btnAnterior.textContent = "◄";

    let btnSiguiente = document.createElement("button");
    btnSiguiente.id = "siguiente";
    btnSiguiente.textContent = "►";

    // Agregar botones al contenedor de imágenes
    flechas.appendChild(btnAnterior);
    flechas.appendChild(btnSiguiente);

    carrusel.appendChild(flechas);

    // Agregar detalles del anuncio al nuevo contenedor
    contenedorDetalles.innerHTML += `
        <h1>${anuncio.titulo}</h1>
        <span class="date">
            Publicado: ${tiempoTranscurrido}
        </span>
        <p>
            ${anuncio.descripcion}
        </p>
        <p>
            ${anuncio.precio} €
        </p>
        <p>
            ${categoria.nombre}
        </p>`;

    // Agregar el nuevo contenedor al contenedor principal
    contenedor.appendChild(contenedorDetalles);
    carruselImg();
}

function carruselImg() {
    let currentImageIndex = 0;
    let images = document.querySelectorAll("#carrusel img");
    let totalImages = images.length;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        showImage(currentImageIndex);
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        showImage(currentImageIndex);
    }

    // Mostrar la primera imagen al cargar la página
    showImage(currentImageIndex);

    // Manejar eventos de los botones
    document.getElementById("anterior").addEventListener("click", prevImage);
    document.getElementById("siguiente").addEventListener("click", nextImage);
}




async function insertarActualizarAnuncio(id, titulo, precio, descripcion, cat, url) {
    try {
        // Crear un objeto con las claves correspondientes
        let data = {
            titulo: titulo,
            precio: precio,
            descripcion: descripcion,
            cat: cat,
            imagenes: await obtenerImagenesBase64(imagenesInput.files),
            idComercio: comerciante.idComercio,
            idComerciante: comerciante.id
        };
        console.log(url);
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            let errorText = await response.text();
            throw new Error(`Error en la operación: ${errorText}`);
        } else {
            window.location.reload();
        }

        // Obtener el objeto JSON de la respuesta



        // Actualizar dinámicamente el DOM con JavaScript si es necesario

    } catch (error) {
        // Capturar y manejar errores
        console.error('Error en la operación:', error.message);

    }
}

async function categoriaAnuncio(id) {
    let categoriaJSON = await getCategoriaById(id);

    return categoria = new Categoria(categoriaJSON['categoria'][0].id, categoriaJSON['categoria'][0].nombre)

}

async function obtenerImagenesBase64(files) {
    let promesas = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
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