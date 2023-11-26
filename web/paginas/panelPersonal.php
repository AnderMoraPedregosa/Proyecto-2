<?php require "paginas/partials/head.php" ?>

<div id="slider" class="slider-small">
    <h2 id="saludoPerfil"></h2>
    <div class="wave"></div>
</div>

<div class="containerTarjetas">
  <div class="carta prueba">
    <div class="face face1">
      <div class="content">
        <i class="fa-solid fa-rectangle-ad"></i>
        <h3>Mis Anuncios</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content-panel">
        <p>Gestionar mis anuncios</p>
        <a href="/perfilAnuncios" type="button">Gestionar</a>
      </div>
    </div>
  </div>

  <div class="carta prueba">
    <div class="face face1">
      <div class="content">
        <i class="fa-solid fa-blog"></i>
        <h3>Blog</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content-panel">
        <p> Gestionar mis blogs</p>
        <a href="/perfilBlogs" type="button">Gestionar</a>
      </div>
    </div>
  </div>


  <div class="carta">
    <div class="face face1">
      <div class="content">
      <i class="fa-solid fa-heart"></i>
      <h3>Anuncios Favoritos</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content-panel">
        <p>Ver mis anuncios favoritos</p>
        <a href="/anunciosFavoritos" type="button">Gestionar</a>
      </div>
    </div>
  </div>
  <div class="carta" style="display: 'none';">
    <div class="face face1">
      <div class="content">
        <i class="fa-solid fa-id-card-clip"></i>
        <h3>Perfil</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content-panel">
        <p> Gestionar Mi perfil</p>
        <a href="#" type="button">Gestionar</a>
      </div>
    </div>
  </div>






</div>
<script src="../scripts/perfil.js"></script>
<?php require "paginas/partials/footer.php" ?>