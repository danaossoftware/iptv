$(document).ready(function() {
    if (getLanguage() == 1) {
        $("#text1").html("RECORD");
    }
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-account.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var account = JSON.parse(a);
            var date = new Date(parseInt(account["end_date"]));
            if (getLanguage() == 0) {
                $("#expiry").html("Batas waktu: " + date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear());
            } else if (getLanguage() == 1) {
                $("#expiry").html("Expiration: " + date.getDate() + " " + getMonthName(date.getMonth()) + " " + date.getFullYear());
            }
        }
    });
});

function logout() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'logout.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            window.location.href = "login.html";
        }
    });
}

function backKey() {
    Native.finishApp();
}