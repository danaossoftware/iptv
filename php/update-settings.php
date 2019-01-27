<?php
$settingsXML = $_POST["settings"];
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
file_put_contents("../systemdata/settings.xml", $settingsXML);