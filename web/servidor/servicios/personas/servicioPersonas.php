<?php
require "servidor/bbdd/personasCRUD.php";

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
    case 'todos':
        $personas = getPersonas($dbh);

        if ($personas === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener las personas'];
            jsonResponse($response, 500);
        }

        $response = ['status' => 'success', 'data' => $personas];
        jsonResponse($response);
        break;
    
    
}
