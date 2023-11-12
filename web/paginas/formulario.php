<?php require "partials/head.php" ?>

    <div class="center">
        <section id="content">

            <h1 class="subheader">Formulario</h1>

            <form class="mid-form">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" />
                </div>

                <div class="form-group">
                    <label for="apellidos">Apellidos</label>
                    <input type="text" id="apellidos" name="apellidos" />
                </div>

                <div class="form-group">
                    <label for="bio">Biografia</label>
                    <textarea id="bio" name="bio"></textarea>
                </div>

                <div class="form-group radibuttons">
                    <input type="radio" name="genero" value="hombre" /> Hombre
                    <input type="radio" name="genero" value="mujer" /> Mujer
                    <input type="radio" name="genero" value="otro" /> Otro
                </div>

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

    <?php require "partials/footer.php" ?>
