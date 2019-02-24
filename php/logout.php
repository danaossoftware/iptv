<?php
include 'db.php';
/*$ip = $_SERVER["REMOTE_ADDR"];
$c->query("DELETE FROM sessions WHERE ip='" . $ip . "'");*/
session_id("jossstream");
session_start();
unset($_SESSION["jossstream_user_id"]);