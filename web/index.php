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
$path = isset($path_parts[0]) ? $path_parts[0] : '';
$accion = isset($path_parts[1]) ? $path_parts[1] : '';
$id = isset($path_parts[2]) ? $path_parts[2] : '';
$palabra = isset($path_parts[3]) ? $path_parts[3] : '';



// Manejar las rutas
switch ($path) {
    case 'comerciantes':
        // Lógica para mostrar anuncios
        require './servidor/servicios/comerciantes/servicioComerciantes.php';
        break;
    case 'anuncios':

        // Lógica para mostrar anuncios
        require './servidor/servicios/anuncios/servicioAnuncios.php';
        break;
    case 'blogs':
        // Lógica para mostrar anuncios
        require './servidor/servicios/blogs/serviciosBlogs.php';
        break;
    case 'categorias':
        require './servidor/servicios/categorias/servicioCategorias.php';
        break;

    case 'loginService':
        // Lógica para el inicio de sesión
        require './servidor/servicios/login/servicioLogin.php';
        break;
    case 'registrar':
        // Lógica para el registro
        require './servidor/servicios/login/servicioRegistrar.php';
        break;
    case '':
        // Lógica para la página de inicio
        require './paginas/index.view.php';
        break;
    case 'blog':
        // Lógica para la página de blog
        require './paginas/blog.php';
        break;
    case 'formulario':
        // Lógica para el formulario
        require './paginas/formularioCuerpo.php';
        break;
    case 'anuncioDetalle':
        // Lógica para mostrar el detalle de un anuncio
        require './paginas/article.php';
        break;
    case 'login':
        require './paginas/login.html';
        break;
    case "personas":
        require './servidor/servicios/personas/servicioPersonas.php';
        break;
    case "crudPersonas":
        require './paginas/personas.php';
        break;
    case "perfil":
        require './paginas/perfil2.php';
        break;
    case "perfilAnuncios":
        require './paginas/index.view.php';

        break;
    case "perfilBlogs":
        require './paginas/blog.php';
        break;
    case "confPerfil":
        require './paginas/confPerfil.php';
        break;
    case "comercios":
        require './servidor/servicios/comercios/servicioComercios.php';

        break;
    default:
        // Manejo de rutas no encontradas
        require "./paginas/error-404.php";
        break;
}
