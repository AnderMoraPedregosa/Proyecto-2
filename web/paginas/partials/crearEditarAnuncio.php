<form class="form_anuncios" id=crearAnuncio action="../index.php?accion=insertar" method="post">
            <label for="titulo">Titulo</label>
            <input type="text" id="titulo" name="titulo" required="require" />

            <label for="precio">Precio</label>
            <input type="number" id="precio" name="precio" step="0.01" />

            <label for="desc">Descripcion</label>
            <textarea id="desc" name="desc" placeholder="Introduce la descripcion de tu anuncio"></textarea>

            <label for="selectCategorias">Categoria:</label>
            <select id="selectCategorias" name="selectCategorias">
                <option value="0">--Selecciona--</option>

            </select>
            <input type="submit" name="formAnuncios" value="Crear" id="btnCrearAnuncio" class="btn btn-success" />
            <input type="submit" name="formAnuncios" value="editarAnuncio" id="btnModificarAnuncio" class="btn btn-success" />

        </form>

        <div class="clearfix"></div>