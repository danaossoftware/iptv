<?php
include 'db.php';
$userId = $_POST["user_id"];
$phone = $_POST["phone"];
$username = $_POST["username"];
$password = $_POST["password"];
$c->query("INSERT INTO users (id, phone, password, username) VALUES ('" . $userId . "', '" . $phone . "', '" . $password . "', '" . $username . "')");