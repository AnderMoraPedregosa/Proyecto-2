<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);


function getBlogSearch($dbh, $palabra)
{
    try {
        $data = array('palabra' => '%' . $palabra . '%');
        $stmt = $dbh->prepare("SELECT * FROM blogs WHERE titulo LIKE :palabra");

        $stmt->execute($data);

        // Manejar el caso en que no hay coincidencias
        $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($blogs)) {
            // Puedes devolver un valor específico, lanzar una excepción, o manejarlo de otra manera.
            return false;
        }

        // Cerrar la conexión
        $stmt->closeCursor();

        return $blogs;
    } catch (PDOException $e) {
        // Manejar la excepción según tus necesidades (log, mostrar mensaje de error, etc.)
        echo "Error: " . $e->getMessage();
        return false;
    }
}

function getBlogs($dbh)
{
    try {
        $stmt = $dbh->prepare("SELECT * FROM blogs ORDER BY fecha_creacion desc");
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
function getBlogId($dbh, $id)
{
    $data = array('id' => $id);
    $stmt = $dbh->prepare("SELECT * FROM blog WHERE id= (:id)");
    $stmt->execute($data);
    close();

    return $blog = $stmt->fetchAll(PDO::FETCH_ASSOC);
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
