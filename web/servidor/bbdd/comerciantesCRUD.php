<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);



function getComerciantes($dbh)
{
    try {
        $stmt = $dbh->prepare("SELECT * FROM comerciantes");
        $stmt->execute();

        // Obtener resultados directamente sin necesidad de almacenar en una variable intermedia
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Manejar la excepción según tus necesidades (log, mostrar mensaje de error, etc.)
        echo "Error al obtener blogs: " . $e->getMessage();
        return false;
    }
}

//solo anuncios por id
function getComercianteIdPersona($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM comerciantes WHERE id_persona= (:id)");
    $stmt->execute($data);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
// Dentro de tu función insertarAnuncio
function insertarBlog($dbh, $data)
{

    if (!empty($data['imagenes'])) {
        $imagenes = $data['imagenes'];

        // Insertar el anuncio en la tabla 'anuncios'
        $stmt = $dbh->prepare("INSERT INTO blogs (titulo, texto,  fecha_creacion, id_comerciante, id_comercio, imagen_blog) 
            VALUES (:titulo, :texto,  :fecha, :comercio, :anunciante, :imagen_blog)");

        // Ajustar el array $data para que coincida con los nombres de marcadores de posición en la consulta
        $data['imagen_blog'] = $imagenes[0]; // Tomando la primera imagen como imagen principal
        unset($data['imagenes']); // Eliminar la clave 'imagenes' para evitar conflictos

        $stmt->execute($data);
    } else {
        // Si no se cargó ninguna imagen, manejarlo según tus necesidades
        $response = ['status' => 'error', 'message' => 'No se han proporcionado archivos de imagen válidos'];
        jsonResponse($response, 400);
    }
}



function actualizarBlog($dbh, $data)
{

    $stmt = $dbh->prepare("UPDATE blogs SET titulo = :titulo, texto = :texto,  fecha_creacion = :fecha, id_comerciante = :anunciante, id_comercio = :comercio WHERE id = :id");
    $stmt->execute($data);
    close();
}



function eliminarId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("DELETE FROM blogs WHERE id =(:id)");
    $stmt->execute($data);
    close();
}
//borar todos los anuncios
function eliminar($dbh)
{
    $stmt = $dbh->prepare("DELETE FROM blogs");
    $stmt->execute();
    close();
}
