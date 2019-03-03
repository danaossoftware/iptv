<?php
include 'db.php';
$username = $_POST["username"];
$deviceId = $_POST["device_id"];
$c->query("UPDATE users SET device_id='" . $deviceId . "' WHERE username='" . $username . "'");