<?php
require "../../bbdd/anunciosCRUD.php";

// Convertir la respuesta a JSON
function jsonResponse($data, $statusCode = 200)
{
    // Establecer la cabecera para JSON y el código de estado
    http_response_code($statusCode);
    header('Content-Type: application/json');

    // Imprimir los datos como JSON y salir
    return json_encode($data);
}
if (isset($_POST['accion'])) {
    // Obtener la acción de la solicitud
    $accion = isset($_GET['accion']) ? $_GET['accion'] : '';

// Obtener todos los anuncios

$anuncios = getAnuncios($dbh);
jsonResponse($anuncios);

