<?php require "partials/head.php" ?>

<div id="slider" class="slider-small">
<h1 id="tituloBlogs"></h1>
    <h2>Aquí encontrarás informacion acerca de los comercios o noticias nuevas que nos quieran transmitir! Estate un rato y averiguarás cosas que probablemente no sabias!</h2>
    <div class="wave"></div>
</div>
<div id="crearBlog" style="display: none;">
<button id="btnMostrarFormBlog">Crear Blog</button>
<div id="formCrearBlog" style="display: none;">
   
</div>
</div>
<div class="center-blog">
    <section id="content-blog">    
            <script type="module" src="scripts/blogs.js"></script>                 
    </section>
    <button id="cargarMasBtnBlog">Cargar más</button>
</div>

<?php require "partials/footer.php" ?>