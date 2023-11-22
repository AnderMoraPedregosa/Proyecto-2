<form class="form_anuncios" id="crearAnuncio" action="/anuncios/actualizar" method="post">
    <label for="titulo">Titulo</label>
    <input type="text" id="titulo" name="titulo" required="require" />

    <input type="hidden" id="id" name="id_anuncio" value="<?= $path_parts[2] ?>" />

    <label for="precio">Precio</label>
    <input type="number" id="precio" name="precio" step="0.01" />

    <label for="desc">Descripcion</label>
    <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>

    <label for="selectCategorias">Categoria:</label>
    <select id="selectCategorias" name="selectCategorias">
        <option value="0">--Selecciona--</option>
    </select>

    <input type="submit" name="formAnuncios" value="Actualizar" id="btnCrearAnuncio" class="btn btn-success" />
</form>

<div class="clearfix"></div>