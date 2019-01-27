<?php
include 'db.php';
$ip = $_SERVER["REMOTE_ADDR"];
$results = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'");
if ($results && $results->num_rows > 0) {
    $userId = $results->fetch_assoc()["user_id"];
    $results = $c->query("SELECT * FROM sessions WHERE user_id='" . $userId . "'");
    echo $results->num_rows;
} else {
    echo 0;
}