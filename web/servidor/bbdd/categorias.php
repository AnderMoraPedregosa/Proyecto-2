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
