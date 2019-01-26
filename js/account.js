$(document).ready(function() {
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    loadSettings();
});

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-account.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var account = JSON.parse(a);
            $("#username").html(account["username"]);
            var endDate = new Date(parseInt(account["end_date"]));
            $("#end-date").html(endDate.getDate()+" "+getMonthNames(endDate.getMonth())+" "+endDate.getFullYear());
            if (account["is_trial"] == "true") {

            }
        }
    });
}