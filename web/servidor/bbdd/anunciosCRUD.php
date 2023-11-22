<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);


function getAnuncioSearch($dbh, $palabra)
{
    try {
        $data = array('palabra' => '%' . $palabra . '%');
        $stmt = $dbh->prepare("SELECT * FROM anuncios WHERE titulo LIKE :palabra");

        $stmt->execute($data);

        // Manejar el caso en que no hay coincidencias
        $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($anuncios)) {
            // Puedes devolver un valor específico, lanzar una excepción, o manejarlo de otra manera.
            return false;
        }

        // Cerrar la conexión
        $stmt->closeCursor();

        return $anuncios;
    } catch (PDOException $e) {
        // Manejar la excepción según tus necesidades (log, mostrar mensaje de error, etc.)
        echo "Error: " . $e->getMessage();
        return false;
    }
}

function getAnuncios($dbh)
{
    try {
        $stmt = $dbh->prepare("SELECT * FROM anuncios");
        $stmt->execute();

        // Obtener resultados directamente sin necesidad de almacenar en una variable intermedia
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Manejar la excepción según tus necesidades (log, mostrar mensaje de error, etc.)
        echo "Error al obtener anuncios: " . $e->getMessage();
        return false;
    }
}

//solo anuncios por id
function getAnuncioId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM anuncios WHERE id= (:id)");
    $stmt->execute($data);
    return $anuncio = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getAnuncioPorComercio($dbh, $id)
{
    $data = array('comercio_id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM anuncios WHERE id_comercio= (:comercio_id)");
    $stmt->execute($data);
    return $anuncio = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
// Dentro de tu función insertarAnuncio
function insertarAnuncio($dbh, $data)
{
    if (!empty($data['imagenes'])) {
        $imagenes = $data['imagenes'];

        // Insertar el anuncio en la tabla 'anuncios'
        $stmt = $dbh->prepare("INSERT INTO anuncios (titulo, precio, categoria, descripcion, id_categoria, fecha_creacion, id_comerciante, id_comercio, imagen_anuncio) 
            VALUES (:titulo, :precio, :categoria, :descripcion, :id_categoria, :fecha, :comercio, :anunciante, :imagen_anuncio)");

        // Ajustar el array $data para que coincida con los nombres de marcadores de posición en la consulta
        $data['imagen_anuncio'] = $imagenes[0]; // Tomando la primera imagen como imagen principal
        unset($data['imagenes']); // Eliminar la clave 'imagenes' para evitar conflictos

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
    } else {
        // Si no se cargó ninguna imagen, manejarlo según tus necesidades
        $response = ['status' => 'error', 'message' => 'No se han proporcionado archivos de imagen válidos'];
        jsonResponse($response, 400);
    }
}

function getComercio($dbh, $id){
    $data = array('id' => $id);

    $stmt = $dbh->prepare("SELECT DISTINCT id_comercio FROM anuncios WHERE id_comerciante = :id");
    $stmt->execute($data);
    $id_comercio = $stmt->fetchColumn();

    return $id_comercio;
}
// Dentro de tu función insertarRutaImagen
function insertarRutaImagen($dbh, $data)
{
    $stmt = $dbh->prepare("INSERT INTO imagenes_anuncios (id_anuncio, ruta_imagen) 
        VALUES (:id_anuncio, :ruta_imagen)");
    $stmt->execute($data);
    close();
}

function actualizarAnuncio($dbh, $data)
{

    $stmt = $dbh->prepare("UPDATE anuncios SET titulo = :titulo, precio = :precio, categoria = :categoria, descripcion = :descripcion, id_categoria = :id_categoria, fecha_creacion = :fecha, id_comerciante = :anunciante, id_comercio = :comercio WHERE id = :id");
    $stmt->execute($data);
    close();
}


function getImagenesId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM imagenes_anuncios WHERE id_anuncio = (:id)");
    $stmt->execute($data);
    return $imagenes = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
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

    $stmt = $dbh->prepare("DELETE FROM anuncios");
    $stmt->execute();
    close();
}
