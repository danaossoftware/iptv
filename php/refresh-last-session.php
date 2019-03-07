<?php
include 'db.php';
$userId = $_POST["user_id"];
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");