// Importacion de las clases y funciones necesarias desde archivos externos
import { Anuncio } from "../modelos/anuncio.js";
import { calcularTiempoTranscurrido } from "../scripts/Funciones/calcularTiempo.js"
async function getDetalleAnuncio(id) {
    const response = await fetch(`/anuncios/detalles/${id}`);
    const data = await response.json();
    return data;
}



window.addEventListener("load", async function () {
    // Obtener la ruta de la URL
    const path = window.location.pathname;
    // Dividir la ruta en segmentos
    const pathSegments = path.split('/');
    const accion = pathSegments[2]
    // Obtener el último segmento, que debería ser el 'id'
    const id = pathSegments.pop();


    if (id) {
        var anuncioJSON = await getDetalleAnuncio(id);
        console.log(anuncioJSON);
        const anuncioNew = new Anuncio(
            anuncioJSON["anuncio"][0].id,
            anuncioJSON["anuncio"][0].titulo,
            anuncioJSON["anuncio"][0].imagen_anuncio,
            anuncioJSON["anuncio"][0].categoria,
            anuncioJSON["anuncio"][0].descripcion,
            anuncioJSON["anuncio"][0].fecha_creacion,
            anuncioJSON["anuncio"][0].precio,
            anuncioJSON["anuncio"][0].id_categorias,
            anuncioJSON["anuncio"][0].id_comercios,
            anuncioJSON["anuncio"][0].id_comerciante
        );

        anuncioJSON["imagenes"].length == 1 || !anuncioJSON["imagenes"].length ?
            htmlDetalle(anuncioNew) : htmlDetalleImagenes(anuncioNew, anuncioJSON['imagenes']);

        if (accion === "actualizar") {
            //cambiar texto del boton crear
            document.getElementById("editarAnuncio").style.display = "block";

            //cambiar texto del boton crear
            document.getElementById("btnCrearAnuncio").value = "Modificar";

            document.getElementById("titulo").value = anuncioNew.titulo;

            document.getElementById("precio").value = anuncioNew.precio;
            document.getElementById("desc").value = anuncioNew.descripcion
                ;
            var selectElement = document.getElementById("selectCategorias");

            var opcionesArray = Array.from(selectElement.options);


            // Iterar sobre las opciones del select
            opcionesArray.forEach((option) => {
                var [id, nombreCategoria] = option.value.split('|');
                console.log("ID de la categoría:", id);
                console.log("Nombre de la categoría:", nombreCategoria);

                // Comprobar si el valor de la opción actual coincide con la categoría del anuncio
                if (anuncioNew.categoria === nombreCategoria) {
                    // Establecer la propiedad selected de la opción
                    option.selected = true;
                }
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
        <p>${anuncio.categoria}</p>
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
            ${anuncio.categoria}
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

