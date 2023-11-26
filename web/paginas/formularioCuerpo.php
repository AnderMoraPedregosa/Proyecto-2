<?php require "partials/head.php" ?>

<div class="center">
    <section id="content-Formulario">

        <h1 class="subheader" id="formTitulo"></h1>

        <?php include "paginas/crearEditarAnuncio.php" ?>
        <?php include "paginas/crearEditarBlog.php" ?>

        <div class="clearfix"></div>


    </section>

    <aside id="sidebar">
        <div id="nav-blog" class="sidebar-item">
            <h3>Puedes hacer esto</h3>
            <a href="/formulario/anuncio" class="btn " id="btnCrearProductoAside" style="display: none;">Crear anuncio</a>
            <a href="/formulario/blog" class="btn btn-success" id="btnCrearBlogAside" style="display: none;">Crear blog</a>
        </div>
    </aside>
</div>


<div class="clearfix"></div>
</div>
<script type="module" src="../../scripts/categoria.js"></script>
<script type="module" src="../../scripts/validacion.js"></script>



<?php require "partials/footer.php" ?>