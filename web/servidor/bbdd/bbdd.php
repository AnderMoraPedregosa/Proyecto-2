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
     
        return $dbh;
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
