<?php
/*include 'db.php';
$ip = $_SERVER["REMOTE_ADDR"];
$userId = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'")->fetch_assoc()["user_id"];
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");*/
//echo file_get_contents("../channels.m3u");
echo file_get_contents("https://iptvjoss.com/jossstreambe/channels.m3u");