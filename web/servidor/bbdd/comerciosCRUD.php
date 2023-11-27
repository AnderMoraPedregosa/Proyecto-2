<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

function getComercios($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM comercios");
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

function insertarComercio($dbh, $data)
{
    try {
        if (!empty($data['imagenes'])) {
            $imagenes = $data['imagenes'];

            $stmt = $dbh->prepare("INSERT INTO comercios (nombre, logo, email, telefono, direccion)
        VALUES (:nombre, :logo, :email, :telefono, :direccion)");
            // Ajustar el array $data para que coincida con los nombres de marcadores de posición en la consulta
            $data['imagen_anuncio'] = $imagenes[0]; // Tomando la primera imagen como imagen principal
            unset($data['imagenes']); // Eliminar la clave 'imagenes' para evitar conflictos

            // Execute con el array directamente
            $stmt->execute($data);
            $idAnuncio = $dbh->lastInsertId(); // Obtener el ID del último anuncio insertado

            // Insertar las rutas de las imágenes adicionales en la tabla 'imagenes_anuncios'
            foreach ($imagenes as $index => $rutaImagen) {
                // Evitar insertar la imagen principal nuevamente
                $dataImagenAdicional = [
                    'id_anuncio' => $idAnuncio,
                    'ruta_imagen' => $rutaImagen,
                ];
                insertarRutaImagen($dbh, $dataImagenAdicional);
            }
            return true;
        } else {
            // Si no se cargó ninguna imagen, manejarlo según tus necesidades
            return false;
        }
    } catch (PDOException $e) {
        echo "Error en la operación: " . $e->getMessage();
        return false;
        // También puedes agregar logs o realizar acciones específicas en caso de error.
    }
}








function actualizarComercio($dbh, $data)
{
    try {
        $stmt = $dbh->prepare("UPDATE comercios SET nombre = :nombre, logo = :logo, email = :email, telefono = :telefono, direccion = :direccion WHERE id = :idComercio");
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




function eliminarComercio($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("DELETE FROM comercios WHERE id =(:id)");
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
/* function getPersonaByEmailAndPassword($dbh, $email, $pass)
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
} */
