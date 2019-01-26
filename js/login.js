const SERVER_URL = "http://danaos.xyz/iptv/php/";

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

function login() {
    $("#error").css("display", "none");
    var phone = $("#phone").val();
    var password = $("#password").val();
    if (phone == '' || password == '') {
        return;
    }
    var rememberMe = false;
    if ($("#remember-me").prop("checked") == true) {
        rememberMe = true;
    }
    $.ajax({
        type: 'GET',
        url: 'http://danaos.xyz/iptv/php/login.php',
        data: {'phone': phone, 'password': password, 'remember-me': rememberMe},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Success
                window.location.href = 'landing.html';
            } else if (a == -1) {
                // User not found
                $("#error").html("User tidak ditemukan");
                $("#error").css("display", "block");
            } else if (a == -2) {
                // User not confirmed
                $("#alert-text").html("Maaf, akun Anda belum disetujui. Silahkan cek beberapa saat lagi sampai admin menyetujui akun Anda.");
                $("#alert-container").css("display", "flex");
            } else if (a == -3) {
                // Password not macthes
                $("#alert-text").html("Kata sandi tidak cocok");
                $("#alert-container").css("display", "flex");
            }
        }
    });
}