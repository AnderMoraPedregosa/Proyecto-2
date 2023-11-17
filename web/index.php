<?php
// Obtener la ruta desde la URL
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($request_uri, '/');

// Reemplazar '/Proyecto2/web' con la ruta base de tu aplicación
$base_path = '/Proyecto2/web';
// Obtener la ruta relativa
$relative_path = str_replace($base_path, '', $path);

// Dividir la ruta en partes
$path_parts = explode('/', trim($relative_path, '/'));

// Obtener la acción y el posible ID
$accion = isset($path_parts[0]) ? $path_parts[0] : '';
$id = isset($path_parts[1]) ? $path_parts[1] : '';

// Manejar las rutas
switch ($accion) {
    case 'ver':
        // Lógica para mostrar anuncios
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'detalles':
        // Lógica para mostrar detalles de un anuncio
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'categorias':
        require './servidor/servicios/anuncios/servicioCategorias.php';
        break;
    case 'insertar':
        // Lógica para categorías o inserción de anuncios
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'actualizar':
        // Lógica para categorías o inserción de anuncios
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'login':
        // Lógica para el inicio de sesión
        require './servidor/servicios/login/servicioLogin.php';
        break;
    case 'registrar':
        // Lógica para el registro
        require './servidor/servicios/login/servicioRegistrar.php';
        break;
    case '':
    case 'index':
        // Lógica para la página de inicio
        require './paginas/index.view.php';
        break;
    case 'blog':
        // Lógica para la página de blog
        require './paginas/blog.php';
        break;
    case 'formulario':
        // Lógica para el formulario
        require './paginas/formulario.php';
        break;
    case 'anuncioDetalle':
        // Lógica para mostrar el detalle de un anuncio
        require './paginas/article.php';
        break;

    default:
        // Manejo de rutas no encontradas
        require "./paginas/error-404.php";
        break;
}



/* 
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
    case 'login' :
        require './servidor/servicios/login/servicioLogin.php';
        break;
    case 'registrar':
        require './servidor/servicios/login/servicioRegistrar.php';
        break;
    default:
        // Página principal o manejo de rutas no encontradas
        require "./paginas/index.view.php";
        break;
} */
