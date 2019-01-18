<?php
$imgFileName = $_POST["img-file-name"];
move_uploaded_file($_FILES["img-file"]["tmp_name"], "../userdata/imgs/" . $imgFileName);