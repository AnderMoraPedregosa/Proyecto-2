    document.getElementById('enviar').addEventListener('click', validarFormulario);
   

    function validarFormulario() {
        try{
        let campos = [
            { nombre: "Titulo", valor: document.getElementById('titulo').value.trim(), exp: /^[A-Z][A-Za-z0-9\s'-]+$/ },
            { nombre: "Precio", valor: document.getElementById('precio').value.trim(), exp: /^[0-9]+(\.[0-9]{1,2})?$/ },
            { nombre: "Descripcion", valor: document.getElementById('desc').value.trim(), exp: /^[A-Za-z0-9\s'-]+$/ },
            { nombre: "Categoria", valor: document.getElementById('selectCategorias').value, exp: /^(?!--Selecciona--$)/ }
        ];

        campos.forEach(campo => {
            if (!campo.exp.test(campo.valor)) {
                throw new Error("El campo '" + campo.nombre + "' no tiene un formato adecuado");
            }
        });

        enviarFormularioAlServidor();
        alert("Anucnio creado");
    }
    catch(err){
        alert(err);
    }
    }

    // Función para enviar el formulario al servidor mediante Fetch API
    function enviarFormularioAlServidor() {
        var formulario = document.getElementById('crearAnuncio');
        var datosFormulario = new FormData(formulario);

        fetch('../servidor/bbdd/anunciosCRUD.php', {
            method: 'GET',
            body: datosFormulario,
        })
        .then(response => response.json())
        .then(data => {
            // Lógica después de recibir la respuesta del servidor
            console.log('Respuesta del servidor:', data);
            alert('El anuncio ha sido creado correctamente.');
        })
        .catch(error => {
            // Manejo de errores
            console.error('Error al enviar el formulario:', error);
        });
    }
