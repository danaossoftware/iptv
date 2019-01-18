<?php
include 'db.php';
$phone = $_GET["phone"];
$password = $_GET["password"];
if ($c->query("INSERT INTO users (id, phone, password) VALUES ('" . uniqid() . "', '" . $phone . "', '" . $password . "')")) {
    echo 0;
} else {
    echo -1;
}