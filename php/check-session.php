<?php
echo "Hello, world";
return;
session_start();
if (isset($_SESSION["iptv_user_id"]) && $_SESSION["iptv_user_id"] != '') {
    echo 0;
} else {
    echo -1;
}