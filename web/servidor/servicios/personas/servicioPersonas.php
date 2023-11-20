<?php
ob_start();

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
        case "borrarPersona":
            $result = borrarPersona($dbh, $id);
    
            if ($result) {
                // Si la eliminación fue exitosa
                $response = ['status' => 'success', 'message' => 'Persona eliminada correctamente'];
                jsonResponse($response);
    
                // Redirigir a la página desde la que se hizo la solicitud
                header("Location: ".$_SERVER['HTTP_REFERER']);
                exit(); // Asegura que el script se detenga después de la redirección
            } else {
                // Si hubo un problema al intentar borrar la persona
                $response = ['status' => 'error', 'message' => 'No se pudo borrar la persona'];
                jsonResponse($response, 500);
            }
            break;
    
    
}
ob_end_flush();
