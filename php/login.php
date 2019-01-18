<?php
include 'db.php';
$phone = $_GET["phone"];
$password = $_GET["password"];
$results = $c->query("SELECT * FROM users WHERE phone='" . $phone . "' AND password='" . $password . "'");
if ($results && $results->num_rows > 0) {
    session_id("iptv");
    session_start();
    $_SESSION["userid"] = $results->fetch_assoc()["id"];
    echo 0;
} else {
    echo -1;
}