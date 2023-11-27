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





async function categoriaAnuncio(id) {
    let categoriaJSON = await getCategoriaById(id);

    return categoria = new Categoria(categoriaJSON['categoria'][0].id, categoriaJSON['categoria'][0].nombre)

}

async function getCategoriaById(id) {
    const response = await fetch(`/categorias/categoria/${id}`);
    const data = await response.json();
    return data;
}