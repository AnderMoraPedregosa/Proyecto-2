async function getAnuncios() {
    const response = await fetch("../backend/servicioAnuncios.php");
    const data = await response.json();
    console.log(data);
}
window.addEventListener("load", getAnuncios);