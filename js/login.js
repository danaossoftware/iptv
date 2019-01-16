function login() {
    $("#error").css("display", "none");
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == '' || password == '') {
        return;
    }
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/php/login.php',
        data: {'email': email, 'password': password},
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