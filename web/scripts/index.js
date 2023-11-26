
const btnCrearProducto = document.getElementById("btnCrearProductoAside");
const btnCrearBlog = document.getElementById("btnCrearBlogAside");
const btnVerBlog = document.getElementById("btnBlog");

const sidebartitle = document.getElementById("sidebarTitle");
console.log(rol);
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
        sidebartitle.textContent = "Crea anuncios/blogs aqui!"
        btnCrearBlog.style.display = "block";
        btnCrearProducto.style.display = "block";
        btnVerBlog.style.display = "none";

        break;
    default:
        sidebartitle.textContent = "Te puede interesar!"

}
