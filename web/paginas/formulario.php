<?php require "partials/head.php" ?>

    <div class="center">
        <section id="content">

            <h1 class="subheader">Formulario</h1>

            <form class="form_anuncios">
                    <label for="titulo">Titulo</label>
                    <input type="text" id="titulo" name="titulo" />

                    <label for="precio">Precio</label>
                    <input type="number" id="precio" name="precio" />

                    <label for="desc">Descripcion</label>
                    <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>

                    <label for="selectCategorias">Categoria:</label>
                    <select id="selectCategorias">
                        <option value="0">--Selecciona--</option>

                    </select>

                <div class="clearfix"></div>

                <input type="submit" value="Enviar" class="btn btn-success" />

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
