import { Anuncio } from "../modelos/anuncio.js";

async function getDetalleAnuncio(id) {
    const response = await fetch(`http://localhost/paginas/article.php?accion=detalle&id=${id}`);
    const data = await response.json();

    return data;
}

window.addEventListener("load", async function () {
  
    var anuncio = await getDetalleAnuncio();

    const anuncioNew = new Anuncio(
        anuncio.id,
        anuncio.titulo,
        anuncio.imagen_anuncio,
        anuncio.categoria,
        anuncio.descripcion,
        anuncio.fecha_creacion,
        anuncio.precio,
        anuncio.id_categorias,
        anuncio.id_comercios,
        anuncio.id_comerciante
    );

    console.log(anuncio);
});
