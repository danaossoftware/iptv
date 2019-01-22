<?php
include 'db.php';
$phone = $_GET["phone"];
$userName = $_GET["username"];
$password = $_GET["password"];
$madeIn = microtime(true)*1000;
$endDate = microtime(true)*1000+(1*30*24*60*60*1000); //+1 month
if ($c->query("SELECT * FROM users WHERE phone='" . $phone . "'")->num_rows > 0) {
    echo -2;
    return;
}
if ($c->query("INSERT INTO users (id, phone, username, password, made_in, end_date) VALUES ('" . uniqid() . "', '" . $phone . "', '" . $userName . "', '" . $password . "', " . $madeIn . ", " . $endDate . ")")) {
    echo 0;
} else {
    echo -1;
}