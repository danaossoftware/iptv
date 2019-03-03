<?php
include 'db.php';
$userId = $_POST["user_id"];
$c->query("UPDATE users SET device_id='' WHERE id='" . $userId . "'");