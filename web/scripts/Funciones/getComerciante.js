export async function getComercianteByPersonaId() {
    try {
        const response = await fetch(`/comerciantes/comerciantePersona/${datosArray["idPersona"]}`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error en la operación:', error.message);
    }
}