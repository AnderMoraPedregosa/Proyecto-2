import { Anuncio } from "../modelos/anuncio.js";

async function getDetalleAnuncio(id) {
    const response = await fetch(`../index.php?accion=detalles&id=${id}`);
    const data = await response.json();
    return data;
}
window.addEventListener("load", async function () {
    // Crear una instancia de URLSearchParams
    const params = new URLSearchParams(window.location.search);
    // Obtener el valor del parámetro 'id'
    const id = params.get("id");
    if (id) {

        var anuncioJSON = await getDetalleAnuncio(id);

        const anuncioNew = new Anuncio(
            anuncioJSON[0].id,
            anuncioJSON[0].titulo,
            anuncioJSON[0].imagen_anuncio,
            anuncioJSON[0].categoria,
            anuncioJSON[0].descripcion,
            anuncioJSON[0].fecha_creacion,
            anuncioJSON[0].precio,
            anuncioJSON[0].id_categorias,
            anuncioJSON[0].id_comercios,
            anuncioJSON[0].id_comerciante
        );

        htmlDetalle(anuncioNew);
    } else {
        console.error("No se proporcionó el parámetro 'id' en la URL");
    }
});

function htmlDetalle(anuncio) {
    let content = document.getElementById("content");
    const tiempoTranscurrido = calcularTiempoTranscurrido(anuncio.fechaC);
    let article = document.createElement("article");
    article.className = "article-item article-detail";
    article.innerHTML = `<article class="article-item article-detail">
    <div>
    <div class="image-wrap-detalle">
    <img src="${anuncio.imagen}" alt="Producto" />
    </div>
        </div>

        <h2 class="subheader">${anuncio.titulo}</h2>
        <span class="date">
          Publicado:  ${tiempoTranscurrido}
        </span>
        <p>
            ${anuncio.descripcion}
        </p>
        <p>
        ${anuncio.precio} €
        </p>
        <p>
        ${anuncio.categoria} </p>
        <div class="clearfix"></div>
</article>`;
    content.appendChild(article);
}

function calcularTiempoTranscurrido(fecha) {
    const fechaAnuncio = new Date(fecha);
    const ahora = new Date();

    const diferencia = ahora - fechaAnuncio;
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
        return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    } else if (horas > 0) {
        return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    } else if (minutos > 0) {
        return `Hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    } else {
        return 'Hace menos de un minuto';
    }
}

// ...


