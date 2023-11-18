<?php require "partials/head.php"; ?>

<script type="module" src="../../scripts/categoria.js"></script>

<div id="prueba">
    <div class="center">
        <div class="articulos">
            <div id="content">
                <script type="module" src="../../scripts/anuncioDetalle.js"></script>
            </div>
        </div>

        <div id="editarAnuncio">
            <?php require "partials/crearEditarAnuncio.php" ?>
        </div>
        
        <aside id="sidebar">
            <div id="nav-blog" class="sidebar-item">
                <h3>Puedes hacer esto</h3>
                <a href="#" class="btn btn-success">Crear artículo</a>
            </div>

            <div id="search" class="sidebar-item">
                <h3>Buscador</h3>
                <p>Encuentra el artículo que buscas</p>
                <form>
                    <input type="text" name="search" />
                    <input type="submit" name="submit" value="Buscar" class="btn" />
                </form>
            </div>
        </aside>
    </div>
</div>

<?php require "partials/footer.php" ?>
