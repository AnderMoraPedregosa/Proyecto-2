export async function getPersonaById() {
    try {
        if (datosArray) {
            console.log(datosArray)
            const response = await fetch(`/comerciantes/comerciantePersona/${datosArray["idPersona"]}`);
            const data = await response.json();
            return data;
        }

        return false;
    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}

