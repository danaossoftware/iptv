<?php
include 'db.php';
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
echo json_encode($results->fetch_assoc());