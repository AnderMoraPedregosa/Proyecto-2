<?php
ob_start();

require "servidor/bbdd/categorias.php";

$path = isset($_GET['accion']) ? $_GET['accion'] : '';

// Permitir el acceso desde cualquier origen (CORS)
header('Access-Control-Allow-Origin: *');

// Convertimos la respuesta a JSON
function jsonResponse($data)
{
    header('Content-Type: application/json');
    echo json_encode($data);
}


$datos = json_decode(file_get_contents('php://input'), true);

// Obtener todos los anuncios
switch ($accion) {
    case 'todos':
        $categorias = getCategorias($dbh);
        if ($categorias === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener los anuncios'];
            jsonResponse($response, 500);
        }

        $response = ['status' => 'success', 'data' => $categorias];
        jsonResponse($response);
        break;

    case 'categoria':
        $categoria = getCategoriaId($dbh, $id);

        $response = [
            'success' => true,
            'categoria' => $categoria,
        ];

        // Envía la respuesta JSON
        jsonResponse($response);
        break;
     
    case 'insertar':
        $nombre = $datos['nombre'];

        $data = [
            'nombre' => $nombre
        ];

        $result = insertarCategoria($dbh, $data);

        if ($result) {
            // Si la eliminación fue exitosa
            $response = ['status' => 'success', 'message' => 'Persona eliminada correctamente'];
            jsonResponse($response);

        } else {
            // Si hubo un problema al intentar borrar la persona
            $response = ['status' => 'error', 'message' => 'No se pudo borrar la persona'];
            jsonResponse($response, 500);
        }

        break;
    case "actualizar":


        break;
    case "borrarCategoria":
        $result = borrarCategoria($dbh, $id);

        if ($result) {
            // Si la eliminación fue exitosa
            $response = ['status' => 'success', 'message' => 'Categoria eliminada correctamente'];
            jsonResponse($response);

            // Redirigir a la página desde la que se hizo la solicitud
            header("Location: " . $_SERVER['HTTP_REFERER']);

        } else {
            // Si hubo un problema al intentar borrar la persona
            $response = ['status' => 'error', 'message' => 'No se pudo borrar la persona'];
            jsonResponse($response, 500);
        }
        break;
}
ob_end_flush();
