<?php
session_start();
$userId = $_SESSION["iptvjoss_user_id"];
$results = $c->query("SELECT * FROM users WHERE id='" . $userId . "'");
$imgFileName = $_POST["img-file-name"];
move_uploaded_file($_FILES["img-file"]["tmp_name"], "../userdata/imgs/" . $imgFileName);