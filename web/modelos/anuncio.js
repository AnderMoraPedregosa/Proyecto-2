// Definición de la clase Anuncio
class Anuncio {
    // Constructor que recibe los detalles del anuncio
    constructor(id,titulo, imagen, categoria, descripcion, fechaC, precio, idCategoria, idComercio, idComerciante) {
        this.id = id;
        this.titulo = titulo;
        this.imagen = imagen;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.fechaC = fechaC;
        this.precio = precio;
        this.idCategoria = idCategoria;
        this.idComercio = idComercio;
        this.idComerciante = idComerciante;
    }

    // Método para obtener la información completa del anuncio

    // Otros métodos y propiedades pueden ser añadidos según sea necesario
}
export { Anuncio };