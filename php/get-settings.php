<?php
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$c->query("UPDATE users SET last_update=" . round(microtime(true)*1000) . " WHERE id='" . $userId . "'");
echo file_get_contents("../systemdata/settings.xml");