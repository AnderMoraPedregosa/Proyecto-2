import { Persona } from "../modelos/persona.js";
let saludoPerfil = document.getElementById("saludoPerfil");
document.getElementById("cartaFavoritos").style.display = "none";
document.getElementById("cartaAdmin").style.display = "none";

switch (parseInt(rol)) {
    case 1:
        document.getElementsByClassName("prueba")[0].style.display = "none";
        document.getElementsByClassName("prueba")[1].style.display = "none";
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
        let personaJSON = await getPersona()
        let persona = new Persona(personaJSON['data'][0].id, personaJSON['data'][0].dni,
            personaJSON['data'][0].nombre, personaJSON['data'][0].passwd, personaJSON['data'][0].email, personaJSON['data'][0].id_rol);

        liPerfil.style.display = "block";
        saludoPerfil.textContent = "Bienvenido/a " + persona.nombre + "! Este es tu panel para gestionar los anuncios y blogs del comercio al que perteneces."

        break;
    default:
}

async function getPersona() {
    try {
        if (datosArray) {
            let response = await fetch(`/personas/persona/${datosArray["idPersona"]}`);
            let data = await response.json();
            return data;
        }
        return false;
    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}