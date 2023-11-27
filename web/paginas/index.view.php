<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio Vitoria</title>
  
</head>
<body>
<?php require "paginas/partials/head.php" ?>

<div class="container">

    <div id="slider" class="slider-big">

        <h1>Bienvenido a la pagina de productos de la Asociación de Comerciantes de Vitoria</h1>
        <div class="wave"></div>

    </div>

    <div class="center">
        <section id="content">

            <h2 id="tituloAnuncios" class="subheader">Últimos productos
                <img src="../../assets/images/new.png" class="new" alt="newp" />
            </h2>
            <div id="articles">

                <script type="module" src="scripts/anuncios.js"></script>

            </div>

        </section>

        <aside id="sidebar">
        <div id="search" class="sidebar-item">
                <h3>Buscador</h3>
                <p>Encuentra el producto que buscas</p>
                <form action="/anuncios/search/" id="search-form">
                    <input type="text" id="search-input" name="search"  />
                    <input type="submit" name="submit" value="Buscar" class="btn" />
                </form>
                <form>
                <label></label>
                <select id="selectCategorias">
                    <option id="opt1" value="0">Todas</option>
                </select>
            </form>
            </div>

            <div id="nav-blog" class="sidebar-item">
                <h3 id="sidebarTitle"></h3>
                <a href="/formulario/anuncio" class="btn " id="btnCrearProductoAside" style="display: none;">Crear anuncio</a>
                <a href="/formulario/blog" class="btn btn-success" id="btnCrearBlogAside" style="display: none;">Crear blog</a>

                <a href="/blog" class="btn-white" id="btnBlog">Ir al blog</a>
            </div>
        </aside>

        <div class="clearfix"></div>

        <button id="cargarMasBtn">Cargar más</button>
    </div>
</div>
<script src="../scripts/index.js"></script>
<script type="module" src="../scripts/categoria.js"></script>


<?php require "paginas/partials/footer.php" ?>
</body>
</html>
