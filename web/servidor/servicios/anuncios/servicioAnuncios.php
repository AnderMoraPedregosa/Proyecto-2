<?php
require "web\servidor\bbdd\bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

$datos = array(
    "nombre" => "Juan",
    "apellidos" => "Abarra Lumentza"
);
// Convertimos la respuesta a JSON
$respuestaJSON = json_encode($datos);
// Enviamos la respuesta
die($respuestaJSON);
/* function getAnuncios($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM anuncios");
    $stmt->execute();
    return $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);
} */