<?php
include 'db.php';
/*$ip = $_SERVER["REMOTE_ADDR"];
$userId = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'")->fetch_assoc()["user_id"];*/
session_id("jossstream");
session_start();
//$userId = $_SESSION["jossstream_user_id"];
$userId = $_GET["user_id"];
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");
$name = $_GET["name"];
$username = $_GET["username"];
$city = $_GET["city"];
$profilePictureURL = $_GET["profile-picture-url"];
$results = $c->query("SELECT * FROM users WHERE username='" . $username . "'");
if ($results && $results->num_rows > 0 && $userId != $results->fetch_assoc()["id"]) {
    echo -1;
    return;
}
if ($profilePictureURL != "") {
    $c->query("UPDATE users SET name='" . $name . "', username='" . $username . "', city='" . $city . "', profile_picture_url='" . $profilePictureURL . "' WHERE id='" . $userId . "'");
} else {
    $c->query("UPDATE users SET name='" . $name . "', username='" . $username . "', city='" . $city . "' WHERE id='" . $userId . "'");
}