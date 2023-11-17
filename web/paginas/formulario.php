<?php require "partials/head.php" ?>

<div class="center">
    <section id="content">

        <h1 class="subheader">Formulario</h1>

        <form class="form_anuncios" id=crearAnuncio action="../index.php?accion=insertar" method="post" enctype="multipart/form-data">
            <label for="titulo">Titulo</label>
            <input type="text" id="titulo" name="titulo" required="require" />

            <label for="precio">Precio</label>
            <input type="number" id="precio" name="precio" step="0.01" />

            <label for="desc">Descripcion</label>
            <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>

            <label for="imagen">Imagen del anuncio:</label>
            <input type="file" id="imagen" name="imagenes_adicionales[]" multiple />

            <label for="selectCategorias">Categoria:</label>
            <select id="selectCategorias" name="selectCategorias">
                <option value="0">--Selecciona--</option>

            </select>
            <input type="submit" value="Crear Anuncio" id="btnCrearAnuncio" class="btn btn-success" />

        </form>

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
<script src="../../scripts/validacion.js"></script>



<?php require "partials/footer.php" ?>