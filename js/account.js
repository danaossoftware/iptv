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
            if (account["is_trial"] == "1") {
                $("#is-trial").html("YA");
            } else {
                $("#is-trial").html("TIDAK");
            }
            $("#active-connections").html(account["active_connections"]);
            var madeDate = new Date(parseInt(account["made_on"]));
            $("#made-on").html(madeDate.getDate()+" "+getMonthNames()[madeDate.getMonth()]+" "+madeDate.getFullYear());
            $("#maximum-connections").html(account["maximum_connections"]);
            $("#loading-container").fadeOut(300);
        }
    });
}