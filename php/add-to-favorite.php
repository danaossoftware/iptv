<?php
include 'db.php';
$channelInfo = $_GET["channel-info"];
/*$ip = $_SERVER["REMOTE_ADDR"];
$userId = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'")->fetch_assoc()["user_id"];*/
session_id("jossstream");
session_start();
$userId = $_SESSION["jossstream_user_id"];
$c->query("INSERT INTO favorites (id, user_id, favorite) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $channelInfo . "')");
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");