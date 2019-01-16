<?php
include 'db.php';
$email = $_GET["email"];
$password = $_GET["password"];
if ($c->query("INSERT INTO users (id, email, password) VALUES ('" . uniqid() . "', '" . $email . "', '" . $password . "')")) {
    echo 0;
} else {
    echo -1;
}