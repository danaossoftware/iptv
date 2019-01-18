<?php
session_start();
if (isset($_SESSION["iptvjoss_user_id"]) && $_SESSION["iptvjoss_user_id"] != '') {
    echo 0;
} else {
    echo -1;
}