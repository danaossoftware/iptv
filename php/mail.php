<?php
function sendMail($from, $dst, $subject, $msg) {
    $to = $dst;
    $message = $msg;
    $headers = "From: " . $from . " . \r\n" .
        "Reply-To: " . $from . " . \r\n" .
        "Content-type: text/html; charset=utf-8" . "\r\n" .
        "X-Mailer: PHP/" . phpversion();
    mail($to, $subject, $message, $headers);
}