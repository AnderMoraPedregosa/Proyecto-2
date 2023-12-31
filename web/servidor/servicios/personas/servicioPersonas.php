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

$datos = json_decode(file_get_contents('php://input'), true);

/*
// Obtener datos JSON del cuerpo de la solicitud PUT
$datos_json = file_get_contents("php://input");

// Decodificar datos JSON
$datos = json_decode($datos_json, true); // El segundo parámetro true devuelve un array asociativo
*/

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
    case 'persona':
        $personas = getPersonaId($dbh, $id);

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
            header("Location: " . $_SERVER['HTTP_REFERER']);
            exit(); // Asegura que el script se detenga después de la redirección
        } else {
            // Si hubo un problema al intentar borrar la persona
            $response = ['status' => 'error', 'message' => 'No se pudo borrar la persona'];
            jsonResponse($response, 500);
        }
        break;
    case "insertar":
        $nombre = $datos['nombre'];
        $email = $datos['email'];
        $dni = $datos['dni'];
        $passwd = $datos['passwd'];
        $idRol = $datos['rol'];
        $comercio = $datos["comercio"];
        $hashedPassword = password_hash($passwd, PASSWORD_DEFAULT);

        $datos = [
            "dni" => $dni,
            "email" => $email,
            'nombre' => $nombre,
            'pass' => $hashedPassword,
            'rol' => $idRol,
            "comercio" => $comercio
        ];

        $result = insertarPersona($dbh, $datos);
        if ($result) {
            // Si la eliminación fue exitosa
            $response = ['status' => 'success', 'message' => 'Persona eliminada correctamente'];
            jsonResponse($response);

            // Redirigir a la página desde la que se hizo la solicitud
            header("Location: " . $_SERVER['HTTP_REFERER']);
            exit(); // Asegura que el script se detenga después de la redirección
        } else {
            // Si hubo un problema al intentar borrar la persona
            $response = ['status' => 'error', 'message' => 'No se pudo borrar la persona'];
            jsonResponse($response, 500);
        }
        break;
    case "actualizar":
        //ACTUALIZAR
        $idPersona = $datos['id'];
        $nombre = $datos['nombre'];
        $email = $datos['email'];
        $dni = $datos['dni'];
        $passwd = $datos['passwd'];
        $idRol = $datos['rol'];

        $datos = [
            "id" => $idPersona,
            "dni" => $dni,
            "email" => $email,
            'nombre' => $nombre,
            'passwd' => $passwd,
            'rol' => $idRol
        ];

        $result = actualizarPersona($dbh, $datos);

        if ($result) {
            // Si la eliminación fue exitosa
            $response = ['status' => 'success', 'message' => 'Persona eliminada correctamente'];
            jsonResponse($response);

            // Redirigir a la página desde la que se hizo la solicitud
            header("Location: " . $_SERVER['HTTP_REFERER']);
            exit(); // Asegura que el script se detenga después de la redirección
        } else {
            // Si hubo un problema al intentar borrar la persona
            $response = ['status' => 'error', 'message' => 'No se pudo borrar la persona'];
            jsonResponse($response, 500);
        }
        break;
}
ob_end_flush();