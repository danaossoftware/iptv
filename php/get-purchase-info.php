<?php
include 'db.php';
$type = $_GET["type"];
$results = $c->query("SELECT * FROM configuration WHERE id='price-info'");
$row = $results->fetch_assoc();
echo $row["config" . $type];