<?php
include 'db.php';
/*$ip = $_SERVER["REMOTE_ADDR"];
$userId = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'")->fetch_assoc()["user_id"];
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");*/
$results = $c->query("SELECT * FROM notifications DESC");
if ($results && $results->num_rows > 0) {
    $notifications = [];
    while ($row = $results->fetch_assoc()) {
        array_push($notifications, $row);
    }
    echo json_encode($notifications);
} else {
    echo 0;
}