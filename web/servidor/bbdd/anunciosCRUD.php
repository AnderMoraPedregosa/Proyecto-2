<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

//todos los anuncios
function getAnuncios($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM anuncios");
    $stmt->execute();
    $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $anuncios;
}
//solo anuncios por id
function getAnuncioId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM anuncios WHERE id= (:id)");
    $stmt->execute($data);
    return $anuncio = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
//Añadir un anuncio
function insertarAnuncio($dbh, $data)
{
   
    $stmt = $dbh->prepare("INSERT INTO anuncios (titulo, precio, categoria, descripcion, id_categoria, fecha_creacion, id_comerciante, id_comercio) VALUES (:titulo, :precio, :nombre_categoria, :descripcion, :id_categoria,:fecha,:comercio,:anunciante)");
    $stmt->execute($data);
    close();
}
//Eliminar un anuncio
function eliminarId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("DELETE FROM anuncios WHERE id =(:id)");
    $stmt->execute($data);
    close();
}
//borar todos los anuncios
function eliminar($dbh)
{

    $stmt = $dbh->prepare("DELETE FROM anuncios");
    $stmt->execute();
    close();
}
