<?php

require "bbdd.php";
$dbh = connect($host, $dbname, $user, $pass);


function getPersonaByEmailAndPassword($dbh, $email, $pass)
{
    $data = array('email' => $email, 'pass' => $pass);
    $stmt = $dbh->prepare("SELECT * FROM personas WHERE email = (:email) AND passwd = (:pass)");
    $stmt->execute($data);
    return $persona = $stmt->fetch(PDO::FETCH_ASSOC);

    close();
}