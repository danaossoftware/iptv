<?php
include 'db.php';
$userId = $_POST["user_id"];
$email = $_POST["email"];
$username = $_POST["username"];
$password = $_POST["password"];
$c->query("INSERT INTO users (id, email, password, username) VALUES ('" . $userId . "', '" . $email . "', '" . $password . "', '" . $username . "')");