<?php
include 'db.php';
$name = $_GET["name"];
$results = $c->query("SELECT * FROM configuration WHERE id='" . $name . "'");
if ($results && $results->num_rows > 0) {
    echo json_encode($results->fetch_assoc());
} else {
    echo -1;
}