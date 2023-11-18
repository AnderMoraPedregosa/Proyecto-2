 function carruselImg() {
    document.addEventListener("DOMContentLoaded", function () {
        let currentImageIndex = 0;
        const images = document.querySelectorAll("#carrusel img");
        const totalImages = images.length;
    
        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = i === index ? "block" : "none";
            });
        }
    
        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            showImage(currentImageIndex);
        }
    
        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
            showImage(currentImageIndex);
        }
    
        // Mostrar la primera imagen al cargar la página
        showImage(currentImageIndex);
    
        // Manejar eventos de los botones
        document.getElementById("anterior").addEventListener("click", prevImage);
        document.getElementById("siguiente").addEventListener("click", nextImage);
    });

}