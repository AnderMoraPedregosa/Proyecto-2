// Importacion de las clases y funciones necesarias desde archivos externos
import { Anuncio } from "../modelos/anuncio.js";
import { calcularTiempoTranscurrido } from "./Funciones/calcularTiempo.js";
import { getPersonaById } from "./Funciones/getPersona.js"
import { Categoria } from "../modelos/categoria.js";
import { Comercio } from "../modelos/comercio.js";
let urlActual = window.location.href;
let comercio;
let categoria;
// Divide la URL en partes utilizando "/" como delimitador
let partesUrl = urlActual.split('/');

var enlacesFavoritos;

// Obtiene el segundo elemento del array (índice 1)


let idPersonaFav;
let data;


//categorias
let categoriaSeleccionada = 0;


let articles = document.getElementById("articles");

//variable index db
let db, tablaFavoritos;








let urlAnuncios = partesUrl[3];

async function getAnunciosCategoria(cateAnuncios) {
    let response = await fetch(`/anuncios/todos/${cateAnuncios}`)
    let data = response.json()
    return data;
}

async function getAnuncios(idPersona) {
    try {
        // Obtener la ruta base del documento actual
        let response;
        //controlar si mostrar todos los anuncios o solo los propios
        if (urlAnuncios === "") {
            response = await fetch(`/anuncios/todos`);
        }
        else if (urlAnuncios === "perfilAnuncios") {
            document.getElementById("tituloAnuncios").textContent = "Mis anuncios";


            response = await fetch(`/anuncios/comercioConcreto/${idPersona}/${categoriaSeleccionada}`);
        }
        else {
            document.getElementById("tituloAnuncios").textContent = "Mis anuncios tablaFavoritos";
            //const tablaFavoritos = await obtenerFavoritosIndexedDB(idPersonaFav);


            // Array para favoritosar los detalles de los anuncios tablaFavoritos
            let anunciosFavoritos = [];

            // Por cada ID de anuncio favorito, obtener los detalles desde la base de datos
            //for (const idAnuncio of tablaFavoritos[0].anuncios) {
            try {
                response = await fetch(`/anuncios/porIdAnuncio/${idAnuncio}/${categoriaSeleccionada}`);
                // Obtener el cuerpo JSON de la respuesta
                let detallesData = await response.json();


                // Verificar si la respuesta es válida y contiene el array 'data'
                if (detallesData && Array.isArray(detallesData.data) && detallesData.data.length > 0) {
                    // Acceder al primer (y supuesto único) detalle del anuncio
                    let anuncioDetalle = detallesData.data[0];
                    anunciosFavoritos.push(anuncioDetalle);
                } else {
                    //console.error(`Respuesta no válida para el anuncio ${idAnuncio}`);
                }
            } catch (error) {
                //console.error(`Error al obtener detalles del anuncio ${idAnuncio}: ${error.message}`);
            }
            // }



            //if(anunciosFavoritos.length === 0){
            //   data ={ status: 'error', message: 'Error, no hay anuncios' }
            //}else{
            // Ahora, anunciosFavoritos contiene los detalles de los anuncios tablaFavoritos
            // data = { status: 'success', data: anunciosFavoritos };
            //}


        }



        let contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            let text = await response.text();
            throw new Error(`La respuesta no es un JSON válido. Contenido: ${text}`);
        }


        if (urlAnuncios !== "anunciosFavoritos") {
            data = await response.json();

        }
        return data;
    } catch (error) {
        console.error('Error en la llamada a la API:', error.message);
        return { status: 'error', message: 'Error en la llamada a la API' };
    }
}
//variables globales
let numero1;
let numero2;
let body;




let cargarMasBtn = document.getElementById("cargarMasBtn");
cargarMasBtn.addEventListener('click', async function () {


    numero1 += 11;
    numero2 += 11;
    mostrarHtmlBoton(body);


});


