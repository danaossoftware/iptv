<?php
include 'db.php';
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