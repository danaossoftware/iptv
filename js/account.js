var currentIndex = -1;

$(document).ready(function() {
    $("#loading-container").fadeOut(300);
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    if (getLanguage() == 1) {
        $("#text1").html("BACK TO HOME");
        $("#text2").html("Account Status:");
        $("#text3").html("Expiry:");
        $("#text4").html("Trial Account:");
        $("#text5").html("Active Connections:");
        $("#text6").html("Made On:");
        $("#text7").html("Maximum Connections:");
    }
    loadSettings();
});

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-account.php',
        data: {'user_id': Native.getUserID()},
        dataType: 'text',
        cache: false,
        success: function(a) {
            var account = JSON.parse(a);
            $("#username").html(account["username"]);
            var endDateInt = parseInt(account["end_date"].trim());
            if (endDateInt != 0) {
                var endDate = new Date(endDateInt);
                $("#end-date").html(endDate.getDate()+" "+getMonthName(endDate.getMonth())+" "+endDate.getFullYear());
            }
            if (account["is_trial"] == "1") {
                $("#is-trial").html("YA");
            } else {
                $("#is-trial").html("TIDAK");
            }
            var madeDateInt = parseInt(account["made_in"].trim());
            if (madeDateInt != 0) {
                var madeDate = new Date(madeDateInt);
                $("#made-in").html(madeDate.getDate() + " " + getMonthName([madeDate.getMonth()]) + " " + madeDate.getFullYear());
            }
            $("#maximum-connections").html(account["maximum_connections"]);
        }
    });
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-active-connections.php',
        data: {'user_id': Native.getUserID()},
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#active-connections").html(a);
        }
    });
}

function downKey() {
    if (currentIndex < 1) {
        currentIndex++;
    }
    focusToCurrentIndex();
}

function upKey() {
    if (currentIndex > 0) {
        currentIndex--;
    }
    focusToCurrentIndex();
}

function rightKey() {
    currentIndex = 1;
    focusToCurrentIndex();
}

function leftKey() {
    currentIndex = 0;
    focusToCurrentIndex();
}

function enterKey() {
    if (currentIndex == 0) {
        window.location.href='upgrade.html';
    } else if (currentIndex == 1) {
        window.location.href='landing.html';
    }
}

function focusToCurrentIndex() {
    if (currentIndex == 0) {
        $("#upgrade").css("border", "3px solid white").css("width", "194px").css("height", "34px");
        $("#back").css("border", "0").css("width", "200px").css("height", "40px");
    } else if (currentIndex == 1) {
        $("#upgrade").css("border", "0").css("width", "200px").css("height", "40px");
        $("#back").css("border", "3px solid white").css("width", "194px").css("height", "34px");
    }
}