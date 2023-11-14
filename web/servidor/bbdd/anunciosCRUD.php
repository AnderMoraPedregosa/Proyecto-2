<?php

require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

if (isset($_GET['accion'])) {
    $accion = $_GET['accion'];

    // Ejecutar la función correspondiente según la acción
    switch ($accion) {
        case 'insertarAnuncio':
            // Asegúrate de tener los datos necesarios para insertar un anuncio
            $idCategoria = isset($_GET['selectCategorias']) ? $_GET['selectCategorias'] : null;

            $data = [
                'titulo' => isset($_GET['titulo']) ? $_GET['titulo'] : '',
                'precio' => isset($_GET['precio']) ? $_GET['precio'] : '',
                'descripcion' => isset($_GET['desc']) ? $_GET['desc'] : '',
                'categoria' => $idCategoria
            ];

            insertarAnuncio($dbh, $data);
            break;
        case 'anuncios':
            
            break;
    }
}

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
    print_r("estoy en el insert");
    $stmt = $dbh->prepare("INSERT INTO anuncios (titulo, precio, descripcion, id_categorias) VALUES (:titulo, :precio, :descripcion, :categoria)");
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
