<?php
require "servidor/bbdd/anunciosCRUD.php";

// Convertir la respuesta a JSON
function jsonResponse($data, $statusCode = 200)
{
    // Establecer la cabecera para JSON y el código de estado
    http_response_code($statusCode);
    header('Content-Type: application/json');

    // Imprimir los datos como JSON y salir
    echo json_encode($data);
}
if (isset($_POST['accion']) || isset($_GET['accion'])) {
    // Obtener la acción de la solicitud
    $accion = isset($_POST['accion']) ? $_POST['accion'] : $_GET['accion'];

    // Manejar diferentes acciones con un switch
    switch ($accion) {
        case 'anuncios':
            $anuncios = getAnuncios($dbh);

            if ($anuncios === false) {
                $response = ['status' => 'error', 'message' => 'No se pudieron obtener los anuncios'];
                jsonResponse($response, 500);
            }

            $response = ['status' => 'success', 'data' => $anuncios];
            jsonResponse($response);
            break;
        case 'detalles':
            $imagenes = getImagenesId($dbh, $_GET['id']);
            $anuncio = getAnuncioId($dbh, $_GET['id']);
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
                        $rutaImagenAdicional =  "imagenes/".$nombreImagenAdicional;

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
                header("Location: index.php");
                exit();
            } else {
                // Manejar el caso en que no se hayan proporcionado archivos de imagen
                $response = ['status' => 'error', 'message' => 'No se han proporcionado archivos de imagen válidos'];
                jsonResponse($response, 400);
            }
            case "modificar":
                //ACTUALIZAR
                $titulo = $_POST["titulo"];
                $precio = $_POST["precio"];
                $desc = $_POST["desc"];
                $idCategoria = isset($_POST['selectCategorias']) ? $_POST['selectCategorias'] : null;
                list($id, $nombreCategoria) = explode('|', $idCategoria);

                date_default_timezone_set('Europe/Madrid');

                $id_anuncio = isset($_POST['id_anuncio']) ? $_POST['id_anuncio'] : '';


                // Crear el array $data con la información del anuncio
                $data = [
                    "id_anuncio" => $id_anuncio,
                    'titulo' => $titulo,
                    'precio' => $precio,
                    'descripcion' => $desc,
                    'categoria' => $nombreCategoria,
                    'id_categoria' => $id,
                    'fecha' => date('Y-m-d H:i:s'),
                    'comercio' => 1,
                    'anunciante' => 2
                ];
                 // Insertar el anuncio en la base de datos
                 actualizarAnuncio($dbh, $data);
                 header("Location: index.php");
                exit();
                 
                break;
            case "borrarAnuncio":
                $id_anuncio = isset($_GET['id']) ? $_GET['id'] : '';
                echo "<script>alert('$id_anuncio');</script>";
               
                eliminarId($dbh, $id_anuncio);
                header("Location: index.php");
                exit();
                break;
        default:
            $response = ['status' => 'error', 'message' => 'Acción no válida'];
            jsonResponse($response, 400);
            break;
    }
}
