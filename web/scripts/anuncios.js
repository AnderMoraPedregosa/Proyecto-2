async function getAnuncios() {
    const response = await fetch("index.php?accion=anuncios");
    const data = await response.json();
    console.log(data);
}
window.addEventListener("load", getAnuncios);