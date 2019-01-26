<?php
$email = $_GET["email"];
include 'mail.php';
$url = "http://danaos.xyz/reset-password.html?email=" . $email;
sendMail("admin@danaos.xyz", $email, "Atur ulang kata sandi IPTVJoss", "<br/><img src='http://danaos.xyz/img/logo.png' width='80px' height='80px'><br/><br/><br/>Halo, " . $email . ", seseorang meminta untuk mengatur ulang kata sandi untuk akun ini. Salin dan tempel URL berikut di bilah alamat browser Anda:<br/><br/>" . $url . "<br/><br/><br/>Jika itu kesalahan, abaikan saja email ini.");