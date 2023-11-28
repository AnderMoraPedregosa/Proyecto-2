export async function getPersonaById() {
    try {
        if (datosArray) {
            let response = await fetch(`/comerciantes/comerciantePersona/${datosArray["idPersona"]}`);
            let data = await response.json();
            return data;
        }

        return false;
    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}