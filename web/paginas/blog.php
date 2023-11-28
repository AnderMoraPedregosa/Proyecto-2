<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Comercio Vitoria</title>
</head>
<body>
<?php require "partials/head.php" ?>

<div id="slider" class="slider-small">
    <h1 id="tituloBlogs"></h1>
    <h2 id="sliderDesc">Aquí encontrarás informacion acerca de los comercios o noticias nuevas que nos quieran transmitir! Estate un rato y averiguarás cosas que probablemente no sabias!</h2>
    <div class="wave"></div>
</div>
<div class="center">
<div id="crearBlog" style="display: none;">
    <button id="btnMostrarFormBlog" style="display: none;">Crear Blog</button>
    
</div>
<div class="center-blog">
    <section id="content-blog">
        <script type="module" src="scripts/blogs.js"></script>
    </section>
    <button id="cargarMasBtnBlog">Cargar más</button>
</div>

<aside id="sidebar">
    <div id="nav-blog" class="sidebar-item">
        <h3>Crea un blog</h3>
        <a href="/formulario/blog" class="btn btn-success" id="btnCrearBlogAside">Crear blog</a>
    </div>
</aside>


</div>

<?php require "partials/footer.php" ?>
</body>
</html>