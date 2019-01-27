<?php
include 'db.php';
$ip = $_SERVER["REMOTE_ADDR"];
$c->query("DELETE FROM sessions WHERE ip='" . $ip . "'");