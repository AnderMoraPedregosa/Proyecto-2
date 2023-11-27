<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio Vitoria</title>
  
</head>
<body>
<form class="form_blogs" enctype="multipart/form-data" id="formBlog">
    <label for="tituloBlog">Título:</label>
    <input type="text" id="tituloBlog" name="tituloBlog" required>
    <label for="imagenBlog">Imagen del blog:</label>
    <label for="imagenBlog" class="custom-file-upload">
        Seleccionar Imagen
    </label>
    <div id="image-preview-blog"></div>
    <input type="file" id="imagenBlog" name="imagen_blog" onchange="showPreviewBlog(this)" />
    <label for="textoBlog">Texto del blog:</label>
    <textarea id="textoBlog" name="textoBlog" rows="4" required></textarea>
    <input type="submit" name="formAnuncios" value="Crear" id="btnCrearBlog" class="btn btn-success" />
</form>
<div class="clearfix"></div>
<script src="../scripts/formPreview.js"></script>
</body>
</html>
