<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio de Vitoria</title>

    <!--HOJA DE ESTILOS-->
    <link rel="stylesheet" type="text/css" href="../../assets/css/tarjetasPerfil.css" />

    <link rel="stylesheet" type="text/css" href="../../assets/css/styles.css" />

    <!--favicon-->
    <link rel="icon" type="image/png" href="../../assets/images/losJavasLogo.png">

    <!--iconos font awesome-->
    <script src="https://kit.fontawesome.com/2f23627a24.js" crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>


</head>

<body>
    <header id="header">
        <div class="center">
            <!-- LOGO -->
            <div id="logo">
                <a href="/"><img src="../../assets/images/logoAsociacion.png" class="app-logo" alt="Logotipo" /></a>

            </div>

            <!-- MENU -->
            <nav id="menu">
                <ul id="menuUl">
                    <li id="liInicio">
                        <a href="/" class="animacion">Inicio</a>
                    </li>
                    <li id="liBlog">
                        <a href="/blog" class="animacion">Blog</a>
                    </li>
                   
                    <li id="liUsuarios" class="crudUsuariosOculto">
                        <a href="/crudPersonas" class="animacion">Panel</a>
                    </li>
                    <li id="liPerfil"  style="display: none;">
                        <a href="/perfil" class="animacion">Perfil</a>
                    </li>
                 <!--    <li id="liConfiguracion">
                        <a href="/confPerfil" class="animacion"><i class="fa-solid fa-id-card confPerf"></i></a>
                    </li> -->
                    <li id="liIniciarSesion">
                        <button class="btn-sesion" id="btnLoginHead" onclick="location.href='/login'">Iniciar sesión</button>
                        <button class="btn-sesion" style="display: none;" id="btnLogOutHead" >Cerrar sesión</button>
                    </li>


                </ul>
            </nav>
            <script src="../../scripts/header.js"></script>
            <!--LIMPIAR FLOTADOS-->
            <div class="clearfix"></div>
        </div>
    </header>