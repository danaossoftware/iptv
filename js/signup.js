const SERVER_URL = "https://iptvjoss.com/iptv/php/";

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                window.location.href = "landing.html";
            }
        }
    });
});

function signup() {
    $("#error").css("display", "none");
    var phone = $("#phone").val().trim();
    var password = $("#password").val().trim();
    var username = $("#username").val().trim();
    if (phone == '') {
        $("#error").html("Mohon masukkan no. HP");
        $("#error").css("display", "block");
        return;
    }
    if (username == '') {
        $("#error").html("Mohon masukkan username");
        $("#error").css("display", "block");
        return;
    }
    if (password == '') {
        $("#error").html("Mohon masukkan kata sandi");
        $("#error").css("display", "block");
        return;
    }
    if (password.length < 8) {
        $("#error").html("Masukkan kata sandi minimum 8 karakter");
        $("#error").css("display", "block");
        return;
    }
    if (!validatePhoneNumber(phone)) {
        $("#error").html("Mohon periksa nomor telepon Anda");
        $("#error").show();
        return;
    }
    $("#loading-container").css("display", "flex");
    $.ajax({
        type: 'GET',
        url: 'https://iptvjoss.com/iptv/php/signup.php',
        data: {'phone': phone, 'username': username, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#loading-container").css("display", "none");
            if (a == 0) {
                // Success
                window.location.href = 'wait-for-confirmation.html';
            } else if (a == -2) {
                // User sudah ada
                $("#error").html("Nomor handphone sudah digunakan");
                $("#error").css("display", "block");
            }
        }
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function validatePhoneNumber(phone) {
    var isPhone = true;
    for (var i=0; i<phone.length; i++) {
        var char = phone.charAt(i);
        if (char < '0' || char > '9') {
            isPhone = false;
            break;
        }
    }
    return isPhone;
}

function backKey() {
    Native.finishApp();
}