const datosArray = JSON.parse(sessionStorage.getItem('user'));
const btnLoginHead = document.getElementById("btnLoginHead");
const btnLogOutHead = document.getElementById("btnLogOutHead");
const liFormulario = document.getElementById("liFormulario");
const liUsuarios = document.getElementById("liUsuarios");
const liPerfil = document.getElementById("liPerfil");

btnLogOutHead.addEventListener("click", logOut);

function logOut(){
    sessionStorage.clear();
    location.reload();
}

//ocultar acciones del admin y comerciante desde el principio
liUsuarios.style.display = "none";
liFormulario.style.display = "none";

document.getElementById("menuUl").style.display = "flex";
document.getElementById("menuUl").style.justifyContent = "flex-end";
document.getElementById("menuUl").style.marginRight = "10%";

let rol = sessionStorage.getItem('user') ? datosArray['id_rol'] : null;
comprobarRolBtnSesion();


switch (parseInt(rol)) {
    case 1:
        liFormulario.style.display = "block";
        liUsuarios.style.display = "block";
        liPerfil.style.display = "block";
        break;
    case 2:
    
        break;
    case 3:
        liFormulario.style.display = "block";
        liPerfil.style.display = "block";
        break;
    default:
}



function comprobarRolBtnSesion() {
    if (rol) {
        if (rol == 3) {

        }
        btnLoginHead.style.display = "none";
        btnLogOutHead.style.display = "block";
    } else {
        btnLoginHead.style.display = "block";
        btnLogOutHead.style.display = "none";
    }
}

