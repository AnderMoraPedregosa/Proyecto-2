    <?php require "paginas/partials/head.php" ?>

    <div id="slider" class="slider-big">
        <h1>Bienvenido a la pagina de productos de la Asociación de Comerciantes de Vitoria</h1>
      
    </div>

    <div class="center">
        <section id="content">
            <h2 class="subheader">Últimos productos</h2>

            <script>
                window.addEventListener("load", function () {
                    var template = document.getElementById("article-template");
                    var articles = document.getElementById("articles");

                    for (var i = 1; i <= 5; i++) {
                        var clonado = template.cloneNode(true);
                        clonado.removeAttribute("id");

                        var h2 = clonado.getElementsByTagName("h2")[0];
                        h2.innerHTML = h2.textContent + ' ' + i;

                        articles.appendChild(clonado);
                    }
                    
                });
            </script>
            <script src="scripts/anuncios.js"></script>

            <!--Listado articulos-->
            <div id="articles">
                
                <!--AÑADIR ARTICULOS VIA JS-->

            </div>

        </section>

        <aside id="sidebar">
            <div id="nav-blog" class="sidebar-item">
                <h3>Puedes hacer esto</h3>
                <a href="#" class="btn btn-success">Crear producto</a>
                <a href="../paginas/blog.php" class="btn-white">Ir al blog</a>
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

    <?php require "paginas/partials/footer.php" ?>
