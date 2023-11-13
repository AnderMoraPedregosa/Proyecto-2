<?php

require "servidor/bbdd/bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);


// Convertimos la respuesta a JSON

// Enviamos la respuesta

function getAnuncios($dbh)
{

    $stmt = $dbh->prepare("SELECT * FROM anuncios");
    $stmt->execute();
    $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    return json_encode($anuncios);
}


// Convertimos la respuesta a JSON
$respuestaJSON = getAnuncios($dbh);
// Enviamos la respuesta
die($respuestaJSON); 
