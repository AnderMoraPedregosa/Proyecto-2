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

function getEmpleadoId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM empleados WHERE id= (:id)");
    $stmt->execute($data);
    return $empleado = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
function insertEmpleado($dbh, $data)
{

    $stmt = $dbh->prepare("INSERT INTO empleados values (null,:nombre, :apellidos, :edad, :fecha_nacimiento,:email, :dni, :genero, :curriculum)");
    $stmt->execute($data);
    close();
}

function eliminarId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("DELETE FROM empleados WHERE id =(:id)");
    $stmt->execute($data);
    close();
}

function eliminar($dbh)
{

    $stmt = $dbh->prepare("DELETE FROM lista_compra");
    $stmt->execute();
    close();
}


