<?php
include 'db.php';
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");
$type = $_GET["type"];
$results = $c->query("SELECT * FROM configuration WHERE id='price-info'");
$row = $results->fetch_assoc();
echo $row["config" . $type];