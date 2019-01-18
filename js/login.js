const SERVER_URL = "http://iptvjoss.com/iptv/php/";

function login() {
    $("#error").css("display", "none");
    var phone = $("#phone").val();
    var password = $("#password").val();
    if (phone == '' || password == '') {
        return;
    }
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/php/login.php',
        data: {'phone': phone, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Success
                window.location.href = 'home.html';
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