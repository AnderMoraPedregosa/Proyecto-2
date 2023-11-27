<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/login.css">
    <title>Login</title>
</head>

<body>

    <div class="contenedor" id="contenedor">

        <div class="contenedor-formulario registro">
            <a href="/"> <button id="btnVolver">Volver</button></a>
            <form id="formReg" method="post">
                <h1>Crear Cuenta</h1>
                <span>o utiliza tu correo electrónico para registrarte</span>
                <input type="text" placeholder="Nombre" id="nombreUsuario" name="nombreUsuario">
                <input type="text" placeholder="Apellido" id="apellidoUsuario" name="apellidoUsuario">
                <input type="tel" placeholder="Telefono" id="telefonoUsuario" name="telefonoUsuario">
                <input type="text" placeholder="Dni" id="dniUsuario" name="dniUsuario">
                <input type="email" placeholder="Correo Electrónico" id="emailUsuario" name="emailUsuario">
                <input type="password" placeholder="Contraseña" id="contrasenaUsuario" name="passwd">

                <button id="btnRegistro">Registrarse</button>
            </form>
        </div>
        <div class="contenedor-formulario inicio-sesion">
            <a href="/"> <button id="btnVolver">Volver</button></a>
            <form id="formLogin" method="post">
                <h1>Iniciar Sesión</h1>
                <div class="iconos-sociales">
                    <a href="#" class="icono"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icono"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#" class="icono"><i class="fa-brands fa-github"></i></a>
                    <a href="#" class="icono"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>o utiliza tu correo electrónico y contraseña</span>
                <input type="email" id="emailUsuarioLogin" name="emailUsuarioLogin">
                <input type="password" placeholder="Contraseña" id="passwd" name="passwd">
                <a href="#">¿Olvidaste tu Contraseña?</a>
                <button id="btnLogin">Iniciar Sesión</button>
            </form>
        </div>
        <div class="contenedor-botones-toggle">
            <div class="boton-toggle">
                <div class="panel-toggle panel-izquierdo">
                    <h1>¡Bienvenido de Nuevo!</h1>
                    <p>Ingresa tus detalles personales para usar todas las características del sitio</p>
                    <button class="oculto" id="iniciar-sesion">Iniciar Sesión</button>
                </div>
                <div class="panel-toggle panel-derecho">
                    <h1>¡Hola, Amigo!</h1>
                    <p>Regístrate con tus detalles personales para usar todas las características del sitio</p>
                    <button class="oculto" id="registrarse">Registrarse</button>
                </div>
            </div>
        </div>
    </div>

    <script type="module" src="../scripts/login.js"></script>
</body>

</html>