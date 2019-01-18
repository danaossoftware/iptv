<?php
include 'db.php';
$name = $_GET["name"];
$username = $_GET["username"];
$city = $_GET["city"];
$results = $c->query("SELECT * FROM users WHERE username='" . $username . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$c->query("UPDATE users SET name='" . $name . "', username='" . $username . "', city='" . $city . "' WHERE id='" . $userId . "'");