<?php
include 'db.php';
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$_SESSION["iptvjoss_user_id"] = "";
unset($_SESSION["iptvjoss_user_id"]);
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $row = $results->fetch_assoc();
    $activeConnections = $row["active_connections"];
    $ip = $_SERVER["REMOTE_ADDR"];
    $a = explode(";", $activeConnections);
    $c = "";
    for ($i=0; $i<sizeof($a); $i+=2) {
        $b = $a[$i];
        if ($b != $ip) {
            $c .= $b;
            $c .= ";";
            $c .= $a[$i+1];
            $c .= ";";
        }
    }
    $c = substr($c, 0, strlen($c)-1);
    $activeConnections = $c;
    $c->query("UPDATE users SET active_connections=" . $activeConnections . " WHERE id='" . $userId . "'");
    session_destroy();
}