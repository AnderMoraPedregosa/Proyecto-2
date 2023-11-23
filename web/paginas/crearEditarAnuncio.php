<form class="form_anuncios" enctype="multipart/form-data">
    <label for="titulo">Titulo</label>
    <input type="text" id="titulo" name="titulo"  />

    <input type="hidden" id="id" name="id_anuncio" value="<?= $path_parts[2] ?>" />

    <label for="precio">Precio</label>
    <input type="number" id="precio" name="precio" step="0.01" />

    <label for="desc">Descripcion</label>
    <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>
    <label for="imagen">Imagen del anuncio:</label>
            <input type="file" id="imagen" name="imagenes_adicionales[]" multiple />
    <label for="selectCategorias">Categoria:</label>
    <select id="selectCategorias" name="selectCategorias">
    </select>

    <input type="submit" name="formAnuncios" value="Crear" id="btnCrearAnuncio" class="btn btn-success" />
</form>

<div class="clearfix"></div>