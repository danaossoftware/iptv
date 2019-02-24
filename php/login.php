<?php
include 'db.php';
$phone = $_GET["phone"];
$password = $_GET["password"];
$rememberMe = $_GET["remember-me"];
$results = $c->query("SELECT * FROM users WHERE phone='" . $phone . "' OR username='" . $phone . "'");
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
    $activeConnections = $row["active_connections"];
    $maximumConnections = $row["maximum_connections"];
    $userId = $row["id"];
    if ($activeConnections >= $maximumConnections) {
        echo -4;
        return;
    }
    $lastActive = round(microtime(true)*1000);
    /*$ip = $_SERVER["REMOTE_ADDR"];
    $c->query("INSERT INTO sessions (id, user_id, ip, last_active, remember_me) VALUES ('" . uniqid(). "', '" . $userId . "', '" . $ip . "', " . $lastActive . ", " . $rememberMe . ")");*/
    session_id("jossstream");
    session_start();
    $_SESSION["jossstream_user_id"] = $userId;
    $c->query("UPDATE users SET active_connections = active_connections + 1 WHERE id='" . $userId . "'");
    echo 0;
} else {
    echo -1;
}