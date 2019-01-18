<?php
include 'db.php';
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$_SESSION["iptvjoss_user_id"] = "";
unset($_SESSION["iptvjoss_user_id"]);
$c->query("UPDATE users SET active_connections = active_connections-1 WHERE id='" . $userId . "'");
session_destroy();