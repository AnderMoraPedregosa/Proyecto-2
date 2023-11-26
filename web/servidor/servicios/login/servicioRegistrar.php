<?php
require "servidor/bbdd/personasCRUD.php";

function jsonResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    //header('Content-Type: application/json');
    echo json_encode($data);
}
$datos = json_decode(file_get_contents('php://input'), true);

function registrarNuevoUsuario($nombreUsuario, $dniUsuario, $emailUsuario, $contrasenyaUsuario, $tipoUsuario, $dbh)
{

    try {

        $result = checkIfEmailExists($dbh, $emailUsuario);

        if ($result['count'] > 0) {
            echo json_encode(['success' => false, 'error' => 'El correo electrónico ya está registrado']);
            return;
        }

        $hashedPassword = password_hash($contrasenyaUsuario, PASSWORD_DEFAULT);
        $rol = ($tipoUsuario === 'cliente') ? 2 : (($tipoUsuario === 'comerciante') ? 3 : null);

        $datos = [
            "dni" => $dniUsuario,
            "email" => $emailUsuario,
            'nombre' =>  $nombreUsuario,
            'pass' => $hashedPassword,
            'rol' => $rol
        ];

        if (insertarPersona($dbh, $datos)) {
            echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se pudo insertar el usuario en bd']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error al procesar la solicitud ' . $e]);
    }
}



// Aquí maneja la acción específica 'regiatro'

if ($datos) {

    registrarNuevoUsuario($datos['nombre'], $datos['dni'], $datos['email'], $datos['contra'], $datos['tipo'], $dbh);
} else {
    $response = ['status' => 'error', 'message' => 'Acción no válida'];
    jsonResponse($response, 400);
}
