<?php
include 'db.php';
$phone = $_GET["phone"];
$password = $_GET["password"];
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
    $c->query("UPDATE users SET active_connections = active_connections+1 WHERE id='" . $row["id"] . "'");
    session_start();
    $_SESSION["iptvjoss_user_id"] = $row["id"];
    echo 0;
} else {
    echo -1;
}