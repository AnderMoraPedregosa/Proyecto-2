<?php

require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);


function getAnuncios($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM anuncios");
    $stmt->execute();
    $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $anuncios;
}

function getAnuncioId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM anuncios WHERE id= (:id)");
    $stmt->execute($data);
    return $anuncio = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
function insertarAnuncio($dbh, $data)
{
    $stmt = $dbh->prepare("INSERT INTO anuncios (titulo, precio, categoria, descripcion, id_categoria, fecha_creacion, id_comerciante, id_comercio, imagen_anuncio) 
        VALUES (:titulo, :precio, :categoria, :descripcion, :id_categoria, :fecha, :comercio, :anunciante, :ruta_imagen)");
    $stmt->execute($data);
    close();
}

function eliminarId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("DELETE FROM anuncios WHERE id =(:id)");
    $stmt->execute($data);
    close();
}

function eliminar($dbh)
{

    $stmt = $dbh->prepare("DELETE FROM lista_compra");
    $stmt->execute();
    close();
}
