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
            // Lógica para la otra acción
            $response = ['status' => 'success', 'message' => 'Operación realizada con éxito para otra acción'];
            jsonResponse($response);
            break;
        case 'insertar':
            /*$_POST[''];
            // Separar el id y el nombre de la categoria
            list($id, $nombreCategoria) = explode('|', ); */

            $titulo = $_POST["titulo"];
            $precio = $_POST["precio"];
            $desc = $_POST["desc"];

            $data = [
                'titulo' => $titulo,
                'precio' => $precio,
                'descripcion' => $desc,
                'nombre_categoria' => $nombreCategoria,
                'id_categoria' => $id
            ];

            insertarAnuncio($dbh, $data);


            break;
        default:
            $response = ['status' => 'error', 'message' => 'Acción no válida'];
            jsonResponse($response, 400);
            break;
    }
}
