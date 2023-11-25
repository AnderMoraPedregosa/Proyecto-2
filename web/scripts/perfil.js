const saludoPerfil = document.getElementById("saludoPerfil");
switch (parseInt(rol)) {
    case 1:
            liUsuarios.style.display = "block";
        liPerfil.style.display = "block";

        break;
    case 2:
        break;
    case 3:
        liPerfil.style.display = "block";
        saludoPerfil.textContent = "dqwd"
        console.log(datosArray)

        break;
    default:
}