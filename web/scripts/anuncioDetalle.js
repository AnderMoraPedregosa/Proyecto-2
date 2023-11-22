// Importacion de las clases y funciones necesarias desde archivos externos
import { Anuncio } from "../modelos/anuncio.js";
import { calcularTiempoTranscurrido } from "../scripts/Funciones/calcularTiempo.js"
async function getDetalleAnuncio(id) {
    const response = await fetch(`/anuncios/detalles/${id}`);
    const data = await response.json();
    return data;
}
var btnForm = document.getElementById("btnCrearAnuncio");
let selectElement = document.getElementById("selectCategorias");

window.addEventListener("load", async function () {
    // Obtener la ruta de la URL
    const path = window.location.pathname;
    // Dividir la ruta en segmentos
    const pathSegments = path.split('/');
    const accion = pathSegments[2]
    // Obtener el último segmento, que debería ser el 'id'
    var id = pathSegments.pop();


    if (id) {
        var anuncioJSON = await getDetalleAnuncio(id);
        console.log(anuncioJSON);
        const anuncioNew = new Anuncio(
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

        anuncioJSON["imagenes"].length == 1 || !anuncioJSON["imagenes"].length ?
            htmlDetalle(anuncioNew) : htmlDetalleImagenes(anuncioNew, anuncioJSON['imagenes']);
        var url;

        if (accion === "actualizar") {
            // Cambiar texto del botón crear
            document.getElementById("editarAnuncio").style.display = "block";
            btnForm.value = "Actualizar";
            document.getElementById("titulo").value = anuncioNew.titulo;
            document.getElementById("precio").value = anuncioNew.precio;
            document.getElementById("desc").value = anuncioNew.descripcion;
        
            for (var i = 0; i < selectElement.options.length; i++) {
                // Si la opción está seleccionada, agregarla a la lista en JavaScript
                console.log(anuncioNew.idCategoria, selectElement.options[i].value)
                if (anuncioNew.idCategoria == selectElement.options[i].value) {
                    selectElement.options[i].selected = true;
                }
            }
        
           
            const url = `/anuncios/actualizar/${anuncioNew.id}`;
        
            btnForm.addEventListener("click", () => {
                this.alert("click")
                const titulo = document.getElementById("titulo").value;
                const precio = document.getElementById("precio").value;
                const descripcion = document.getElementById("desc").value;
                const cat = selectElement.value;  // Usar selectElement.value para obtener el valor seleccionado
        
                alert(cat);
                alert(url);
                this.alert(id);
                // Asegurarte de que insertarActualizarAnuncio tenga los parámetros necesarios
                insertarActualizarAnuncio(id,titulo, precio, descripcion, cat, url);
                // Resto de tu lógica de actualización...
            });
        }
        

    } else {
        console.error("No se pudo obtener el 'id' de la URL");
    }
});





function htmlDetalle(anuncio) {
    let srcImagen = anuncio.imagen.split('/');
    let content = document.getElementById("content");
    const tiempoTranscurrido = calcularTiempoTranscurrido(anuncio.fechaC);

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
        <p>${anuncio.idCategoria}</p>
        <div class="clearfix"></div>
    `;

    // Agregar las columnas al contenedor principal
    container.appendChild(imageColumn);
    container.appendChild(detailsColumn);

    // Agregar el contenedor principal al contenido
    content.appendChild(container);
}


function htmlDetalleImagenes(anuncio, imagenes) {
    let contenedor = document.getElementById("content");
    const tiempoTranscurrido = calcularTiempoTranscurrido(anuncio.fechaC);

    // Crear un nuevo contenedor para los detalles del anuncio
    let contenedorDetalles = document.createElement("div");

    // Crear un div para contener las imágenes y los botones
    let carrusel = document.createElement("div");
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
    contenedorDetalles.appendChild(btnAnterior);
    contenedorDetalles.appendChild(btnSiguiente);

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
            ${anuncio.idCategoria}
        </p>`;

    // Agregar el nuevo contenedor al contenedor principal
    contenedor.appendChild(contenedorDetalles);
    carruselImg();
}

function carruselImg() {
    let currentImageIndex = 0;
    const images = document.querySelectorAll("#carrusel img");
    const totalImages = images.length;

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
        const data = {
            id: id,
            titulo: titulo,
            precio: precio,
            descripcion: descripcion,
            cat: cat
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
            const errorText = await response.text();
            throw new Error(`Error en la operación: ${errorText}`);
        }

        // Obtener el objeto JSON de la respuesta
        const responseData = await response.json();

        // Imprimir un mensaje en la consola
        console.log('Operación exitosa:', responseData);

        // Actualizar dinámicamente el DOM con JavaScript si es necesario

    } catch (error) {
        // Capturar y manejar errores
        console.error('Error en la operación:', error.message);
        alert('Error en la operación: ' + error.message); // Agrega esta alerta para verificar el mensaje de error

    }
}
