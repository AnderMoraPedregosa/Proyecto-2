<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio Vitoria</title>
  
</head>
<body>
<?php require "partials/head.php" ?>

<h1>Panel de administracion</h1>
<div id="botonesCrud">
    <button id="btnUsuarios">Usuarios</button>
    <button id="btnCategorias">Categorias</button>
    <button id="btnComercios">Comercios</button>
</div>
<div id="crudPersonas">
    

</div>

<div id="crudCategorias">
    

</div>

<div id="crudComercios">
    

</div>

<div id="myModal" class="modal-personas">
    <div class="modal-content-personas">
    <button id="closeModalBtn" class="close-button">&times;</button>
        <div id="modalContent"></div>
    </div>
</div>


<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

<script type="module" src="../../scripts/personas.js"></script>


<?php require "partials/footer.php" ?>
</body>
</html>