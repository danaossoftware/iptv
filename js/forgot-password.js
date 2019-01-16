function sendResetEmail() {
    var email = $("#email").val();
    if (email == '') {
        return;
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+"send-reset-email.php",
        data: {'email': email},
        dataType: 'text',
        cache: false,
        success: function(a) {

        }
    });
}