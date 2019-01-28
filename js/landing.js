var pointerIndex = 0;
// 0 = Live TV
// 1 = Movies
// 2 = VIP
// 3 = Record

$(document).ready(function() {
    if (Native.isAndroidTV() == 1) {
        $("#live-tv").css("border", "3px solid white");
    }
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

function rightKey() {
    if (pointerIndex < 2) {
        pointerIndex++;
    }
    setMenuItemBorder();
}

function downKey() {
    pointerIndex = 3;
    setMenuItemBorder();
}

function upKey() {
    pointerIndex = 0;
    setMenuItemBorder();
}

function leftKey() {
    if (pointerIndex > 0) {
        pointerIndex--;
    }
    setMenuItemBorder();
}

function enterKey() {
    if (pointerIndex == 0) {
        window.location.href = "live-categories.html";
    } else if (pointerIndex == 1) {
        window.location.href = "movies.html"
    } else if (pointerIndex == 2) {
        window.location.href = "adult.html"
    } else if (pointerIndex == 3) {
        window.location.href = "recordings.html";
    }
}

function setMenuItemBorder() {
    if (pointerIndex == 0) {
        $("#live-tv").css("border", "3px solid white");
        $("#movies").css("border", "0");
        $("#adult").css("border", "0");
        $("#record").css("border", "0");
    } else if (pointerIndex == 1) {
        $("#live-tv").css("border", "0");
        $("#movies").css("border", "3px solid white");
        $("#adult").css("border", "0");
        $("#record").css("border", "0");
    } else if (pointerIndex == 2) {
        $("#live-tv").css("border", "0");
        $("#movies").css("border", "0");
        $("#adult").css("border", "3px solid white");
        $("#record").css("border", "0");
    } else if (pointerIndex == 3) {
        $("#live-tv").css("border", "0");
        $("#movies").css("border", "0");
        $("#adult").css("border", "0");
        $("#record").css("border", "3px solid white");
    }
}