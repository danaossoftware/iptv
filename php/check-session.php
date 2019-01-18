<?php
session_id("iptv");
session_start();
if (isset($_SESSION["userid"]) && $_SESSION["userid"] != '') {
    echo 0;
} else {
    echo -1;
}