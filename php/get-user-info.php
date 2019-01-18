<?php
include 'db.php';
session_id("iptv");
session_start();
$userId = $_SESSION["userid"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    echo -1;
}