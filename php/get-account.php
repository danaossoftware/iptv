<?php
include 'db.php';
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");
echo json_encode($results->fetch_assoc());