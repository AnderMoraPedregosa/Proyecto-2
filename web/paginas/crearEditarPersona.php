<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio Vitoria</title>

</head>

<body>
    <form class="formCrearPersona">
        <h1>Crear Cuenta</h1>
        <span>o utiliza tu correo electrónico para registrarte</span>
        <label for="dni">DNI</label>
        <input type="text" id="dni" name="dni" required="required" />
        <label for="nombre">Nombre</label>
        <input  type="text" id="nombre" name="nombre" required="required" />
        <label  style="display: none"  for="apellido" id="labelApellido">Apellido</label>
        <input  style="display: none" type="text" id="apellidoIn" name="apellido" required="required" />
        <label  style="display: none" for="telefono" id="labelTelefono">Telefono</label>
        <input style="display: none" type="tel" id="telefonoIn" name="telefono" required="required" />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required="required" />
        <label for="passwd">Contraseña</label>
        <input type="password" id="passwd" name="passwd" required="required" />
        <label>Rol</label>
        <div id="id_rol">
            <input type="radio" id="cliente" name="id_rol" value="2"  />
            <label for="cliente">Cliente</label>

            <input type="radio" id="comerciante" name="id_rol" value="3"  />
            <label for="comerciante">Comerciante</label>

            <input type="radio" id="admin" name="id_rol" value="1" checked/>
            <label for="admin">Admin</label>
        </div>
        <select id="selectComercios" style="display: none;">

        </select>

        <input type="button" name="crearPersona" value="Crear" id="btnCrearPersona" class="pruebaPersona " />

    </form>
   <!--  <form  class="formCrearPersona">
        <label for="dni">DNI</label>
        <input type="text" id="dni" name="dni" required="required" />

        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required="required" />

        <label for="passwd">Contraseña</label>
        <input type="password" id="passwd" name="passwd" required="required" />

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required="required" />

        <label>Rol</label>
        <div id="id_rol">
            <input type="radio" id="cliente" name="id_rol" value="2" />
            <label for="cliente">Cliente</label>

            <input type="radio" id="comerciante" name="id_rol" value="3" />
            <label for="comerciante">Comerciante</label>

            <input type="radio" id="admin" name="id_rol" value="1" />
            <label for="admin">Admin</label>
        </div>
        <select id="selectComercios" style="display: none;">

        </select>

        <input type="button" name="crearPersona" value="Crear" id="btnCrearPersona" class="pruebaPersona " />

    </form> -->

</body>

</html>