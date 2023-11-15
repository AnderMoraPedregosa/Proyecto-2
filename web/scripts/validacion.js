    document.getElementById('btnCrearAnuncio').addEventListener('click', validarFormulario);
   
        //valida los campos del formulario antes de enviarlos al server
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

    /*         enviarFormularioAlServidor();
    */       
        }
        catch(err){
            alert(err);
            event.preventDefault();
        }
        }

        /*   // Función para enviar el formulario al servidor mediante Fetch API
            async function enviarFormularioAlServidor() {
                try {
                    let formulario = document.getElementById('crearAnuncio');
                    let datosFormulario = new FormData(formulario);
            
                    const response = await fetch('../servidor/bbdd/anunciosCRUD.php', {
                        method: 'POST',
                        body: datosFormulario,
                    });
            
                    const data = await response.json();
            
                    // Lógica después de recibir la respuesta del servidor
                    console.log('Respuesta del servidor:', data);
                } catch (error) {
                    // Manejo de errores
                    console.error('Error al enviar el formulario:', error);
                }
            } */
    