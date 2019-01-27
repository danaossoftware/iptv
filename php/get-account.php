<?php
include 'db.php';
$ip = $_SERVER["REMOTE_ADDR"];
$userId = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'")->fetch_assoc()["user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");
echo json_encode($results->fetch_assoc());