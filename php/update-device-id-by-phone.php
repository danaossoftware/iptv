<?php
include 'db.php';
$phone = $_POST["phone"];
$deviceId = $_POST["device_id"];
$c->query("UPDATE users SET device_id='" . $deviceId . "' WHERE phone='" . $phone . "'");