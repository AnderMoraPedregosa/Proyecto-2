<?php

require "servidor/bbdd/bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';
// Convertimos la respuesta a JSON

// Enviamos la respuesta

function getAnuncios($dbh)
{

    $stmt = $dbh->prepare("SELECT * FROM anuncios");
    $stmt->execute();
    $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return json_encode($anuncios);
}


function getDetalleAnuncio($dbh, $id)
{

    $stmt = $dbh->prepare("SELECT id FROM anuncios");
    $stmt->execute();
    $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return json_encode($anuncios);
}
// Convertimos la respuesta a JSON
switch ($accion) {
    case 'detalle':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $respuestaJSON = getDetalleAnuncio($dbh, $id);
            die($respuestaJSON);
        } else {
            echo "error sapo perro";
            break;
        }
    case 'anuncios':
        $respuestaJSON = getAnuncios($dbh);
        // Enviamos la respuesta
        die($respuestaJSON);
}
