import { Anuncio } from "../modelos/anuncio.js";
async function getAnuncios() {
    const response = await fetch("index.php?accion=anuncios");
    const data = await response.json();
    return data;
}

async function getAnuncioById(id) {
    const response = await fetch(`index.php?accion=detalle&id=${id}`);
    const data = await response.json();
    return data;
}

window.addEventListener("load", async function () {
    var articles = document.getElementById("articles");
    var anuncios = await getAnuncios();

    anuncios.forEach(async (anuncioJson, index) => {
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
        let divArticle = document.createElement("div");
        divArticle.className = "article-item";

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

        // Agregar el nuevo elemento div al contenedor de artículos
        articles.appendChild(divArticle);
    });

    // Agregar un listener para el evento click en los enlaces "Leer más"
  /*   articles.addEventListener("click", async function (event) {
        if (event.target.tagName === "A" && event.target.dataset.anuncioId) {
            event.preventDefault();
            const anuncioId = event.target.dataset.anuncioId;
            const detalleAnuncio = await getAnuncioById(anuncioId);

            // Haz lo que necesites con los detalles del anuncio, por ejemplo, mostrar en un modal.
            console.log("Detalles del anuncio:", detalleAnuncio);
        }
    }); */
});
