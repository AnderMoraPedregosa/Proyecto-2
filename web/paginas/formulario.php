<?php require "partials/head.php" ?>

    <div class="center">
        <section id="content">

            <h1 class="subheader">Formulario</h1>

            <form class="form_anuncios" id=crearAnuncio action="../../servidor/bbdd/anunciosCRUD.php" method="get">
                    <label for="titulo">Titulo</label>
                    <input type="text" id="titulo" name="titulo" />

                    <label for="precio">Precio</label>
                    <input type="number" id="precio" name="precio" step="0.01" />

                    <label for="desc">Descripcion</label>
                    <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>

                    <label for="selectCategorias" name="selectCategorias">Categoria:</label>
                    <select id="selectCategorias">
                        <option value="0">--Selecciona--</option>

                    </select>
                    <input type="hidden" name="accion" value="insertarAnuncio">


                <div class="clearfix"></div>

                <input type="button" value="Enviar" class="btn btn-success" />

            </form>

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


    <?php require "partials/footer.php" ?>
