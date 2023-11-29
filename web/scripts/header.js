let datosArray = JSON.parse(sessionStorage.getItem('user'));
let btnLoginHead = document.getElementById("btnLoginHead");
let btnLogOutHead = document.getElementById("btnLogOutHead");
let liUsuarios = document.getElementById("liUsuarios");
let liPerfil = document.getElementById("liPerfil");

btnLogOutHead.addEventListener("click", logOut);

function logOut() {
    sessionStorage.clear();
    location.reload();
    location.href='/';
}

//ocultar acciones del admin y comerciante desde el principio
liUsuarios.style.display = "none";


let rol = sessionStorage.getItem('user') ? datosArray['id_rol'] : null;
comprobarRolBtnSesion();


switch (parseInt(rol)) {
    case 1:
        liPerfil.style.display = "block";

        break;
    case 2:
        liPerfil.style.display = "block";
        break;
    case 3:
        liPerfil.style.display = "block";

        break;
    default:
}



function comprobarRolBtnSesion() {
    if (rol) {
        btnLoginHead.style.display = "none";
        btnLogOutHead.style.display = "block";
    } else {
        btnLoginHead.style.display = "block";
        btnLogOutHead.style.display = "none";
    }
}

