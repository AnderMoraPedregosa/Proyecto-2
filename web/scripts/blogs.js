
let content = document.getElementById("content-blog");


import { Blog } from "../modelos/blog.js";
import { calcularTiempoTranscurrido } from "./Funciones/calcularTiempo.js";

var urlActual = window.location.href;

// Divide la URL en partes utilizando "/" como delimitador
var partesUrl = urlActual.split('/');

// Obtiene el segundo elemento del array (índice 1)

var urlBlog = partesUrl[3];

async function getBlogs() {
    try {

        //obtener el id de la persona por la sesion
        let idPersona = sessionStorage.getItem('user') ? datosArray['idPersona'] : null;
        // Obtener la ruta base del documento actual
        const base_url = window.location.origin;
         let response;
         if(urlBlog === "blog"){
            response = await fetch(`${base_url}/blogs/todos`);
            document.getElementById("tituloBlogs").textContent = "Blogs";
         }
         else{
            response = await fetch(`${base_url}/blogs/blogsPorComercio/${idPersona}`);
            document.getElementById("tituloBlogs").textContent = "Mis Blogs";

         }

        if (!response.ok) {
            throw new Error(`Error al obtener blogs. Código de estado: ${response.status}`);
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
    console.log(body);
    mostrarHtmlBoton(body);
    console.log("pase por aqui");


});


/* async function getAnunciosSearch(searchTerm) {
    try {
        numero1 = 0;
        numero2 = 10;

        // Obtener la ruta base del documento actual
        const base_url = window.location.origin;
        const searchUrl = `${base_url}/anuncios/search/${encodeURIComponent(searchTerm)}`;
        const response = await fetch(searchUrl);
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
} */


window.addEventListener("load", async function () {


    body = await getBlogs();
    numero1 = 0;
    numero2 = 10;
    mostrarHtmlBoton(body);
    /* const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const searchInput = document.getElementById("search-input").value;
        body = await getAnunciosSearch(searchInput);
        // Limpia los anuncios existentes
        content.innerHTML = "";
        if (body['data']) {
            if (body['data'].length > 0) {
                mostrarHtmlBoton(body);
            }
        } else {
            // Mostrar un mensaje si no hay resultados
            const noResultsMessage = document.createElement("div");
            noResultsMessage.className = "anuncios-error";
            noResultsMessage.innerHTML = `<h2>No se encontraron resultados para "${searchInput}".</h2>`;
            content.appendChild(noResultsMessage);
        }
        console.log(body);

    }); */


});

/* function confirmarEliminacion(idAnuncio) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar este anuncio?");
    if (confirmacion) {
        // El usuario confirmó, realizar la eliminación
        window.location.href = `/anuncios/borrarAnuncio/${idAnuncio}`;
    } else {
        // El usuario canceló, no hacer nada o realizar acciones adicionales aquí
        console.log("Eliminación cancelada");
    }
} */
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
    let divBlog;
    const scrollBefore = window.scrollY;
  

    if (body['status'] == 'success') {

        let blogs = datosBlog(body['data']);
        blogs.sort((a, b) => new Date(b.fechaC) - new Date(a.fechaC));
        blogs.forEach(blogNew => {
            divBlog = document.createElement("div");
            console.log(blogNew.imagen)
            let tiempoTranscurrido = calcularTiempoTranscurrido(blogNew.fechaC);
            // Agregar la información del anuncio al nuevo elemento div
            divBlog.innerHTML = `
            <h2 class="subheaderBlog">${blogNew.titulo}</h2>
            <div class="article-item article-detail-blog">
               <img  class="imagenBlog" src="${blogNew.imagen}"></img>
                <span class="dateBlog">
                  ${tiempoTranscurrido}
                </span>
                <p>
                <div class="divBlog">
                    ${blogNew.texto}
                    </div>
                </p>
                
                <div class="clearfix"></div>
            </div>
             `;
            content.appendChild(divBlog);
/* 
            let eliminarEnlace = divBlog.querySelector('.eliminar-enlace');
            eliminarEnlace.addEventListener('click', function (event) {
                event.preventDefault();
                const idAnuncio = this.getAttribute('data-id');
                confirmarEliminacion(idAnuncio);
            }); */

        });

        window.scrollTo({ top: scrollBefore, behavior: 'smooth' });
    } else {
        divBlog = document.createElement("div");
        divBlog.className = "blog-error";
        divBlog.innerHTML = `<h2>Error, no se han podido cargar los blogs. Vuelva a intentarlo más tarde.</h2>`;
        content.appendChild(divBlog);
    }




}

function datosBlog(data) {
    let blogs = [];

    data.slice(numero1, numero2).forEach(async (blogJson) => {
        console.log(blogJson)
        let divArticle = document.createElement("div");
        divArticle.className = "article-item";
        const blogNew = new Blog(
            blogJson.id,
            blogJson.titulo,
            blogJson.imagen_blog,
            blogJson.texto,
            blogJson.fecha_creacion,
            blogJson.id_comercio,
            blogJson.id_comerciante
        );

        blogs.push(blogNew);
    });
    return blogs;
}