async function getAnunciosSearch(searchTerm) {
    try {
        numero1 = 0;
        numero2 = 10;


        let response;


        //si no busca por palabra clave muestra todos los anuncios
        if (searchTerm === "") {
            response = await fetch("/anuncios/todos/");
        } else {
            // Obtener la ruta base del documento actual
            let base_url = window.location.origin;
            let searchUrl = `${base_url}/anuncios/search/${encodeURIComponent(searchTerm)}`;
            response = await fetch(searchUrl);
        }
        if (!response.ok) {
            throw new Error(`Error al obtener anuncios. Código de estado: ${response.status}`);
        }


        let contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            let text = await response.text();
            throw new Error(`La respuesta no es un JSON válido. Contenido: ${text}`);
        }


        let data = await response.json();
        return data;
    } catch (error) {
        return { status: 'error', message: 'Error en la llamada a la API' };
    }
}


let persona;
window.addEventListener("load", async function () {
    let searchInput = document.getElementById("search-input");
    let selectCategorias = document.getElementById('selectCategorias');
    selectCategorias.addEventListener('change', async function () {
        let categoriaSeleccionada = selectCategorias.value;
        if (categoriaSeleccionada != 0) {
            await filterAdsByCategory(categoriaSeleccionada);
        }
    });

    // Verificar si existe la cookie "buscador"
    let buscadorCookie = getCookie("buscador");

    // Establecer el valor del input basado en la existencia de la cookie
    searchInput.placeholder = buscadorCookie ? buscadorCookie : "Ropa hombre";
    let persona = await getPersonaById();
    let body;
    if (!persona) {
        // No hay nadie logueado
        body = await getAnuncios();
    } else {
        idPersonaFav = datosArray["idPersona"];
        body = await getAnuncios(datosArray["idPersona"]);
    }

    let articles = document.getElementById("articles");
    let numero1 = 0;
    let numero2 = 10;

    mostrarHtmlBoton(body);

    let searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let searchInput = document.getElementById("search-input").value;

        // Guardar en cookie
        document.cookie = `buscador=${searchInput}; path=/`;

        body = await getAnunciosSearch(searchInput);
        // Limpia los anuncios existentes
        articles.innerHTML = "";
        if (body['data'] && body['data'].length > 0) {
            mostrarHtmlBoton(body);
        } else {
            // Mostrar un mensaje si no hay resultados
            let noResultsMessage = document.createElement("div");
            noResultsMessage.className = "anuncios-error";
            noResultsMessage.innerHTML = `<h2>No se encontraron resultados para "${searchInput}".</h2>`;
            articles.appendChild(noResultsMessage);
        }
    });

    let imagenes = document.querySelectorAll('.imagen');

    // Iterar sobre cada imagen y asignar el evento de clic a cada una
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', (e) => {
            // Llamar a la función para mostrar la ventana modal
            mostrarModal(e.target);
        });
    });

    console.log(enlacesFavoritos);

    if (datosArray && datosArray["id_rol"] === "2") {
        crearIndexdb().then(() => {
            actualizarIconosFavoritos();
        }).catch((error) => {
            console.error('Error al abrir la base de datos', error);
        });
    }

    async function filterAdsByCategory(categoria) {

        body = await getAnunciosCategoria(categoria);


        articles.innerHTML = "";
        mostrarHtmlBoton(body);
    }
});


/*
document.addEventListener('DOMContentLoaded', async function() {


    const tablaFavoritos = await obtenerFavoritosIndexedDB(idPersonaFav);


    // favoritosa los IDs de los anuncios que están en tablaFavoritos
    anunciosEnFavoritos = tablaFavoritos.reduce((acumulador, fav) => {
        acumulador.push(...fav.anuncios);
        return acumulador;
    }, []);
   
    console.log(anunciosEnFavoritos)
   
    // Actualizar iconos de tablaFavoritos en la página
    //actualizarIconosFavoritos(anunciosEnFavoritos);
});

async function recogerFavoritos() {
    const tablaFavoritos = await obtenerFavoritosIndexedDB(idPersonaFav);

    // favoritosa los IDs de los anuncios que están en tablaFavoritos
    anunciosEnFavoritos = tablaFavoritos.reduce((acumulador, fav) => {
        acumulador.push(...fav.anuncios);
        return acumulador;
    }, []);

}

*/

