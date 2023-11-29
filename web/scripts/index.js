let accion = window.location.pathname.split("/")
let btnCrearProducto = document.getElementById("btnCrearProductoAside");
let btnCrearBlog = document.getElementById("btnCrearBlogAside");
let btnVerBlog = document.getElementById("btnBlog");
let searchDiv = document.getElementById("search");
let url = window.location
let sidebartitle = document.getElementById("sidebarTitle");
console.log(accion[1])
switch (parseInt(rol)) {
    case 1:
        btnCrearProducto.style.display = "block";
        btnCrearBlog.style.display = "block";
        btnVerBlog.style.display = "none";
        sidebartitle.textContent = "Crea anuncios/blogs aqui!"
        break;
    case 2:
        sidebartitle.textContent = "Te puede interesar!"

        break;
    case 3:
        if (accion[1] =="perfilAnuncios") {
            searchDiv.style.display = "none";
        }
        sidebartitle.textContent = "Crea anuncios/blogs aqui!"
        btnCrearBlog.style.display = "block";
        btnCrearProducto.style.display = "block";
        btnVerBlog.style.display = "none";

        break;
    default:
        sidebartitle.textContent = "Te puede interesar!"

}
