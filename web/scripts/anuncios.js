import { Anuncio } from "../modelos/anuncio.js";
async function getAnuncios() {
    const response = await fetch("index.php?accion=anuncios");

    const data = await response.json();

    return data;
}


window.addEventListener("load", async function () {
    var articles = document.getElementById("articles");
    var body = await getAnuncios();
    let divArticle;
    if (body['status'] == 'success') {
        body['data'].forEach(async (anuncioJson) => {
            divArticle = document.createElement("div");
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

            // Crear un nuevo elemento div para cada anuncio


            // Agregar la información del anuncio al nuevo elemento div
            divArticle.innerHTML = `
                <div class="image-wrap">
                    <img src="${anuncioNew.imagen}" alt="Producto" />
                </div>
                <h2>${anuncioNew.titulo}</h2>
                <span class="date">${anuncioNew.fechaC}</span>
                <a href="paginas/article.php?accion=detalle&id=${anuncioNew.id}">Leer más</a>
                <div class="clearfix"></div>
            `;
            articles.appendChild(divArticle);

            // Agregar el nuevo elemento div al contenedor de artículos
        });
    } else {
        divArticle = document.createElement("div");
        divArticle.className = "anuncios-error";
        divArticle.innerHTML = `<h2>Error, no se han podido cargar los anuncios vuelva a intentarlo mas tarde</h2>`;
        articles.appendChild(divArticle);

    }


});
