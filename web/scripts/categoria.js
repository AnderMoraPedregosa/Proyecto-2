// Importacion de las clases y funciones necesarias desde archivos externos
import { Categoria } from "../modelos/categoria.js";

async function getCategorias() {
    const response = await fetch("/categorias/todos");
    const data = await response.json();
    return data;
}


window.addEventListener("load", async function () {
    var selectCategorias = document.getElementById("selectCategorias");
    var body = await getCategorias();
    body['data'].forEach(async (categoriaJson) => {

        // Crear una nueva instancia con los datos obtenidos
        let categoriaNew = new Categoria(
            categoriaJson.id,
            categoriaJson.nombre
        );


        // Concatenar id y nombre con el delimitador (e.g., "|")
        let value = categoriaNew.id;

        // Crear un nuevo elemento option para cada categoria
        let optCategoria = document.createElement("option");

        // Establecer el valor y el texto de la opcion con la informacion de la categoria
        optCategoria.value = value;
        optCategoria.text = categoriaNew.nombre;

        // Agregar la opcion al elemento select
        selectCategorias.appendChild(optCategoria);
    });


});

