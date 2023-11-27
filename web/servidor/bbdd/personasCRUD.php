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
    $stmt = $dbh->prepare("SELECT * FROM personas WHERE id= (:id)");
    $stmt->execute($data);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
// Dentro de tu función insertarAnuncio


//insertar Persona


function checkIfEmailExists($dbh, $emailUsuario)
{
    $data = array('email' => $emailUsuario);
    $stmt = $dbh->prepare("SELECT COUNT(*) AS count FROM personas WHERE email =(:email)");
    $stmt->execute($data);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function insertarPersona($dbh, $data)
{
    $telefono = $data['telefono'];
    $apellidos = $data['apellidos'];
    unset($data['telefono']);
    unset($data['apellidos']);

    try {
        $stmt = $dbh->prepare("INSERT INTO personas (dni, nombre, passwd, email, id_rol)
        VALUES (:dni, :nombre, :pass, :email, :rol)");
        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta");
        }
        $stmt->execute($data);
        $idPersona = $dbh->lastInsertId();
        $dataCliente = [
            'apellidos' => $apellidos,
            'telefono' => $telefono,
            'idPersona' => $idPersona
        ];
        if (insertarCliente($dbh, $dataCliente)) {
            return true;
        } else {
            return false;
        };
    } catch (Exception $e) {
        // Manejo de errores: Puedes loggear el error, devolver un mensaje de error específico, etc.
        error_log($e->getMessage());
        return false;
    }
}

function insertarCliente($dbh, $data)
{
    try {
        $stmt = $dbh->prepare("INSERT INTO clientes (apellidos, telefono, id_persona) VALUES (:apellidos, :telefono, :idPersona)");
        $stmt->execute($data);
        return true;
    } catch (Exception $e) {
        error_log($e->getMessage());
        return false;
    }
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
    return  $stmt->fetch(PDO::FETCH_ASSOC);
}

function getPersonaByEmail($dbh, $email)
{
    $data = array('email' => $email);
    $stmt = $dbh->prepare("SELECT * FROM personas WHERE email = :email");
    $stmt->execute($data);
    return  $stmt->fetch(PDO::FETCH_ASSOC);
}
