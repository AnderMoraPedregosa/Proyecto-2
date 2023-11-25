const datosArray = JSON.parse(sessionStorage.getItem('user'));
const btnLoginHead = document.getElementById("btnLoginHead");
const btnLogOutHead = document.getElementById("btnLogOutHead");
const liUsuarios = document.getElementById("liUsuarios");
const liPerfil = document.getElementById("liPerfil");

btnLogOutHead.addEventListener("click", logOut);

function logOut() {
    sessionStorage.clear();
    location.reload();
}

//ocultar acciones del admin y comerciante desde el principio
liUsuarios.style.display = "none";


let rol = sessionStorage.getItem('user') ? datosArray['id_rol'] : null;
comprobarRolBtnSesion();


switch (parseInt(rol)) {
    case 1:
        liUsuarios.style.display = "block";
        liPerfil.style.display = "block";

        break;
    case 2:
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

