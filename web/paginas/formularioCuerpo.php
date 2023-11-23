<?php require "partials/head.php" ?>

<div class="center">
    <section id="content">

        <h1 class="subheader">Formulario</h1>

       <?php include "paginas/crearEditarAnuncio.php"?>

        <div class="clearfix"></div>


    </section>

    <aside id="sidebar">
        <div id="nav-blog" class="sidebar-item">
            <h3>Puedes hacer esto</h3>
            <a href="#" class="btn btn-success">Crear producto</a>
        </div>

        <div id="search" class="sidebar-item">
            <h3>Buscador</h3>
            <p>Encuentra el producto que buscas</p>
            <form>
                <input type="text" name="search" />
                <input type="submit" name="submit" value="Buscar" class="btn" />
            </form>
        </div>
    </aside>

    <div class="clearfix"></div>
</div>
<script type="module" src="../../scripts/categoria.js"></script>
<script type="module" src="../../scripts/validacion.js"></script>



<?php require "partials/footer.php" ?>