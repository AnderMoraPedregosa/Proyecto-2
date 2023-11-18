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
    // No es necesario llamar a exit aquí
}


switch ($accion) {
    case 'todos':
        $anuncios = getAnuncios($dbh);

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

        if (isset($_FILES['imagenes_adicionales'])) {
            $imagenesAdicionales = $_FILES['imagenes_adicionales'];

            // Obtener información sobre el anuncio desde el formulario
            $titulo = $_POST["titulo"];
            $precio = $_POST["precio"];
            $desc = $_POST["desc"];
            $idCategoria = isset($_POST['selectCategorias']) ? $_POST['selectCategorias'] : null;
            list($id, $nombreCategoria) = explode('|', $idCategoria);

            date_default_timezone_set('Europe/Madrid');

            // Crear el array $data con la información del anuncio
            $data = [
                'titulo' => $titulo,
                'precio' => $precio,
                'descripcion' => $desc,
                'categoria' => $nombreCategoria,
                'id_categoria' => $id,
                'fecha' => date('Y-m-d H:i:s'),
                'comercio' => 1,
                'anunciante' => 2,
                'imagenes' => [], // Este array almacenará las rutas de las imágenes
            ];

            // Lógica para manejar las imágenes
            if (isset($_FILES['imagenes_adicionales'])) {
                $imagenesAdicionales = $_FILES['imagenes_adicionales'];

                foreach ($imagenesAdicionales['tmp_name'] as $index => $imagenAdicionalTmp) {
                    $extension = pathinfo($imagenesAdicionales['name'][$index], PATHINFO_EXTENSION);
                    $nombreImagenAdicional = date('YmdHis') . '_' . $index . '.' . $extension;
                    $rutaImagenAdicional =  "imagenes/" . $nombreImagenAdicional;

                    if (move_uploaded_file($imagenAdicionalTmp, $rutaImagenAdicional)) {
                        $data['imagenes'][] = $rutaImagenAdicional;
                    } else {
                        // Manejar el caso en que haya un error al mover la imagen
                        $response = ['status' => 'error', 'message' => 'Error al subir una o más imágenes'];
                        jsonResponse($response, 500);
                    }
                }
            }

                // Insertar el anuncio en la base de datos
                insertarAnuncio($dbh, $data);
                header("Location: /");
                die(); // Finalizar el script después de la redirección
            } else {
                // Manejar el caso en que no se hayan proporcionado archivos de imagen
                $response = ['status' => 'error', 'message' => 'No se han proporcionado archivos de imagen válidos'];
                jsonResponse($response, 400);
            }
            case "actualizar":
            
                //ACTUALIZAR
                $titulo = $_POST["titulo"];
                $precio = $_POST["precio"];
                $desc = $_POST["desc"];
                $idCategoria = isset($_POST['selectCategorias']) ? $_POST['selectCategorias'] : null;

            date_default_timezone_set('Europe/Madrid');

            $id_cat = isset($_POST['selectCategorias']) ? $_POST['selectCategorias'] : null;
            list($id_cat, $nombreCategoria) = explode('|', $id_cat);

            

            $id_anuncio = $_POST["id_anuncio"];
            // Crear el array $data con la información del anuncio
            $data = [
                "id" => $id_anuncio,
                'titulo' => $titulo,
                'precio' => $precio,
                'descripcion' => $desc,
                'categoria' => $nombreCategoria,
                'id_categoria' => $id_cat,
                'fecha' => date('Y-m-d H:i:s'),
                'comercio' => 1,
                'anunciante' => 2
            ];
             // Actualizar el anuncio en la base de datos
             actualizarAnuncio($dbh, $data);
           header("Location: /");
           die(); // Finalizar el script después de la redirección
           case "borrarAnuncio":
            eliminarId($dbh, $id);
           header("Location: /");
           die(); // Finalizar el script después de la redirección
           default:
        $response = ['status' => 'error', 'message' => 'Acción no válida'];
        jsonResponse($response, 400);
        break;
    
}
