<?php
require "servidor/bbdd/anunciosCRUD.php";

// Convertir la respuesta a JSON
function jsonResponse($data, $statusCode = 200)
{
    // Establecer la cabecera para JSON y el código de estado
    http_response_code($statusCode);
    header('Content-Type: application/json');

    // Imprimir los datos como JSON (sin llamar a exit)
    echo json_encode($data);
    // No es necesario llamar a exit aquí
}


switch ($accion) {
    case 'search':
        $palabra = urldecode($path_parts[2]);


        if (empty($palabra)) {
            $response = ['status' => 'error', 'message' => 'Término de búsqueda no proporcionado'];
            jsonResponse($response, 400);
        }

        $blogs = getBlogSearch($dbh, $palabra);
        if ($blogs === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener los blogs'];
            jsonResponse($response, 500);
        }
        $response = ['status' => 'success', 'data' => $blogs];
        jsonResponse($response);
        break;
    case 'todos':
        $blogs = getBlogs($dbh);

        if ($anuncios === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener los blogs'];
            jsonResponse($response, 500);
        }

        $response = ['status' => 'success', 'data' => $blogs];
        jsonResponse($response);
        break;
    case 'detalles':
        $blog = getBlogId($dbh, $id);
        $response = [
            'blog' => $blog
        ];
        // Envía la respuesta JSON
        jsonResponse($response);
        break;
    case 'insertar':
        // Obtener información sobre el anuncio desde el formulario
        $titulo = $_POST["titulo"];
        $texto = $_POST["texto"];
    
        date_default_timezone_set('Europe/Madrid');
        // Crear el array $data con la información del anuncio
        $data = [
            'titulo' => $titulo,
            'texto' => $texto,
            'fecha' => date('Y-m-d H:i:s'),
            'comercio' => 1,
            'anunciante' => 2,
            'imagenes' => [], // Este array almacenará las rutas de las imágenes
        ];
        // Insertar el anuncio en la base de datos
        insertarAnuncio($dbh, $data);
        header("Location: /");
        die(); // Finalizar el script después de la redirección

    case "actualizar":

        //ACTUALIZAR
        $titulo = $_POST["titulo"];
        $texto = $_POST["texto"];
        date_default_timezone_set('Europe/Madrid');

        $id_blog = $_POST["id_blog"];
        // Crear el array $data con la información del anuncio
        $data = [
            "id" => $id_anuncio,
            'titulo' => $titulo,
            'texto' => $texto,
            'fecha' => date('Y-m-d H:i:s'),
            'comercio' => 1,
            'anunciante' => 2
        ];
        // Actualizar el anuncio en la base de datos
        actualizarAnuncio($dbh, $data);
        header("Location: /");
        die(); // Finalizar el script después de la redirección
    case "borrarBlog":
        eliminarId($dbh, $id);
        header("Location: /");
        die(); // Finalizar el script después de la redirección
    default:
        $response = ['status' => 'error', 'message' => 'Acción no válida'];
        jsonResponse($response, 400);
        break;
}
