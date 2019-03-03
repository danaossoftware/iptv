<?php
include 'db.php';
$phone = $_POST["phone"];
$results = $c->query("SELECT * FROM users WHERE phone='" . $phone . "'");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    echo -1;
}