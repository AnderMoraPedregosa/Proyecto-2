<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio Vitoria</title>
  
</head>
<body>
    <?php require "paginas/partials/head.php" ?>

<h1>Panel:</h1>
<div class="container-Panel">

<form class="confPerfil">
    <label for="dni">DNI</label>
    <input type="text" id="dni" name="dni" required="required" />

    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" required="required" />

    <label for="passwd">Contraseña</label>
    <input type="password" id="passwd" name="passwd" required="required" />

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required="required" />

    <label >Rol</label>
    <div id="id_rol">
        <input type="radio" id="cliente" name="id_rol" value="2" />
        <label for="cliente">Cliente</label>

        <input type="radio" id="comerciante" name="id_rol" value="3" />
        <label for="comerciante">Comerciante</label>

    </div>
    <input type="button" name="crearPersona" value="Crear" id="btnCrearPersona" class="pruebaPersona " />

</form>

</div>
<script src="../scripts/header.js"></script>
<?php require "paginas/partials/footer.php" ?>
</body>
</html>