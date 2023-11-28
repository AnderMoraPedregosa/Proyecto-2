

function showPreview(input) {

    let previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = '';

    let files = input.files;

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let reader = new FileReader();

        reader.onload = function (e) {
            let previewImage = document.createElement('img');
            previewImage.src = e.target.result;
            previewImage.classList.add('preview-image');
            previewImage.style.maxWidth = '10em'; // Ajusta el ancho máximo
            previewImage.style.maxHeight = '10em'; // Ajusta la altura máxima
            previewContainer.appendChild(previewImage);
        };

        reader.readAsDataURL(file);
    }
}


function showPreviewBlog(input) {
    let previewContainer = document.getElementById('image-preview-blog');
previewContainer.innerHTML = `` ;
let file = input.files[0]; // Obtén solo la primera imagen seleccionada
    if (file) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let previewImage = document.createElement('img');
            previewImage.src = e.target.result;
            previewImage.classList.add('preview-image-blog');
            previewImage.style.maxWidth = '10em'; // Ajusta el ancho máximo
            previewImage.style.maxHeight = '10em'; // Ajusta la altura máxima
            previewContainer.appendChild(previewImage);
        };

        reader.readAsDataURL(file);
    }
}