<?php

require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);
function getCategorias($dbh)
{
    $stmt = $dbh->prepare("SELECT * FROM categorias");
    $stmt->execute();
    $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $categorias;
}