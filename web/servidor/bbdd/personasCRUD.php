<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

function getPersonas($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM personas");
    $stmt->execute();
    $personas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $personas;
}
//solo anuncios por id
function getPersonaId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM anuncios WHERE id= (:id)");
    $stmt->execute($data);
    return $anuncio = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
// Dentro de tu función insertarAnuncio
function insertarPersona2($dbh, $data)
{
    try {
        $stmt = $dbh->prepare("INSERT INTO personas (dni, nombre, passwd, email, id_rol)
        VALUES (:dni, :nombre, :passwd, :email, :rol)");
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

// Dentro de tu función insertarRutaImagen
function insertarRutaImagen($dbh, $data)
{
    $stmt = $dbh->prepare("INSERT INTO imagenes_anuncios (id_anuncio, ruta_imagen) 
        VALUES (:id_anuncio, :ruta_imagen)");
    $stmt->execute($data);
    close();
}

function actualizarPersona($dbh, $data)
{
    try {
        $stmt = $dbh->prepare("UPDATE personas SET dni = :dni, nombre = :nombre, passwd = :passwd, id_rol = :rol, email = :email WHERE id = :id");
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



function getImagenesId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM imagenes_anuncios WHERE id_anuncio = (:id)");
    $stmt->execute($data);
    return $imagenes = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function borrarPersona($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("DELETE FROM personas WHERE id =(:id)");
    $success = $stmt->execute($data);
    close();
    return $success;
}
//borar todos los anuncios
function eliminar($dbh)
{
    $stmt = $dbh->prepare("DELETE FROM anuncios");

    $stmt = $dbh->prepare("DELETE FROM anuncios");
    $stmt->execute();
    close();
}


//persona por email y contraseña
function getPersonaByEmailAndPassword($dbh, $email, $pass)
{
    $data = array('email' => $email, 'pass' => $pass);
    $stmt = $dbh->prepare("SELECT * FROM personas WHERE email = (:email) AND passwd = (:pass)");
    $stmt->execute($data);
    return $persona = $stmt->fetch(PDO::FETCH_ASSOC);
}

function getPersonaByEmail($dbh, $email)
{
    $data = array('email' => $email);
    $stmt = $dbh->prepare("SELECT * FROM personas WHERE email = (:email)");
    $stmt->execute($data);
    return $persona = $stmt->fetch(PDO::FETCH_ASSOC);
}
