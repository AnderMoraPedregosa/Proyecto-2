<?php
require "servidor/bbdd/anunciosCRUD.php";

// Convertir la respuesta a JSON
function jsonResponse($data, $statusCode = 200)
{
    // Establecer la cabecera para JSON y el código de estado
    http_response_code($statusCode);
    header('Content-Type: application/json');

    // Imprimir los datos como JSON (sin llamar a exit)
    echo json_encode($data);
}

// Decodifica los datos JSON enviados en el cuerpo de una solicitud POST
// y los almacena en un array asociativo.
$datos = json_decode(file_get_contents('php://input'), true);



switch ($accion) {
    case 'search':
        $palabra = urldecode($path_parts[2]);
        if (empty($palabra)) {
            $response = ['status' => 'error', 'message' => 'Término de búsqueda no proporcionado'];
            jsonResponse($response, 400);
        }

        $anuncios = getAnuncioSearch($dbh, $palabra);
        if ($anuncios === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener los anuncios'];
            jsonResponse($response, 500);
        }
        $response = ['status' => 'success', 'data' => $anuncios];
        jsonResponse($response);
        break;
    case 'todos':
        $anuncios = getAnuncios($dbh);

        if ($anuncios === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener los anuncios'];
            jsonResponse($response, 500);
        }

        $response = ['status' => 'success', 'data' => $anuncios];
        jsonResponse($response);
        break;
    case "comercioConcreto":

        $idComercio = getComercio($dbh, $id);

        $anuncios = getAnuncioPorComercio($dbh, $idComercio);

        if ($anuncios === false) {
            $response = ['status' => 'error', 'message' => 'No se pudieron obtener los anuncios'];
            jsonResponse($response, 500);
        }
        $response = ['status' => 'success', 'data' => $anuncios];
        jsonResponse($response);
        break;



    case 'detalles':

        $imagenes = getImagenesId($dbh, $id);
        $anuncio = getAnuncioId($dbh, $id);
        $response = [
            'anuncio' => $anuncio,
            'imagenes' => $imagenes,
        ];

        // Envía la respuesta JSON
        jsonResponse($response);
        break;
    case 'insertar':
        $titulo = isset($datos['titulo']) ? $datos['titulo'] : '';
        $precio = isset($datos['precio']) ? $datos['precio'] : '';
        $desc = isset($datos['descripcion']) ? $datos['descripcion'] : '';
        $cat = isset($datos['cat']) ? $datos['cat'] : '';
        $imagenesAdicionales = isset($datos['imagenes']) ? $datos['imagenes'] : [];

        date_default_timezone_set('Europe/Madrid');
        // Crear el array $data con la información del anuncio
        $dataAnuncio = [
            'titulo' => $titulo,
            'precio' => $precio,
            'descripcion' => $desc,
            'id_categoria' => $cat,
            'fecha' => date('Y-m-d H:i:s'),
            'comercio' => 1,
            'anunciante' => 2,
            'imagenes' => [], // Este array almacenará las rutas de las imágenes
        ];
echo  $imagenesAdicionales;
        // Verificar si se proporcionaron imágenes
        if (!empty($imagenesAdicionales)) {
            foreach ($imagenesAdicionales as $index => $imagen) {
                $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
                $nombreImagen = date('YmdHis') . '_' . $index . '.' . $extension;

                // Guardar la imagen en el sistema de archivos y obtener su ruta
                $rutaImagen = guardarImagenBase64($imagen['tmp_name'], $nombreImagen);

                if ($rutaImagen) {
                    $dataAnuncio['imagenes'][] = $rutaImagen;
                } else {
                    // Manejar el caso en que haya un error al guardar la imagen
                    $response = ['status' => 'error', 'message' => 'Error al guardar una o más imágenes'];
                    jsonResponse($response, 500);
                }
            }
        }

        insertarAnuncio($dbh, $dataAnuncio);
        header("Location: /");
        break;
    case "actualizar":
        $imagenesAdicionales = $_FILES['imagenes_adicionales'];
        var_dump($datos);
        //ACTUALIZAR
        $id = $datos['id'];
        $titulo = $datos['titulo'];
        $precio = $datos['precio'];
        $descripcion = $datos['descripcion'];
        $cat = $datos['cat'];
        date_default_timezone_set('Europe/Madrid');


        $datos = [
            "id" => $id,
            'titulo' => $titulo,
            'precio' => $precio,
            'descripcion' => $descripcion,
            'categoria' => $cat,
            'fecha' => date('Y-m-d H:i:s'),
            'comercio' => 1,
            'anunciante' => 2,
            'imagenes' => [],
        ];

        
        foreach ($dataAnuncio['imagenes'] as $index => $imagen) {
            $extension = pathinfo($imagen['nombre'], PATHINFO_EXTENSION);
            $nombreImagen = date('YmdHis') . '_' . $index . '.' . $extension;

            // Guardar la imagen en el sistema de archivos y obtener su ruta
            $rutaImagen = guardarImagenBase64($imagen['base64'], $nombreImagen);

            if ($rutaImagen) {
                $dataAnuncio['imagenes'][$index] = $rutaImagen;
            } else {
                // Manejar el caso en que haya un error al guardar la imagen
                $response = ['status' => 'error', 'message' => 'Error al guardar una o más imágenes'];
                jsonResponse($response, 500);
            }
        }

        actualizarAnuncio($dbh, $datos);

        break;
    case "borrarAnuncio":
        eliminarId($dbh, $id);

        //redireccionar al index o al perfil
        if ($palabra === "anunciosPerfil") {
            header("Location: /perfil");
        } else {
            header("Location: /");
        }

        die(); // Finalizar el script después de la redirección
    default:
        $response = ['status' => 'error', 'message' => 'Acción no válida'];
        jsonResponse($response, 400);
        break;
}


function guardarImagenBase64($base64Data, $nombreImagen)
{
    $rutaImagen = "imagenes/" . $nombreImagen;
    // Decodificar la imagen base64 y guardarla en el sistema de archivos
    $imagenDecodificada = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Data));
    if (file_put_contents($rutaImagen, $imagenDecodificada)) {
        return $rutaImagen;
    } else {
        return false;
    }
}
