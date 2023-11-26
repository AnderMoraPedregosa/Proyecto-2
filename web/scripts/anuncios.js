// Importacion de las clases y funciones necesarias desde archivos externos
import { Anuncio } from "../modelos/anuncio.js";
import { calcularTiempoTranscurrido } from "./Funciones/calcularTiempo.js";
import { getPersonaById } from "./Funciones/getPersona.js"
var urlActual = window.location.href;

// Divide la URL en partes utilizando "/" como delimitador
var partesUrl = urlActual.split('/');

// Obtiene el segundo elemento del array (índice 1)

var urlAnuncios = partesUrl[3];
async function getAnuncios(idPersona) {
    try {
        // Obtener la ruta base del documento actual
        const base_url = window.location.origin;
        let response;
        //controlar si mostrar todos los anuncios o solo los propios
        if (urlAnuncios === "") {
            response = await fetch(`${base_url}/anuncios/todos`);
        }
        else {
            document.getElementById("tituloAnuncios").textContent = "Mis anuncios";

            const base_url = window.location.origin;
        
            response = await fetch(`${base_url}/anuncios/comercioConcreto/${idPersona}`);
        }

        if (!response.ok) {
            throw new Error(`Error al obtener anuncios. Código de estado: ${response.status}`);
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
//variables globales
let numero1;
let numero2;
let body;


const cargarMasBtn = document.getElementById("cargarMasBtn");
cargarMasBtn.addEventListener('click', async function () {

    numero1 += 11;
    numero2 += 11;
    mostrarHtmlBoton(body);

});



async function getAnunciosSearch(searchTerm) {
    try {
        numero1 = 0;
        numero2 = 10;

        let response;

        //si no busca por palabra clave muestra todos los anuncios
        if (searchTerm === "") {
            response = await fetch("/anuncios/todos");
        } else {
            // Obtener la ruta base del documento actual
            const base_url = window.location.origin;
            const searchUrl = `${base_url}/anuncios/search/${encodeURIComponent(searchTerm)}`;
            response = await fetch(searchUrl);
        }
        if (!response.ok) {
            throw new Error(`Error al obtener anuncios. Código de estado: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`La respuesta no es un JSON válido. Contenido: ${text}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return { status: 'error', message: 'Error en la llamada a la API' };
    }
}


window.addEventListener("load", async function () {
    let persona = await getPersonaById();
    if(!persona)  {
            //no hay nadie logueado
        body = await getAnuncios();
    }
    else{
        console.log(datosArray["idPersona"])
        body = await getAnuncios(datosArray["idPersona"]);
    }
    let articles = document.getElementById("articles");
    numero1 = 0;
    numero2 = 10;

    mostrarHtmlBoton(body);
    const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const searchInput = document.getElementById("search-input").value;
        body = await getAnunciosSearch(searchInput);
        // Limpia los anuncios existentes
        articles.innerHTML = "";
        if (body['data']) {
            if (body['data'].length > 0) {
                mostrarHtmlBoton(body);
            }
        } else {
            // Mostrar un mensaje si no hay resultados
            const noResultsMessage = document.createElement("div");
            noResultsMessage.className = "anuncios-error";
            noResultsMessage.innerHTML = `<h2>No se encontraron resultados para "${searchInput}".</h2>`;
            articles.appendChild(noResultsMessage);
        }




    });
    let imagenes = document.querySelectorAll('.imagen');

    // Iterar sobre cada imagen y asignar el evento de clic a cada una
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', (e) => {
            // Llamar a la función para mostrar la ventana modal
            mostrarModal(e.target);
        });
    });


});

function confirmarEliminacion(idAnuncio) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este anuncio?");
    if (confirmacion) {
        // El usuario confirmó, realizar la eliminación
        window.location.href = `/anuncios/borrarAnuncio/${idAnuncio}`;
    } else {
        // El usuario canceló, no hacer nada o realizar acciones adicionales aquí
        console.log("Eliminación cancelada");
    }
}
function mostrarHtmlBoton(body) {
    if (body['data'].length > numero2) {
        mostarHtml(body);
        cargarMasBtn.style.display = 'block';
    }
    else {
        mostarHtml(body);
        cargarMasBtn.style.display = 'none';
    }
}

