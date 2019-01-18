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
        url: 'http://localhost/iptv/php/signup.php',
        data: {'phone': phone, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {

            if (a == 0) {
                // Success
                window.location.href = 'home.html';
            } else if (a == -1) {
                // User sudah ada
                $("#error").html("phone sudah digunakan");
                $("#error").css("display", "block");
            }
        }
    });
}