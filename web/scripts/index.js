
comprobarRolComerciante();


function comprobarRolComerciante() {
    if (rol) {
        if (rol == 3) {
            btnCrearProducto.style.display = "block";
            btnBlog.style.display = "block";
        } else {
            btnBlog.style.display = "block";
            btnCrearProducto.style.display = "none";
        }

    } 
}

