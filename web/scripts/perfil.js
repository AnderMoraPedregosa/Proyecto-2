const saludoPerfil = document.getElementById("saludoPerfil");
document.getElementById("cartaFavoritos").style.display = "none";
document.getElementById("cartaAdmin").style.display = "none";

switch (parseInt(rol)) {
    case 1:
        document.getElementsByClassName("prueba")[0].style.display = "block";
        document.getElementsByClassName("prueba")[1].style.display = "block";
        document.getElementById("cartaAdmin").style.display = "block";

            liUsuarios.style.display = "block";
        liPerfil.style.display = "block";

        break;
    case 2:
        document.getElementsByClassName("prueba")[0].style.display = "none";
        document.getElementsByClassName("prueba")[1].style.display = "none";
        document.getElementById("cartaFavoritos").style.display = "block";

        break;
    case 3:
        document.getElementsByClassName("prueba")[0].style.display = "block";
        document.getElementsByClassName("prueba")[1].style.display = "block";

        liPerfil.style.display = "block";
        saludoPerfil.textContent = "dqwd"
        console.log(datosArray)

        break;
    default:
}