import { Anuncio } from "../modelos/anuncio.js";

async function getDetalleAnuncio(id) {
    const response = await fetch(`http://localhost/paginas/article.php?accion=detalle&id=${id}`);
    const data = await response.json();

    return data;
}
window.addEventListener("load", async function () {
    // Crear una instancia de URLSearchParams
    const params = new URLSearchParams(window.location.search);

    // Obtener el valor del parámetro 'id'
    const id = params.get("id");

    if (id) {
        var anuncio = await getDetalleAnuncio(id);

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
    } else {
        console.error("No se proporcionó el parámetro 'id' en la URL");
    }
});
