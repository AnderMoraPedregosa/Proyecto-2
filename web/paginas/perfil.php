<?php require "paginas/partials/head.php" ?>

<div class="container">

    <div id="slider" class="slider-big">

        <h1>Bienvenido a la pagina de productos de la Asociación de Comerciantes de Vitoria</h1>
        <div class="wave"></div>

    </div>

    <div id="productosComercio">
    <div class="centerPerfil">
        <section id="content">
            <h2 class="subheader">Mis productos
            </h2>
            <div id="articles">

                <script type="module" src="scripts/perfil.js"></script>

            </div>

        </section>
    </div>

        <aside id="sidebar">
            <div id="nav-blog" class="sidebar-item">
                <h3>Puedes hacer esto</h3>
                <a href="/formulario" class="btn btn-success" id="btnCrearProducto">Crear producto</a>
                <a href="/blog" class="btn-white" id="btnBlog">Ir al blog</a>
            </div>

            <div id="search" class="sidebar-item">
                <h3>Buscador</h3>
                <p>Encuentra el producto que buscas</p>
                <form action="/anuncios/search/" id="search-form">
                    <input type="text" id="search-input" name="search" />
                    <input type="submit" name="submit" value="Buscar" class="btn" />
                </form>
            </div>
        </aside>

        <div class="clearfix"></div>

        <button id="cargarMasBtn">Cargar más</button>
    </div>
</div>
<script src="../scripts/header.js"></script>
<?php require "paginas/partials/footer.php" ?>