function actualizarIconosFavoritos() {
    const tablaFavoritos = getAnunciosFavoritos();
    // Obtener todos los enlaces de tablaFavoritos en la página

    console.log(tablaFavoritos)
    console.log(datosArray["idPersona"])

    let requestFav = tablaFavoritos.get(datosArray["idPersona"]);
    console.log(requestFav)
    requestFav.onsuccess = function (event) {

        var anunciosFav = requestFav.result;

        console.log("anuncios fav")
        console.log(datosArray["idPersona"])

        let listaAnuncios = anunciosFav.anuncios;

        //todos los anuncios favoritos
        console.log(listaAnuncios);

        if (listaAnuncios.length !== 0) {

            // Iterar sobre cada enlace y actualizar el ícono
            enlacesFavoritos.forEach(enlace => {
                console.log("prueba")
                const idAnuncio = enlace.getAttribute('data-id');

                // Verificar si el anuncio está en la lista de tablaFavoritos
                const esFavorito = tablaFavoritos.anuncios.includes(idAnuncio);

                // Obtener el elemento <i> correspondiente al enlace de tablaFavoritos
                const iconElement = enlace.querySelector('i');

                // Actualizar la clase del ícono según si es favorito o no
                if (esFavorito) {
                    iconElement.classList.remove('fa-regular');
                    iconElement.classList.add('fa-solid');
                } else {
                    iconElement.classList.remove('fa-solid');
                    iconElement.classList.add('fa-regular');
                }

            });
        }

    }

}


function getCookie(nombre) {
    let nombreCooke = `${nombre}=`;
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nombreCooke) === 0) {
            return cookie.substring(nombreCooke.length, cookie.length);
        }
    }

    return null;
}






function confirmarEliminacion(idAnuncio) {
    let confirmacion = confirm("¿Estás seguro de que deseas eliminar este anuncio?");
    if (confirmacion) {
        // El usuario confirmó, realizar la eliminación
        if (urlAnuncios === "perfilAnuncios") {
            window.location.href = `/anuncios/borrarAnuncio/${idAnuncio}/perfilAnuncios`;
        }
        else {
            window.location.href = `/anuncios/borrarAnuncio/${idAnuncio}`;

        }

    }
}
function mostrarHtmlBoton(body) {

    if (body && body['data'] && body['data'].length > numero2) {
        mostarHtml(body);
        cargarMasBtn.style.display = 'block';
    }
    else {
        mostarHtml(body);
        cargarMasBtn.style.display = 'none';
    }
}


