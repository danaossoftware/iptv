<?php
include 'db.php';
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");
$results = $c->query("SELECT * FROM notifications");
if ($results && $results->num_rows > 0) {
    $notifications = [];
    while ($row = $results->fetch_assoc()) {
        array_push($notifications, $row);
    }
    echo json_encode($notifications);
} else {
    echo 0;
}