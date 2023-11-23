document.addEventListener("DOMContentLoaded", function() {
    // Obtiene referencias a los botones y al div de resultado
    var btnUsuarios = document.getElementById("btnUsuarios");
    var btnProductos = document.getElementById("btnProductos");
    var btnOtro = document.getElementById("btnOtro");
    var resultadoDiv = document.getElementById("resultado");

    // Asigna manejadores de eventos a los botones
    btnUsuarios.addEventListener("click", function() {
        cargarPagina("../paginas/usuarios.php");
    });

    btnProductos.addEventListener("click", function() {
        cargarPagina("productos.php");
    });

    btnOtro.addEventListener("click", function() {
        cargarPagina("otro.php");
    });

    // Función para cargar una página PHP y mostrar el resultado en el div
    function cargarPagina(archivo) {
        fetch(archivo)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${archivo}: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                resultadoDiv.innerHTML = data;
            })
            .catch(error => {
                console.error(error);
                resultadoDiv.innerHTML = `Error: No se pudo cargar ${archivo}`;
            });
    }
});