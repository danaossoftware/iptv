function login() {
    $("#error").css("display", "none");
    var phone = $("#phone").val();
    var password = $("#password").val();
    if (phone == '' || password == '') {
        return;
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost/iptv/php/login.php',
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
            }
        }
    });
}