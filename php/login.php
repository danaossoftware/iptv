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
    $c->query("UPDATE users SET active_connections = active_connections+1 WHERE id='" . $row["id"] . "'");
    session_start();
    $_SESSION["iptvjoss_user_id"] = $row["id"];
    if ($rememberMe == 1) {
        $params = session_get_cookie_params();
        setcookie(session_name(), $_COOKIE[session_name()], time() + 1*24*60*60, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }
    echo 0;
} else {
    echo -1;
}