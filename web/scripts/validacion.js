
let selectElement = document.getElementById("selectCategorias");
let titulo = document.getElementById("titulo");
let precio = document.getElementById("precio");
let descripcion = document.getElementById("desc");
let imagenesInput = document.getElementById("imagen");

document.getElementById('btnCrearAnuncio').addEventListener('click', function (event) {
    event.preventDefault(); // Evitar la acción predeterminada del botón (en este caso, evitar que el formulario se envíe)

    insertarActualizarAnuncio(); // Llamar a la función que realiza la lógica de inserción/actualización
});

async function insertarActualizarAnuncio() {
    try {
        if (validarFormulario()) {
            const url = `/anuncios/insertar`;





            // Crear un objeto FormData para manejar los datos del formulario, incluyendo archivos
            const data = {
                id: id,
                titulo: titulo,
                precio: precio,
                descripcion: descripcion,
                cat: selectElement.value
            };

            // Agregar cada archivo seleccionado al objeto FormData
            for (let i = 0; i < imagenesInput.files.length; i++) {
                formData.append("imagenes_adicionales[]", imagenesInput.files[i]);
            }

            // Realizar la solicitud con fetch y esperar la respuesta
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            // Verificar si la respuesta es exitosa
            if (response.ok) {
                // Lógica para manejar una respuesta exitosa (si es necesario)
                console.log('Anuncio creado/actualizado correctamente');
            } else {
                // Lógica para manejar errores específicos del servidor
                const errorText = await response.text();
                console.error(`Error en la operación: ${errorText}`);
            }
        }
    } catch (error) {
        // Capturar y manejar errores
        console.error('Error en la operación:', error.message);
    }
}

function validarFormulario() {
    try {
        let campos = [
            { nombre: "Titulo", valor: document.getElementById('titulo').value.trim(), exp: /^[A-Z][A-Za-z0-9\s'-]+$/ },
            { nombre: "Precio", valor: document.getElementById('precio').value.trim(), exp: /^[0-9]+(\.[0-9]{1,2})?$/ },
            { nombre: "Descripcion", valor: document.getElementById('desc').value.trim(), exp: /^[A-Za-z0-9\s'-]+$/ }
        ];

        campos.forEach(campo => {
            if (!campo.exp.test(campo.valor)) {
                throw new Error("El campo '" + campo.nombre + "' no tiene un formato adecuado");
            }
        });


        let categoria = document.getElementById("selectCategorias").value;
        if (categoria === "0") {
            throw new Error("Selecciona una categoria");
        }
        return true;
    }
    catch (err) {
        alert(err);
        return false;

    }
}
