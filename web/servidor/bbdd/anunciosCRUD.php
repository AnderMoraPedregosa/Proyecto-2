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
   
    $stmt = $dbh->prepare("INSERT INTO anuncios (titulo, precio, categoria, descripcion, id_categoria, fecha_creacion, id_comerciante, id_comercio) VALUES (:titulo, :precio, :nombre_categoria, :descripcion, :id_categoria,:fecha,:comercio,:anunciante)");
    $stmt->execute($data);
    close();
}

function actualizarAnuncio($dbh, $data, $idAnuncio)
{
    $stmt = $dbh->prepare("UPDATE anuncios SET titulo = :titulo, precio = :precio, categoria = :nombre_categoria, descripcion = :descripcion, id_categoria = :id_categoria, fecha_creacion = :fecha, id_comerciante = :anunciante, id_comercio = :comercio WHERE id = :id_anuncio");
    $data['id_anuncio'] = $idAnuncio;
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