async function mostarHtml(body) {
    let divArticle;
    const scrollBefore = window.scrollY;


    //eliminar anuncios existentes



    if (body['status'] == 'success') {



        let anuncios = datosAnuncios(body['data']);
        anuncios.sort((a, b) => new Date(b.fechaC) - new Date(a.fechaC));
        // Define una función auxiliar para manejar la lógica de cada anuncio
        const procesarAnuncio = async (anuncioNew) => {
            comercio = await comercioAnuncio(anuncioNew.idComercio);
            if (comercio) {
                categoria = await categoriaAnuncio(anuncioNew.idCategoria);}
                if (categoria) {
                    comercio =await comercioAnuncio(anuncioNew.idComercio);}
                
            divArticle = document.createElement("div");
            divArticle.className = "article-item";
            let tiempoTranscurrido = calcularTiempoTranscurrido(anuncioNew.fechaC);
            // Agregar la información del anuncio al nuevo elemento div
            divArticle.innerHTML = `
                 <div class="image-wrap">
                     <img class="imagen" src="${anuncioNew.imagen}" alt="Producto" />
                 </div>
                 <div class="modal" id="modal">
                 <span class="close-btn" id="closeBtn">&times;</span>
                 <div class="img-container">
                   <div class="zoom">
                   <img class="modalImagen" id="zoomedImage" src="" alt="Zoomed Image">
                   </div>
                 </div>
               </div>
                 <h2>${anuncioNew.titulo}</h2>
                 <p>${anuncioNew.descripcion.substring(0, 255)}...<p>
                 <span class="date">${tiempoTranscurrido}</span>
                 <h3>${categoria.nombre}</h3>
                 <h4> Comercio: ${comercio.nombre}</h4>
                 <p> <strong>Direccion:</strong> ${comercio.direccion}, <strong>Telefono:</strong> ${comercio.telefono}, <strong> Email:</strong> ${comercio.email}<p>
            
                 <div class="link-container">
                 <a href="/anuncioDetalle/detalles/${anuncioNew.id}" class="link read-more" title="Leer mas"><i  class="fa-solid fa-info"></i> </a>
                 <a href="/anuncioDetalle/actualizar/${anuncioNew.id}" class="link edit" id="aEditar" title="Actualizar" style="display: ${urlAnuncios === "perfilAnuncios" ? 'block' : 'none'};"><i class="fa-solid fa-pen-to-square"></i></a>
                 <a href="#" class="eliminar-enlace link delete enlacesCrudAnuncios" data-id="${anuncioNew.id}" id="aEliminar" title="Eliminar" style="display: ${urlAnuncios === "perfilAnuncios" ? 'block' : 'none'};"><i class="fa-solid fa-trash"></i></a>
                 <a href="#" class="linkFav" id="fav" title="Favorito" data-id="${anuncioNew.id}" style="display: ${persona && datosArray["id_rol"] === "2" ? 'block' : 'none'};"><i class="fa-regular fa-heart"></i>.</a>
                 </div>
   
                  <div class="clearfix"></div>
             `;
            articles.appendChild(divArticle);

            let imagenes = document.querySelectorAll('.imagen');


            // Iterar sobre cada imagen y asignar el evento de clic a cada una
            imagenes.forEach(imagen => {
                imagen.addEventListener('click', (e) => {
                    // Llamar a la función para mostrar la ventana modal
                    mostrarModal(e.target);
                });
            });



            let eliminarEnlace = divArticle.querySelector('.eliminar-enlace');
            eliminarEnlace.addEventListener('click', function (event) {
                event.preventDefault();
                let idAnuncio = this.getAttribute('data-id');
                confirmarEliminacion(idAnuncio);
            });

            //tablaFavoritos
            let favEnlace = divArticle.querySelector('#fav');




            favEnlace.addEventListener("click", function (event) {
                event.preventDefault();
                // id del anuncio
                let idAnuncio = this.getAttribute('data-id');

                console.log(idAnuncio);

                guardarEnIndexdb(idAnuncio);


            });
        };

        // Utiliza un bucle for...of para asegurar el orden de las operaciones asíncronas
        for (const anuncioNew of anuncios) {
            await procesarAnuncio(anuncioNew);
        }





        window.scrollTo({ top: scrollBefore, behavior: 'smooth' });
    } else {
        divArticle = document.createElement("div");
        divArticle.className = "anuncios-error";
        divArticle.innerHTML = `<h2>Error, no se han podido cargar los anuncios. Vuelva a intentarlo más tarde.</h2>`;
        articles.appendChild(divArticle);
        enlacesFavoritos = document.querySelectorAll('.linkFav')
        console.log(enlacesFavoritos)
    }


}


