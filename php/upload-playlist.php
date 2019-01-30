<?php
$playlistData = $_POST["data"];
$name = $_POST["name"];
if (!file_exists("../playlists/")) {
    mkdir("../playlists/", 0777);
}
file_put_contents("../playlists/" . $name, $playlistData);