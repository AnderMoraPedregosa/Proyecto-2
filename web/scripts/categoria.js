import { Categoria } from "../modelos/categoria.js";
async function getCategorias() {
    const response = await fetch("../index.php?accion=categorias");
    const data = await response.json();
    return data;
}


window.addEventListener("load", async function () {
    var selectCategorias = document.getElementById("selectCategorias");
    var categorias = await getCategorias();

    categorias.forEach(async (categoriaJson) => {
        console.log("Categoria JSON:", categoriaJson);

        const categoriaNew = new Categoria(
            categoriaJson.id,
            categoriaJson.nombre
        );

        console.log(categoriaNew.nombre_categoria);

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

    // Agregar un listener para el evento change en el select
    selectCategorias.addEventListener("change", async function (event) {
        // Acciones a realizar cuando se selecciona una categoría, si es necesario
        console.log("Categoría seleccionada:", event.target.value);

        // Split the value into id and nombre_categoria
        let [id, nombre_categoria] = event.target.value.split('|');

        // Now you have both id and nombre_categoria
        console.log("ID:", id);
        console.log("Nombre de la categoría:", nombre_categoria);
    });
});

