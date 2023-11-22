const datos = sessionStorage.getItem('user');
const datosArray = JSON.parse(datos);
const btnLoginHead = document.getElementById("btnLoginHead");
const btnLogOutHead = document.getElementById("btnLogOutHead");
const liFormulario = document.getElementById("liFomrulario");
const liUsuarios = document.getElementById("liUsuarios");


let rol = sessionStorage.getItem('user') ? datosArray['id_rol'] : null;


switch (rol) {
    case 1:
        break;
    case 2:
        break;
    case 3:
        break;
    default:
}

comprobarRolBtnSesion();


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

