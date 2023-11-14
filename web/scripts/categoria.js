import { Categoria } from "../modelos/categoria.js";
alert("prueba");
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
        // Crear un nuevo elemento option para cada categoría
        let optCategoria = document.createElement("option");

        // Establecer el valor y el texto de la opción con la información de la categoría
        optCategoria.value = categoriaNew.id;
        optCategoria.text = categoriaNew.nombre;

        // Agregar la opción al elemento select
        selectCategorias.appendChild(optCategoria);
    });

    // Agregar un listener para el evento change en el select
    selectCategorias.addEventListener("change", async function (event) {
        // Acciones a realizar cuando se selecciona una categoría, si es necesario
        console.log("Categoría seleccionada:", event.target.value);
    });
});
