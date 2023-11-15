<?php

$path = isset($_GET['accion']) ? $_GET['accion'] : '';

switch ($path) {
    case 'anuncios':
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'detalles':
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'categorias':
        require './servidor/servicios/anuncios/servicioCategorias.php';
        break;
    case 'insertar':
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    default:
        // Página principal o manejo de rutas no encontradas
        require "./paginas/index.view.php";
        break;
}
