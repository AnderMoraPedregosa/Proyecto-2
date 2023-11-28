
let content = document.getElementById("content-blog");


import { Blog } from "../modelos/blog.js";
import { calcularTiempoTranscurrido } from "./Funciones/calcularTiempo.js";

let urlActual = window.location.href;
// Divide la URL en partes utilizando "/" como delimitador
let partesUrl = urlActual.split('/');


let urlBlog = partesUrl[3];

let sidebar = document.getElementById("sidebar");

let btnMostrarFormBlog = document.getElementById("btnMostrarFormBlog");
let divFormBlog = document.getElementById("formCrearBlog");

btnMostrarFormBlog.addEventListener("click", function () {
    if (btnMostrarFormBlog.textContent === "Crear Blog") {
        divFormBlog.style.display = "block";
        btnMostrarFormBlog.textContent = "Cerrar Crear Blog";
    } else if (btnMostrarFormBlog.textContent === "Cerrar Crear Blog") {
        divFormBlog.style.display = "none";
        btnMostrarFormBlog.textContent = "Crear Blog";
    }
});

async function getBlogs() {
    try {

        //obtener el id de la persona por la sesion
        let idPersona = sessionStorage.getItem('user') ? datosArray['idPersona'] : null;
        // Obtener la ruta base del documento actual
        let base_url = window.location.origin;
        let response;
        if (urlBlog === "blog") {
            sidebar.style.display = "none";

            response = await fetch(`${base_url}/blogs/todos`);

        }
        else {
            sidebar.style.display = "block";
            response = await fetch(`${base_url}/blogs/blogsPorComercio/${idPersona}`);
            document.getElementById("tituloBlogs").textContent = "Mis Blogs";
            document.getElementById("sliderDesc").style.display = "none";
        }

        if (!response.ok) {
            throw new Error(`Error al obtener blogs. Código de estado: ${response.status}`);
        }

        let contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            let text = await response.text();
            throw new Error(`La respuesta no es un JSON válido. Contenido: ${text}`);
        }

        let data = await response.json();
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


let cargarMasBtnBlog = document.getElementById("cargarMasBtnBlog");
cargarMasBtnBlog.addEventListener('click', async function () {

    numero1 += 10;
    numero2 += 10;
    mostrarHtmlBoton(body);


});




window.addEventListener("load", async function () {


    body = await getBlogs();
    numero1 = 0;
    numero2 = 9;
    mostrarHtmlBoton(body);


});


function mostrarHtmlBoton(body) {
    if (body['data'].length > numero2) {
        mostarHtml(body);
        cargarMasBtnBlog.style.display = 'block';
    }
    else {
        mostarHtml(body);
        cargarMasBtnBlog.style.display = 'none';
    }
}

function mostarHtml(body) {
    let divBlog;
    let scrollBefore = window.scrollY;


    if (body['status'] == 'success') {

        let blogs = datosBlog(body['data']);
        blogs.sort((a, b) => new Date(b.fechaC) - new Date(a.fechaC));
        blogs.forEach(blogNew => {
            divBlog = document.createElement("div");
            divBlog.className = "divBlog";
            let tiempoTranscurrido = calcularTiempoTranscurrido(blogNew.fechaC);
            // Agregar la información del anuncio al nuevo elemento div
            divBlog.innerHTML = `
            <h2 class="subheaderBlog">${blogNew.titulo}</h2>
            <div class="article-item-blog article-detail-blog">
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
        let divArticle = document.createElement("div");
        divArticle.className = "article-item";
        let blogNew = new Blog(
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

