<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>article</title>
  
</head>
<body>
   
    <div class="center-anuncio">
      
        <?php require "partials/head.php"; ?>
        <div class="centradoAnuncioDetalle">
        <script type="module" src="../../scripts/categoria.js"></script>

        <div class="articulos">
            <div id="content-detail">
                <script type="module" src="../../scripts/anuncioDetalle.js"></script>
            </div>
        </div>

        <div id="editarAnuncio">
            <?php require "paginas/crearEditarAnuncio.php" ?>
        </div>
        </div>
    </div>

    
    <?php require "partials/footer.php" ?>
</body>
</html>
