<?php
$settingsXML = $_POST["settings"];
file_put_contents("../systemdata/settings.xml", $settingsXML);