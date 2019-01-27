<?php
$settingsXML = $_POST["settings"];
$ip = $_SERVER["REMOTE_ADDR"];
$userId = $c->query("SELECT * FROM sessions WHERE ip='" . $ip . "'")->fetch_assoc()["user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
file_put_contents("../systemdata/settings.xml", $settingsXML);