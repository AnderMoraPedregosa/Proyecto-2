<?php
require "servidor/bbdd/anunciosCRUD.php";

// Convertir la respuesta a JSON
function jsonResponse($data, $statusCode = 200)
{
    // Establecer la cabecera para JSON y el código de estado
    http_response_code($statusCode);
    header('Content-Type: application/json');

    // Imprimir los datos como JSON y salir
    echo json_encode($data);
}
if (isset($_POST['accion']) || isset($_GET['accion'])) {
    // Obtener la acción de la solicitud
    $accion = isset($_POST['accion']) ? $_POST['accion'] : $_GET['accion'];

    // Manejar diferentes acciones con un switch
    switch ($accion) {
        case 'anuncios':
            $anuncios = getAnuncios($dbh);

            if ($anuncios === false) {
                $response = ['status' => 'error', 'message' => 'No se pudieron obtener los anuncios'];
                jsonResponse($response, 500);
            }

            $response = ['status' => 'success', 'data' => $anuncios];
            jsonResponse($response);
            break;
        case 'detalles':

            $anuncio = getAnuncioId($dbh, $_GET['id']);
            jsonResponse($anuncio);
            break;
        case 'insertar':
            // Verificar si se ha cargado un archivo
            if (isset($_FILES['imagen'])) {
                $imagen = $_FILES['imagen'];

                // Verificar si no hubo errores al subir la imagen
                if ($imagen['error'] === UPLOAD_ERR_OK) {
                    // Obtener información sobre el archivo
                    $nombreArchivo = $imagen['name'];
                    $tipoArchivo = $imagen['type'];
                    $tamanoArchivo = $imagen['size'];
                    $tmpName = $imagen['tmp_name'];

                    // Mover el archivo a la ubicación deseada en el servidor
                    $rutaDestino = 'imagenes/' . $nombreArchivo;

                    if (move_uploaded_file($tmpName, $rutaDestino)) {
                        // El archivo se movió correctamente, ahora puedes almacenar la ruta en la base de datos

                        // Continúa con el código para insertar en la base de datos
                        $idCategoria = isset($_POST['selectCategorias']) ? $_POST['selectCategorias'] : null;
                        list($id, $nombreCategoria) = explode('|', $idCategoria);

                        $titulo = $_POST["titulo"];
                        $precio = $_POST["precio"];
                        $desc = $_POST["desc"];

                        date_default_timezone_set('Europe/Madrid');
                        $data = [
                            'titulo' => $titulo,
                            'precio' => $precio,
                            'descripcion' => $desc,
                            'categoria' => $nombreCategoria,
                            'id_categoria' => $id,
                            'fecha' => date('Y-m-d H:i:s'),
                            'comercio' => 1,
                            'anunciante' => 2,
                            'ruta_imagen' => $rutaDestino,  // Agrega la ruta de la imagen al array
                        ];

                        // ... código posterior para insertar en la base de datos ...

                        insertarAnuncio($dbh, $data);
                        header("Location: index.php");
                        exit();
                    } else {
                        // Hubo un error al mover el archivo
                        $response = ['status' => 'error', 'message' => 'Error al subir la imagen'];
                        jsonResponse($response, 500);
                    }
                } else {
                    // Hubo un error al subir la imagen
                    $response = ['status' => 'error', 'message' => 'Error al subir la imagen'];
                    jsonResponse($response, 500);
                }
            }

            // Si no se cargó una imagen, también continúa con el código para insertar en la base de datos
            $idCategoria = isset($_POST['selectCategorias']) ? $_POST['selectCategorias'] : null;
            list($id, $nombreCategoria) = explode('|', $idCategoria);

            $titulo = $_POST["titulo"];
            $precio = $_POST["precio"];
            $desc = $_POST["desc"];

            date_default_timezone_set('Europe/Madrid');
            $data = [
                'titulo' => $titulo,
                'precio' => $precio,
                'descripcion' => $desc,
                'nombre_categoria' => $nombreCategoria,
                'id_categoria' => $id,
                'fecha' => date('Y-m-d H:i:s'),
                'comercio' => 1,
                'anunciante' => 2,
            ];

            // ... código posterior para insertar en la base de datos ...

            insertarAnuncio($dbh, $data);
            header("Location: index.php");
            exit();

            /*  
            $idCategoria = isset($_POST['selectCategorias']) ? $_POST['selectCategorias'] : null;

            list($id, $nombreCategoria) = explode('|', $idCategoria);

            $titulo = $_POST["titulo"];
            $precio = $_POST["precio"];
            $desc = $_POST["desc"];
            date_default_timezone_set('Europe/Madrid');
            $data = [
                'titulo' => $titulo,
                'precio' => $precio,
                'descripcion' => $desc,
                'nombre_categoria' => $nombreCategoria,
                'id_categoria' => $id,
                'fecha' => date('Y-m-d H:i:s'),
                'comercio' => 1,
                'anunciante' => 2
            ];

            insertarAnuncio($dbh, $data);
            header("Location: index.php");
            exit(); */

        default:
            $response = ['status' => 'error', 'message' => 'Acción no válida'];
            jsonResponse($response, 400);
            break;
    }
}
