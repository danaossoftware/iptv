<?php
include 'db.php';
$channelInfo = $_GET["channel-info"];
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$c->query("INSERT INTO favorites (id, user_id, favorite) VALUES ('" . uniqid() . "', '" . $userId . "', '" . $channelInfo . "')");