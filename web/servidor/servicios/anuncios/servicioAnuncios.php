<?php
require "../../bbdd/anunciosCRUD.php";

if (isset($_POST['accion'])) {
    $accion = $_POST['accion'];

    // Ejecutar la función correspondiente según la acción
    switch ($accion) {
        case 'insertarAnuncio':
    
            // Separar el id y el nombre de la categoria
            list($id, $nombreCategoria) = explode('|', $idCategoria);
    
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
    }
}


// Permitir el acceso desde cualquier origen (CORS)
header('Access-Control-Allow-Origin: *');

/*
// Convertimos la respuesta a JSON
function jsonResponse($data)
{
    header('Content-Type: application/json');
    echo json_encode($data);
}

// Obtener todos los anuncios

$anuncios = getAnuncios($dbh);
jsonResponse($anuncios);

*/