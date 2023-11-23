<?php
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


        break;
    case "actualizar":


        break;
    case "borrarAnuncio":

        break;
}
