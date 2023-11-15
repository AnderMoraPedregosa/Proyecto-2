export function calcularTiempoTranscurrido(fecha) {
     // Convertir la fecha proporcionada en un objeto de fecha
    const fechaAnuncio = new Date(fecha);

     // Obtener la fecha y hora actuales
    const ahora = new Date();

        // Convertir la diferencia a segundos, minutos, horas y días
        let diferencia = ahora - fechaAnuncio;
        let segundos = Math.floor(diferencia / 1000);
        let minutos = Math.floor(segundos / 60);
        let horas = Math.floor(minutos / 60);
        let dias = Math.floor(horas / 24);

             // Comprobar cuánto tiempo ha pasado y devolver un mensaje apropiado
            if (dias > 0) {
                return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
            } else if (horas > 0) {
                return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
            } else if (minutos > 0) {
                return `Hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
            } else {
                return 'Hace menos de un minuto';
            }
}