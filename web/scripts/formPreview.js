

function showPreview(input) {

    var previewContainer = document.getElementById('image-preview');
    previewContainer.innerHTML = '';

    var files = input.files;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.onload = function (e) {
            var previewImage = document.createElement('img');
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
    var previewContainer = document.getElementById('image-preview-blog');
previewContainer.innerHTML = `` ;
    var file = input.files[0]; // Obtén solo la primera imagen seleccionada
    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var previewImage = document.createElement('img');
            previewImage.src = e.target.result;
            previewImage.classList.add('preview-image-blog');
            previewImage.style.maxWidth = '10em'; // Ajusta el ancho máximo
            previewImage.style.maxHeight = '10em'; // Ajusta la altura máxima
            previewContainer.appendChild(previewImage);
        };

        reader.readAsDataURL(file);
    }
}