function mostarHtml(body) {
    let divArticle;
    const scrollBefore = window.scrollY;


    if (body['status'] == 'success') {

        let anuncios = datosAnuncios(body['data']);
        anuncios.sort((a, b) => new Date(b.fechaC) - new Date(a.fechaC));
        anuncios.forEach(anuncioNew => {
            divArticle = document.createElement("div");
            divArticle.className = "article-item";
            let tiempoTranscurrido = calcularTiempoTranscurrido(anuncioNew.fechaC);
            // Agregar la información del anuncio al nuevo elemento div
            divArticle.innerHTML = `
                 <div class="image-wrap">
                     <img class="imagen" src="${anuncioNew.imagen}" alt="Producto" />
                 </div>
                 <div class="modal" id="modal">
                 <span class="close-btn" id="closeBtn">&times;</span>
                 <div class="img-container">
                   <div class="zoom">
                   <img class="modalImagen" id="zoomedImage" src="" alt="Zoomed Image">
                   </div>
                 </div>
               </div>
                 <h2>${anuncioNew.titulo}</h2>
                 <span class="date">${tiempoTranscurrido}</span>
                 <p class=>${anuncioNew.descripcion.substring(0, 255)}...<p>
                 <div class="link-container">
                 <a href="/anuncioDetalle/detalles/${anuncioNew.id}" class="link read-more" title="Leer mas"><i  class="fa-solid fa-info"></i> </a>
                 <a href="/anuncioDetalle/actualizar/${anuncioNew.id}" class="link edit" id="aEditar" title="Actualizar" style="display: ${urlAnuncios === "perfilAnuncios" ? 'block' : 'none'};"><i class="fa-solid fa-pen-to-square"></i></a>
                 <a href="#" class="eliminar-enlace link delete enlacesCrudAnuncios" data-id="${anuncioNew.id}" id="aEliminar" title="Eliminar" style="display: ${urlAnuncios === "perfilAnuncios" ? 'block' : 'none'};"><i class="fa-solid fa-trash"></i></a>
                 <a href="#" id="fav" class="fav"><i class="fa-regular fa-star"></i> </a>
                </div>
    
                  <div class="clearfix"></div>
             `;
            articles.appendChild(divArticle);

            let eliminarEnlace = divArticle.querySelector('.eliminar-enlace');
            eliminarEnlace.addEventListener('click', function (event) {
                event.preventDefault();
                const idAnuncio = this.getAttribute('data-id');
                confirmarEliminacion(idAnuncio);
            });


        });

        window.scrollTo({ top: scrollBefore, behavior: 'smooth' });
    } else {
        divArticle = document.createElement("div");
        divArticle.className = "anuncios-error";
        divArticle.innerHTML = `<h2>Error, no se han podido cargar los anuncios. Vuelva a intentarlo más tarde.</h2>`;
        articles.appendChild(divArticle);
    }

    let imagenes = document.querySelectorAll('.imagen');

    // Iterar sobre cada imagen y asignar el evento de clic a cada una
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', (e) => {
            // Llamar a la función para mostrar la ventana modal
            mostrarModal(e.target);
        });
    });


}




function datosAnuncios(data) {
    let anuncios = [];

    data.slice(numero1, numero2).forEach(async (anuncioJson) => {
        let divArticle = document.createElement("div");
        divArticle.className = "article-item";
        const anuncioNew = new Anuncio(
            anuncioJson.id,
            anuncioJson.titulo,
            anuncioJson.imagen_anuncio,
            anuncioJson.descripcion,
            anuncioJson.fecha_creacion,
            anuncioJson.precio,
            anuncioJson.id_categoria,
            anuncioJson.id_comercio,
            anuncioJson.id_comerciante
        );

        anuncios.push(anuncioNew);
    });
    return anuncios;
}


function mostrarModal(imagen) {
    const modal = document.getElementById('modal');
    const zoomedImage = document.getElementById('zoomedImage');
    const closeBtn = document.getElementById('closeBtn');
    const zoom = modal.querySelector('.zoom');

    // Lógica para mostrar la ventana modal
    zoomedImage.src = imagen.src;
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 50);

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');

        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    zoom.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = zoom.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;

        zoomedImage.style.transformOrigin = `${x}% ${y}%`;
        zoomedImage.style.transform = 'scale(1.75)';
    });

    zoom.addEventListener('mouseleave', () => {
        zoomedImage.style.transform = 'scale(1)';
    });
}

