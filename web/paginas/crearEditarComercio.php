<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comercio Vitoria</title>
  
</head>
<body>
<form id="crearEditarComercioForm">
    <input type="hidden" id="idComercio" name="idComercio" value="">
    <label for="nombreComercio">Nombre:</label>
    <input type="text" id="nombreComercio" name="nombre" required>

    <label for="emailComercio">Email:</label>
    <input type="email" id="emailComercio" name="email" required>

    <label for="telefonoComercio">Teléfono:</label>
    <input type="tel" id="telefonoComercio" name="telefono" required>

    <label for="direccionComercio">Dirección:</label>
    <input type="text" id="direccionComercio" name="direccion" required>

    <input type="button" value="Crear" id="btnCrearComercio">
</form>
</body>
</html>