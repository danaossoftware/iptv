<?php
include 'db.php';
$userId = $_POST["user_id"];
$email = $_POST["email"];
$username = $_POST["username"];
$password = $_POST["password"];
$deviceId = $_POST["device_id"];
$c->query("INSERT INTO users (id, email, password, username, made_in, device_id) VALUES ('" . $userId . "', '" . $email . "', '" . $password . "', '" . $username . "', " . round(microtime(true)*1000) . ", '" . $deviceId . "')");