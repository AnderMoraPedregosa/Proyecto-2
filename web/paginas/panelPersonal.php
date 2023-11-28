<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio Vitoria</title>
  
</head>
<body>
   
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
        <a href="/perfilAnuncios" >Gestionar</a>
      </div>
    </div>
  </div>
  <!--administracion admin -->
  <div class="carta" id="cartaAdmin">
    <div class="face face1">
      <div class="content">
        <i class="fa-solid fa-blog"></i>
        <h3>Panel de administracion</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content-panel">
        <p>Gestionar usuarios/categorias/comercios</p>
        <a href="/crudPersonas" >Gestionar</a>
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
        <a href="/perfilBlogs" >Gestionar</a>
      </div>
    </div>
  </div>


  <div class="carta" id="cartaFavoritos">
    <div class="face face1">
      <div class="content">
      <i class="fa-solid fa-heart"></i>
      <h3>Anuncios Favoritos</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content-panel">
        <p>Ver mis anuncios favoritos</p>
        <a href="/anunciosFavoritos" >Gestionar</a>
      </div>
    </div>
  </div>
  <!--
  <div class="carta" >
    <div class="face face1">
      <div class="content">
        <i class="fa-solid fa-id-card-clip"></i>
        <h3>Perfil</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content-panel">
        <p> Gestionar Mi perfil</p>
        <a href="#" >Gestionar</a>
      </div>
    </div>
  </div>
-->





</div>
<script src="../scripts/perfil.js"></script>
<?php require "paginas/partials/footer.php" ?>
</body>
</html>