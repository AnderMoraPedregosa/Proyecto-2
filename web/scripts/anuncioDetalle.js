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

        console.log(anuncioNew);
    } else {
        console.error("No se proporcionó el parámetro 'id' en la URL");
    }
});
