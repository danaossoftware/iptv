<?php
include 'db.php';
$phone = $_GET["phone"];
$password = $_GET["password"];
$rememberMe = $_GET["remember-me"];
$results = $c->query("SELECT * FROM users WHERE phone='" . $phone . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $confirmed = $row["confirmed"];
    if ($confirmed == 0) {
        echo -2;
        return;
    }
    if ($row["password"] != $password) {
        echo -3;
        return;
    }
    $maximumConnections = $row["maximum_connections"];
    $userId = $row["id"];
    $results2 = $c->query("SELECT * FROM sessions WHERE user_id='" . $userId . "'");
    if ($results2->num_rows >= $maximumConnections) {
        echo -4;
        return;
    }
    $lastActive = round(microtime(true)*1000);
    $c->query("INSERT INTO sessions (id, user_id, ip, last_active, remember_me) VALUES ('" . uniqid(). "', '" . $userId . "', '" . $ip . "', " . $lastActive . ", " . $rememberMe . ")");
    echo 0;
} else {
    echo -1;
}