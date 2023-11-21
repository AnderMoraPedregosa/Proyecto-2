const datos = sessionStorage.getItem('user');
const datosArray = JSON.parse(datos);
const btnLoginHead = document.getElementById("btnLoginHead");
const btnLogOutHead = document.getElementById("btnLogOutHead");
const btnCrearProducto = document.getElementById("btnCrearProducto");
const btnBlog = document.getElementById("btnBlog");

let rol = sessionStorage.getItem('user') ? datosArray['id_rol'] : null;


comprobarRolBtnSesion();


function comprobarRolBtnSesion() {
    if (rol) {
        btnLoginHead.style.display = "none";
        btnLogOutHead.style.display = "block";
    } else {
        btnLoginHead.style.display = "block";
        btnLogOutHead.style.display = "none";
    }
}

