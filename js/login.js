var currentIndex = -1;
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

function login() {
    $("#error-container").css("display", "none");
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
        url: 'https://iptvjoss.com/iptv/php/login.php',
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
                    $("#error-container").css("display", "flex");
                } else if (response == -2) {
                    // User not confirmed
                    $("#error").html("Maaf, akun Anda belum disetujui. Silahkan cek beberapa saat lagi sampai admin menyetujui akun Anda.");
                    $("#error-container").css("display", "flex");
                } else if (response == -3) {
                    // Password not macthes
                    $("#error").html("Kata sandi tidak cocok");
                    $("#error-container").css("display", "flex");
                } else if (response == -4) {
                    // Maximum connections reached
                    $("#error").html("Maaf, jumlah maksimum koneksi terlampaui. Silahkan keluar dari perangkat lain terlebih dahulu, atau hubungi admin.");
                    $("#error-container").css("display", "flex");
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
                                $("#error").html("Maaf, jumlah maksimum koneksi terlampaui. Silahkan keluar dari perangkat lain terlebih dahulu, atau hubungi admin di "+a["config1"].split("=")[1]+".");
                                $("#error-container").css("display", "flex");
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

function closeErrorDialog() {
    $("#error-container").fadeOut(300);
}

function downKey() {
    if (currentIndex < 4) {
        currentIndex++;
    }
    focusToIndex();
}

function upKey() {
    if (currentIndex > 0) {
        currentIndex--;
    }
    focusToIndex();
}

function enterKey() {
    if (currentIndex == 2) {
        login();
    } else if (currentIndex == 3) {
        var checked = $("#remember-me").prop("checked");
        Native.log("Checked: "+checked);
        if (checked) {
            $("#remember-me").prop("checked", false);
        } else {
            $("#remember-me").prop("checked", true);
        }
    } else if (currentIndex == 4) {
        window.location.href = "signup.html";
    }
    disableKeyListener();
}

function focusToIndex() {
    Native.log("Current index: "+currentIndex);
    disableKeyListener();
    switch (currentIndex) {
        case 0:
            $("#phone").focus();
            break;
        case 1:
            $("#password").focus();
            break;
        default:
            hideKeyboard();
            break;
    }
}

function disableKeyListener() {
    Native.disableKeyListener();
}