<?php

require "servidor/bbdd/bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';

// Permitir el acceso desde cualquier origen (CORS)
header('Access-Control-Allow-Origin: *');

// Convertimos la respuesta a JSON
function jsonResponse($data)
{
    header('Content-Type: application/json');
    echo json_encode($data);
}

// Obtener todos los anuncios
function getAnuncios($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM anuncios");
    $stmt->execute();
    $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse($anuncios);
}

// Obtener el detalle de un anuncio específico
function getDetalleAnuncio($dbh, $id)
{
    $stmt = $dbh->prepare("SELECT * FROM anuncios WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $anuncio = $stmt->fetch(PDO::FETCH_ASSOC);
    jsonResponse($anuncio);
}

// Convertimos la respuesta a JSON
switch ($accion) {
    case 'detalle':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $anuncio = getDetalleAnuncio($dbh, $id);
            if ($anuncio) {
                jsonResponse($anuncio);
            } else {
                jsonResponse(["error" => "Anuncio no encontrado"]);
            }
        } else {
            jsonResponse(["error" => "ID no especificado"]);
        }
        break;
    case 'anuncios':
        getAnuncios($dbh);
        break;
    default:
        jsonResponse(["error" => "Acción no válida"]);
}