function datosAnuncios(data) {
    let anuncios = [];


    data.slice(numero1, numero2).forEach(async (anuncioJson) => {
        let divArticle = document.createElement("div");
        divArticle.className = "article-item";
        let anuncioNew = new Anuncio(
            anuncioJson.id,
            anuncioJson.titulo,
            anuncioJson.imagen_anuncio,
            anuncioJson.descripcion,
            anuncioJson.fecha_creacion,
            anuncioJson.precio,
            anuncioJson.id_categoria,
            anuncioJson.id_comercio,
            anuncioJson.id_comerciante
        );


        anuncios.push(anuncioNew);
    });
    return anuncios;
}




function mostrarModal(imagen) {
    let modal = document.getElementById('modal');
    let zoomedImage = document.getElementById('zoomedImage');
    let closeBtn = document.getElementById('closeBtn');
    let zoom = modal.querySelector('.zoom');


    // Lógica para mostrar la ventana modal
    zoomedImage.src = imagen.src;
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 50);


    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');


        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });


    zoom.addEventListener('mousemove', (e) => {
        let { left, top, width, height } = zoom.getBoundingClientRect();
        let x = (e.clientX - left) / width * 100;
        let y = (e.clientY - top) / height * 100;


        zoomedImage.style.transformOrigin = `${x}% ${y}%`;
        zoomedImage.style.transform = 'scale(1.75)';
    });


    zoom.addEventListener('mouseleave', () => {
        zoomedImage.style.transform = 'scale(1)';
    });
}

//crear bd

function crearIndexdb() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('AnunciosFavoritos', 1);

        request.onsuccess = () => {
            db = request.result;
            resolve();
        };

        request.onupgradeneeded = () => {
            db = request.result;
            tablaFavoritos = db.createObjectStore('favoritos', {
                keyPath: 'idPersona'
            });
        };

        request.onerror = (error) => {
            reject(error);
        };
    });
}
function guardarEnIndexdb(idAnuncio) {
    // Añadir almacén
    tablaFavoritos = getAnunciosFavoritos();
    let requestFav = tablaFavoritos.get(idPersonaFav);

    requestFav.onsuccess = function (event) {
        var anunciosFav = requestFav.result;
        let listaAnuncios = [];

        if (anunciosFav === undefined) {
            listaAnuncios.push(idAnuncio);
        } else {

            listaAnuncios = anunciosFav.anuncios;

            // Utiliza indexOf para verificar si el idAnuncio ya existe

            if (!listaAnuncios.includes(idAnuncio)) {
                listaAnuncios.push(idAnuncio);
            }

        }


        let anuncioFav = {
            idPersona: idPersonaFav,
            anuncios: listaAnuncios
        };

        const peticionAdd = tablaFavoritos.put(anuncioFav); // Añadir objeto

        peticionAdd.onsuccess = function () {
            console.log('Producto agregado');
        };

        peticionAdd.onerror = function () {
            alert("Error insertando producto");
        };
    };
}

function getAnunciosFavoritos() {
    console.log(db)

    const transaction = db.transaction(['favoritos'], 'readwrite');
    return tablaFavoritos = transaction.objectStore('favoritos');
}




async function categoriaAnuncio(id) {
    let categoriaJSON = await getCategoriaById(id);
    return categoria = new Categoria(categoriaJSON['categoria'][0].id, categoriaJSON['categoria'][0].nombre)

}

async function comercioAnuncio(id) {
    let comercioJSON = await getComercioId(id);
    return comercio = new Comercio(comercioJSON['comercio'][0].id, comercioJSON['comercio'][0].nombre,
        comercioJSON['comercio'][0].email, comercioJSON['comercio'][0].telefono, comercioJSON['comercio'][0].direccion)

}


async function getCategoriaById(id) {
    let response = await fetch(`/categorias/categoria/${id}`);
    let data = await response.json();
    return data;
}

async function getComercioId(id) {
    let response = await fetch(`/comercios/comercio/${id}`);
    let data = await response.json();
    return data;
}