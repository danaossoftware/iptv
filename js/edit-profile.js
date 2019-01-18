$(document).ready(function() {
    loadProfile();
});

function loadProfile() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/iptv/php/get-user-info.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                $("#loading-container").css("display", "none");
                var user = JSON.parse(a);
                $("#name").val(user["name"]);
                $("#username").val(user["username"]);
                $("#city").val(user["city"]);
            }
        }
    });
}

function cancelEdittingProfile() {
    window.history.back();
}

function saveEdittedProfile() {
    $("#error").css("display", "none");
    var name = $("#name").val();
    var username = $("#username").val();
    var city = $("#city").val();
    if (name == '') {
        $("#error").html("Nama tidak boleh kosong");
        $("#error").css("display", "block");
        return;
    }
    if (username == '') {
        $("#error").html("Nama pengguna tidak boleh kosong");
        $("#error").css("display", "block");
        return;
    }
    $("#loading-container").css("display", "flex");
    $.ajax({
        type: 'GET',
        url: 'http://localhost/iptv/php/update-profile.php',
        data: {'name': name, 'username': username, 'city': city},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == -1) {
                $("#error").html("Maaf, nama pengguna sudah digunakan");
                $("#error").css("display", "block");
            } else {
                window.location.href = "home.html";
            }
        },
        error: function(a, b, c) {
        }
    });
}