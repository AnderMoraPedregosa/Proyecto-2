<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);


//insertar Persona
function insertarPersona($dbh, $data)
{
    $stmt = $dbh->prepare("INSERT INTO personas (dni, nombre, passwd, email, id_rol)
                          VALUES (:dni, :nombre, :pass, :email, :rol)");
    $stmt->execute($data);
    close(); // Asumo que esta función cierra la conexión, verifica su implementación
}


function checkIfEmailExists($dbh, $emailUsuario) {
    $data = array ('email' => $emailUsuario);
    $stmt = $dbh->prepare("SELECT COUNT(*) AS count FROM personas WHERE email =(:email)") ;
    $stmt->execute($data);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}