<?php
//conectar
require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);

//persona por email y contraseña
function getPersonaByEmailAndPassword($dbh, $email, $pass)
{
    $data = array('email' => $email, 'pass' => $pass);
    $stmt = $dbh->prepare("SELECT * FROM personas WHERE email = (:email) AND passwd = (:pass)");
    $stmt->execute($data);
    return $persona = $stmt->fetch(PDO::FETCH_ASSOC);

    close();
}

function getPersonaByEmail($dbh, $email)
{
    $data = array('email' => $email);
    $stmt = $dbh->prepare("SELECT passwd FROM personas WHERE email = (:email)");
    $stmt->execute($data);
    return $persona = $stmt->fetch(PDO::FETCH_ASSOC);

    close();
}