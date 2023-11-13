<?php
require "servidor/bbdd/categorias.php";

$accion = isset($_GET['accion']) ? $_GET['accion'] : '';

// Permitir el acceso desde cualquier origen (CORS)
header('Access-Control-Allow-Origin: *');

// Convertimos la respuesta a JSON
function jsonResponse($data)
{
    header('Content-Type: application/json');
    echo json_encode($data);
}

// Obtener todos los anuncios

$categorias = getCategorias($dbh);
jsonResponse($categorias);

