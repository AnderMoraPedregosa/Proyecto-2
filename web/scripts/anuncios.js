async function getAnuncios() {
    const response = await fetch("web/servidor/servicios/anuncios/servicioAnuncios.php");
    const data = await response.json();
    console.log(data);
}
window.addEventListener("load", getAnuncios);