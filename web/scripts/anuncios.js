import { Anuncio } from "../modelos/anuncio.js";
import { calcularTiempoTranscurrido } from "./Funciones/calcularTiempo.js";
async function getAnuncios() {
    const response = await fetch("index.php?accion=anuncios");
    const data = await response.json();
    return data;
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
             <a href="paginas/article.php?accion=detalle&id=${anuncioNew.id}">Leer más</a>
             <div class="clearfix"></div>
         `;
            articles.appendChild(divArticle);

        });


    } else {
        divArticle = document.createElement("div");
        divArticle.className = "anuncios-error";
        divArticle.innerHTML = `<h2>Error, no se han podido cargar los anuncios vuelva a intentarlo mas tarde</h2>`;
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
