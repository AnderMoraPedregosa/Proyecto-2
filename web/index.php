<?php

$path = isset($_GET['accion'])? $_GET['accion'] : '';

switch ($path) {
    case 'anuncios':
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'blog':
        require "";
        break;
    default:
        // Página principal o manejo de rutas no encontradas
        require "./paginas/index.view.php";
        break;
}
