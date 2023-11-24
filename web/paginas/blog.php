<?php require "partials/head.php" ?>

<div id="slider" class="slider-small">
<h1 id="tituloBlogs"></h1>
    <h2>Aquí encontrarás informacion acerca de los comercios o noticias nuevas que nos quieran transmitir! Estate un rato y averiguarás cosas que probablemente no sabias!</h2>
    <div class="wave"></div>
</div>
<div id="crearBlog" style="display: none;">
<button id="btnMostrarFormBlog">Crear Blog</button>
<div id="formCrearBlog" style="display: none;">
    <form>
    <label for="tituloBlog">Título:</label>
    <input type="text" id="tituloBlog" name="tituloBlog" required>

    <label for="imagenBlog">URL de la imagen:</label>
    <input type="file" id="imagenBlog" name="imagenBlog">

    <label for="textoBlog">Texto del blog:</label>
    <textarea id="textoBlog" name="textoBlog" rows="4" required></textarea>

    <button type="button" id="btnCrearBlog">Crear Blog</button>
    </form>
</div>
</div>
<div class="center">
    <section id="content-blog">

       
            <script type="module" src="scripts/blogs.js"></script>
        
            
                
    </section>
    <button id="cargarMasBtnBlog">Cargar más</button>
</div>

<?php require "partials/footer.php" ?>