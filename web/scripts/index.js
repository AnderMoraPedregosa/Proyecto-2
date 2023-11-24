
const btnCrearProducto = document.getElementById("btnCrearProducto");
const sidebartitle = document.getElementById("sidebarTitle");
console.log(rol);
switch (parseInt(rol)) {
    case 1:
        btnCrearProducto.style.display = "block";
        sidebartitle.textContent = "Crea anuncios aqui!"
        break;
    case 2:
        sidebartitle.textContent = "Te puede interesar!"

        break;
    case 3:
        sidebartitle.textContent = "Crea anuncios aqui!"

        btnCrearProducto.style.display = "block";
        break;
    default:
        sidebartitle.textContent = "Te puede interesar!"

}
