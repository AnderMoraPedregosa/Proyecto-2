// Importacion de las clases y funciones necesarias desde archivos externos
import { Categoria } from "../modelos/categoria.js";

    //realizamos una solicitud al servidor para obtener las categorias
    async function getCategorias() {
        const response = await fetch("../index.php?accion=categorias");
        const data = await response.json();
        return data;
    }


    window.addEventListener("load", async function () {
        //elemento donde se mostraran las categorias
        let selectCategorias = document.getElementById("selectCategorias");
        let categorias = await getCategorias();

            //Iterar sobre cada categoria añadida
            categorias.forEach(async (categoriaJson) => {

                 // Crear una nueva instancia con los datos obtenidos
                let categoriaNew = new Categoria(
                    categoriaJson.id,
                    categoriaJson.nombre
                );


                // Concatenar id y nombre con el delimitador (e.g., "|")
                let value = categoriaNew.id + '|' + categoriaNew.nombre;

                // Crear un nuevo elemento option para cada categoria
                let optCategoria = document.createElement("option");

                // Establecer el valor y el texto de la opcion con la informacion de la categoria
                optCategoria.value = value;
                optCategoria.text = categoriaNew.nombre;

                // Agregar la opcion al elemento select
                selectCategorias.appendChild(optCategoria);
            });

            // Agregar un listener para el evento change en el select
            selectCategorias.addEventListener("change", async function (event) {
                // Acciones a realizar cuando se selecciona una categoria, si es necesario
                console.log("Categoría seleccionada:", event.target.value);

                // Dividr el valor  en id y nombre_categoria
                let idNombreCat = event.target.value.split('|');
            
                // Ahora tienes tanto id como nombre_categoria
            
            });
    });

