const SERVER_URL = "http://iptvjoss.com/iptv/php/";

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
    var rememberMe = 0;
    if ($("#remember-me").prop("checked") == true) {
        rememberMe = 1;
    }
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/php/login.php',
        data: {'phone': phone, 'password': password, 'remember-me': rememberMe},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Success
                window.location.href = 'landing.html';
            } else {
                Native.show("Response: "+a);
                var response = parseInt(a);
                if (response == -1) {
                    // User not found
                    $("#error").html("User tidak ditemukan");
                    $("#error").css("display", "block");
                } else if (response == -2) {
                    // User not confirmed
                    $("#alert-text").html("Maaf, akun Anda belum disetujui. Silahkan cek beberapa saat lagi sampai admin menyetujui akun Anda.");
                    $("#alert-container").css("display", "flex");
                } else if (response == -3) {
                    // Password not macthes
                    $("#alert-text").html("Kata sandi tidak cocok");
                    $("#alert-container").css("display", "flex");
                } else if (response == -4) {
                    // Maximum connections reached
                    $("#alert-text").html("Maaf, jumlah maksimum koneksi terlampaui. Silahkan keluar dari perangkat lain terlebih dahulu, atau hubungi admin.");
                    $("#alert-container").css("display", "flex");
                    $.ajax({
                        type: 'GET',
                        url: SERVER_URL+'get-configuration.php',
                        data: {'name': 'admin-info'},
                        dataType: 'text',
                        cache: false,
                        success: function(a) {
                            if (a < 0) {
                                // Error
                            } else {
                                $("#alert-text").html("Maaf, jumlah maksimum koneksi terlampaui. Silahkan keluar dari perangkat lain terlebih dahulu, atau hubungi admin di "+a["config1"].split("=")[1]+".");
                                $("#alert-container").css("display", "flex");
                            }
                        }
                    });
                }
            }
        }
    });
}

function backKey() {
    Native.finishApp();
}