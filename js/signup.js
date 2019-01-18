const SERVER_URL = "http://iptvjoss.com/iptv/php/";

function signup() {
    $("#error").css("display", "none");
    var phone = $("#phone").val();
    var password = $("#password").val();
    if (phone == '' || password == '') {
        alert("Mohon masukkan phone dan kata sandi");
        return;
    }
    if (password.length < 8) {
        $("#error").html("Masukkan kata sandi minimum 8 karakter");
        $("#error").css("display", "block");
        return;
    }
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/php/signup.php',
        data: {'phone': phone, 'username': randomString(), 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Success
                window.location.href = 'wait-for-confirmation.html';
            } else if (a == -1) {
                // User sudah ada
                $("#error").html("phone sudah digunakan");
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