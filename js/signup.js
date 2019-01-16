function signup() {
    $("#error").css("display", "none");
    var email = $("#email").val();
    var password = $("#password").val();
    if (email == '' || password == '') {
        alert("Mohon masukkan email dan kata sandi");
        return;
    }
    if (password.length < 8) {
        $("#error").html("Masukkan kata sandi minimum 8 karakter");
        $("#error").css("display", "block");
        return;
    }
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/tv/php/signup.php',
        data: {'email': email, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Success
                window.location.href = 'home.html';
            } else if (a == -1) {
                // User sudah ada
                $("#error").html("Email sudah digunakan");
                $("#error").css("display", "block");
            }
        }
    });
}