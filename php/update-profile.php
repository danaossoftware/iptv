<?php
include 'db.php';
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
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