<?php
include 'db.php';
$email = $_GET["email"];
$password = $_GET["password"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "' AND password='" . $password . "'");
if ($results && $results->num_rows > 0) {
    session_start();
    $_SESSION["iptv_user_id"] = $results->fetch_assoc()["id"];
    echo 0;
} else {
    echo -1;
}