const datosArray = JSON.parse(sessionStorage.getItem('user'));
const btnLoginHead = document.getElementById("btnLoginHead");
const btnLogOutHead = document.getElementById("btnLogOutHead");
const liFormulario = document.getElementById("liFormulario");
const liUsuarios = document.getElementById("liUsuarios");



//ocultar acciones del admin y comerciante desde el principio
liUsuarios.style.display = "none";
liFormulario.style.display = "none";


let rol = sessionStorage.getItem('user') ? datosArray['id_rol'] : null;
comprobarRolBtnSesion();


switch (parseInt(rol)) {
    case 1:
        document.getElementById("menuUl").style.display = "flex";

        liFormulario.style.display = "block";
        liUsuarios.style.display = "block";


        break;
    case 2:
        alert("normal")
        document.getElementById("menuUl").style.display = "flex";
        document.getElementById("menuUl").style.justifyContent = "flex-end";
        document.getElementById("menuUl").style.marginRight = "10%";


        break;
    case 3:
        liFormulario.style.display = "block";

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

