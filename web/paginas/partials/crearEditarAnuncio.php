<form class="form_anuncios" id=crearAnuncio action="/modificar" method="post">
    <label for="titulo">Titulo</label>
    <input type="text" id="titulo" name="titulo" required="require" />

    <label for="precio">Precio</label>
    <input type="number" id="precio" name="precio" step="0.01" />

    <label for="desc">Descripcion</label>
    <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>
    <input type="hidden" name="id_anuncio" id="id_anuncio" value="<?php echo isset($_GET['id']) ? $_GET['id'] : ''; ?>">



    <label for="selectCategorias">Categoria:</label>
    <select id="selectCategorias" name="selectCategorias">
        <option value="0">--Selecciona--</option>

    </select>
    <input type="submit" name="formAnuncios" value="Crear" id="btnCrearAnuncio" class="btn btn-success" />
</form>

<div class="clearfix"></div>