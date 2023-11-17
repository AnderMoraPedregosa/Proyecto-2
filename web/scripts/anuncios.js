import { Anuncio } from "../modelos/anuncio.js";
import { calcularTiempoTranscurrido } from "./Funciones/calcularTiempo.js";
async function getAnuncios() {
    try {

        // Obtener la ruta base del documento actual
        const base_url = window.location.origin;
        const response = await fetch(`${base_url}/anuncios/todos`);
        console.log(base_url);
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




window.addEventListener("load", async function () {

    let articles = document.getElementById("articles");
    let body = await getAnuncios();
    let divArticle;

    if (body['status'] == 'success') {

        let anuncios = datosAnuncios(body['data']);
        anuncios.sort((a, b) => new Date(b.fechaC) - new Date(a.fechaC));
        anuncios.forEach(anuncioNew => {
            divArticle = document.createElement("div");
            divArticle.className = "article-item";
            let tiempoTranscurrido = calcularTiempoTranscurrido(anuncioNew.fechaC);
            // Agregar la información del anuncio al nuevo elemento div
            console.log(anuncioNew)
            divArticle.innerHTML = `
             <div class="image-wrap">
                 <img src="${anuncioNew.imagen}" alt="Producto" />
             </div>
             <h2>${anuncioNew.titulo}</h2>
             <span class="date">${tiempoTranscurrido}</span>
             <a href="/anuncioDetalle/detalles/${anuncioNew.id}">Leer más</a>
              <a href="/formulario/actualizar/${anuncioNew.id}">Editar</a>
             <div class="clearfix"></div>
         `;
            articles.appendChild(divArticle);

        });
    } else {
        divArticle = document.createElement("div");
        divArticle.className = "anuncios-error";
        divArticle.innerHTML = `<h2>Error, no se han podido cargar los anuncios. Vuelva a intentarlo más tarde.</h2>`;
        articles.appendChild(divArticle);
    }
});

function datosAnuncios(data) {
    let anuncios = [];

    data.forEach(async (anuncioJson) => {
        let divArticle = document.createElement("div");
        divArticle.className = "article-item";
        const anuncioNew = new Anuncio(
            anuncioJson.id,
            anuncioJson.titulo,
            anuncioJson.imagen_anuncio,
            anuncioJson.categoria,
            anuncioJson.descripcion,
            anuncioJson.fecha_creacion,
            anuncioJson.precio,
            anuncioJson.id_categorias,
            anuncioJson.id_comercios,
            anuncioJson.id_comerciante
        );

        anuncios.push(anuncioNew);
    });
    return anuncios;
}
