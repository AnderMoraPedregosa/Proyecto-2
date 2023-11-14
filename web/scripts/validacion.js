    document.getElementById('btnCrearAnuncio').addEventListener('click', validarFormulario);
   

    function validarFormulario(event) {
        try{
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

        //validar categoria

        let categoria = document.getElementById("selectCategorias").value;
        if (categoria === "0") {
            throw new Error("Selecciona una categoria");
        }

        enviarFormularioAlServidor();
        alert("Anuncio creado");
    }
    catch(err){
        alert(err);
        event.preventDefault();
    }
    }

    // Función para enviar el formulario al servidor mediante Fetch API
    function enviarFormularioAlServidor() {
        var formulario = document.getElementById('crearAnuncio');
        var datosFormulario = new FormData(formulario);
    
        fetch('../servidor/bbdd/anunciosCRUD.php', {
            method: 'POST',  // Change to POST
            body: datosFormulario,
        })
        .then(response => response.json())
        .then(data => {
            // Logic after receiving the server's response
            console.log('Respuesta del servidor:', data);
            alert('El anuncio ha sido creado correctamente.');
        })
        .catch(error => {
            // Error handling
            console.error('Error al enviar el formulario:', error);
        });
    }
    