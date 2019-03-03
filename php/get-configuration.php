<?php
include 'db.php';
$name = $_GET["name"];
/*$ip = $_SERVER["REMOTE_ADDR"];
$userId = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'")->fetch_assoc()["user_id"];*/
session_id("jossstream");
session_start();
//$userId = $_SESSION["jossstream_user_id"];
$userId = $_GET["user_id"];
$results = $c->query("SELECT * FROM configuration WHERE id='" . $name . "'");
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    echo -1;
}