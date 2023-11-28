<?php
ob_start();

require "servidor/bbdd/comerciosCRUD.php";

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
        $comercios = getComercios($dbh);

        if ($comercios === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener las personas'];
            jsonResponse($response, 500);
        }

        $response = ['status' => 'success', 'data' => $comercios];
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
        $telefono = $datos['telefono'];
        $direccion = $datos['direccion'];

        $datos = [
            "nombre" => $nombre,
            'email' => $email,
            'telefono' => $telefono,
            'direccion' => $direccion
        ];

        $result = insertarComercio($dbh, $datos);
        if ($result) {
            // Si la eliminación fue exitosa
            $response = ['status' => 'success', 'message' => 'Comercio insertado correctamente'];
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
        $idComercio = $datos['id'];
        $nombre = $datos['nombre'];
        $logo = $datos['logo'];
        $email = $datos['email'];
        $telefono = $datos['telefono'];
        $direccion = $datos['direccion'];

        $datos = [
            "idComercio" => $idComercio,
            "nombre" => $nombre,
            "logo" => $logo,
            'email' => $email,
            'telefono' => $telefono,
            'direccion' => $direccion
        ];

        $result = actualizarComercio($dbh, $datos);

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
    case 'comercio':
        $comercio = getComercio($dbh, $id);

        // Asegúrate de que $comercio sea un array o un objeto antes de pasarlo a jsonResponse
        if ($comercio !== null) {
            $response = [
                'success' => true,
                'comercio' => $comercio,
            ];

            jsonResponse($response);
        } else {
            // Manejar el caso en el que no se encuentra el comercio, por ejemplo, devolver un error.
            $errorResponse = [
                'success' => false,
                'error' => 'Comercio no encontrado',
            ];

            jsonResponse($errorResponse);
        }
        break;
    case "eliminar":
        $result = eliminarComercio($dbh, $id);

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