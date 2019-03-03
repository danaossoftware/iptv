<?php
include 'db.php';
$username = $_POST["username"];
$results = $c->query("SELECT * FROM users WHERE username='" . $username . "'");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    echo -1;
}