import { Categoria } from "../modelos/categoria.js";
async function getCategorias() {
    const response = await fetch("/categorias");
    const data = await response.json();
    return data;
}


window.addEventListener("load", async function () {
    var selectCategorias = document.getElementById("selectCategorias");
    var categorias = await getCategorias();
    console.log(categorias)
    categorias.forEach(async (categoriaJson) => {

        const categoriaNew = new Categoria(
            categoriaJson.id,
            categoriaJson.nombre
        );

        // Concatenate id and nombre with a delimiter (e.g., "|")
        let value = categoriaNew.id + '|' + categoriaNew.nombre;

        // Crear un nuevo elemento option para cada categoría
        let optCategoria = document.createElement("option");

        // Establecer el valor y el texto de la opción con la información de la categoría
        optCategoria.value = value;
        optCategoria.text = categoriaNew.nombre;

        // Agregar la opción al elemento select
        selectCategorias.appendChild(optCategoria);
    });


});

