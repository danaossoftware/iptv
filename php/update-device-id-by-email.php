<?php
include 'db.php';
$email = $_POST["email"];
$deviceId = $_POST["device_id"];
$c->query("UPDATE users SET device_id='" . $deviceId . "' WHERE email='" . $email . "'");