<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);
//todas las categorias
function getCategorias($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM categorias");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getCategoriaId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM categorias WHERE id= (:id)");
    $stmt->execute($data);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function insertarCategoria($dbh, $data)
{
    try {
        $stmt = $dbh->prepare("INSERT INTO categorias (nombre) VALUES (:nombre)");
        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta");
        }

        $success = $stmt->execute($data);
        if (!$success) {
            throw new Exception("Error al ejecutar la consulta");
        }

        return true; // Opcional: Puedes devolver algo más significativo si lo deseas
    } catch (Exception $e) {
        // Manejo de errores: Puedes loggear el error, devolver un mensaje de error específico, etc.
        error_log($e->getMessage());
        return false;
    }
}

function borrarCategoria($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("DELETE FROM categorias WHERE id =(:id)");
    $success = $stmt->execute($data);
    close();
    return $success;
}

function actualizarCategoria($dbh, $data)
{
    $stmt = $dbh->prepare("UPDATE categorias set nombre = :nombre where id = (:idCat)");
    $success = $stmt->execute($data);
    close();
    return $success;
}





