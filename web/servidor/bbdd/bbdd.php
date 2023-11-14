<?php
require "enumDatosConexion.php";
$host = Datos::Host;
$dbname = Datos::Dbname;
$user = Datos::User;
$pass = Datos::Pass;

function connect($host, $dbname, $user, $pass)
{
    try {
        # MySQL
        $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
        // Configurar el modo de error para mostrar excepciones
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return $dbh;
    } catch (PDOException $e) {
        echo "Error de conexión: " . $e->getMessage();
        return null; // Retorna null en caso de error para indicar una conexión fallida
    }
}
function close()
{
    $dbh = null;
}