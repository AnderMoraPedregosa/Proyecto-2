<form class="form_anuncios" enctype="multipart/form-data" id="formAnuncio">
    <label for="titulo">Titulo</label>
    <input type="text" id="tituloAnuncio" name="titulo" />
    <input type="hidden" id="id" name="id_anuncio" value="<?= $path_parts[2] ?>" />
    <label for="precio">Precio</label>
    <input type="number" id="precio" name="precio" step="0.01" />
    <label for="desc">Descripcion</label>
    <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>
    <label id="labelFile" for="imagen" class="custom-file-upload">
        Imagenes del anuncio
    </label>
    <div id="image-preview"></div>
    <input type="file" id="imagen" name="imagenes_adicionales[]" multiple onchange="showPreview(this)" />
    <label for="selectCategorias">Categoria:</label>
    <select id="selectCategorias" name="selectCategorias">
    </select>
    <input type="submit" name="formAnuncios" value="Crear" id="btnCrearAnuncio" class="btn btn-success" />
</form>
<div class="clearfix"></div>
<script src="../scripts/formPreview.js"></script>