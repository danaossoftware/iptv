var pointerIndex = 0;
// 0 = Live TV
// 1 = Movies
// 2 = VIP
// 3 = Record
// 4 = Notifications
// 5 = Profile
// 6 = Settings
// 7 = Log Out

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
    } else if (pointerIndex >= 4 && pointerIndex < 7) {
        pointerIndex++;
    }
    setMenuItemBorder();
}

function downKey() {
    if (pointerIndex == 0 || pointerIndex == 1 || pointerIndex == 2) {
        pointerIndex = 3;
    } else {
        pointerIndex = 0;
    }
    setMenuItemBorder();
}

function upKey() {
    if (pointerIndex == 3) {
        pointerIndex = 0;
    } else {
        pointerIndex = 4;
    }
    setMenuItemBorder();
}

function leftKey() {
    if (pointerIndex > 0 && pointerIndex <= 3) {
        pointerIndex--;
    } else if (pointerIndex > 4 && pointerIndex <= 7) {
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
    } else if (pointerIndex == 3) {
        window.location.href = "notifications.html";
    } else if (pointerIndex == 4) {
        window.location.href = "account.html";
    } else if (pointerIndex == 5) {
        window.location.href = "settings.html";
    } else if (pointerIndex == 6) {
        logout();
    }
}

function setMenuItemBorder() {
    if (pointerIndex == 0) {
        $("#live-tv").css("border", "3px solid white");
        $("#live-tv").css("width", "144px");
        $("#live-tv").css("height", "144px");
        $("#movies").css("border", "0");
        $("#movies").css("width", "150px");
        $("#movies").css("height", "100px");
        $("#adult").css("border", "0");
        $("#adult").css("width", "150px");
        $("#adult").css("height", "100px");
        $("#record").css("border", "0");
        $("#record").css("width", "calc(100% - 10px)");
        $("#record").css("height", "30px");
        $("#notifications").css("border", "0");
        $("#profile").css("border", "0");
        $("#settings").css("border", "0");
        $("#logout").css("border", "0");
    } else if (pointerIndex == 1) {
        $("#live-tv").css("border", "0");
        $("#live-tv").css("width", "150px");
        $("#live-tv").css("height", "150px");
        $("#movies").css("border", "3px solid white");
        $("#movies").css("width", "144px");
        $("#movies").css("height", "94px");
        $("#adult").css("border", "0");
        $("#adult").css("width", "150px");
        $("#adult").css("height", "100px");
        $("#record").css("border", "0");
        $("#record").css("width", "calc(100% - 10px)");
        $("#record").css("height", "30px");
        $("#notifications").css("border", "0");
        $("#profile").css("border", "0");
        $("#settings").css("border", "0");
        $("#logout").css("border", "0");
    } else if (pointerIndex == 2) {
        $("#live-tv").css("border", "0");
        $("#live-tv").css("width", "150px");
        $("#live-tv").css("height", "150px");
        $("#movies").css("border", "0");
        $("#movies").css("width", "150px");
        $("#movies").css("height", "100px");
        $("#adult").css("border", "3px solid white");
        $("#adult").css("width", "144px");
        $("#adult").css("height", "94px");
        $("#record").css("border", "0");
        $("#record").css("width", "calc(100% - 10px)");
        $("#record").css("height", "30px");
        $("#notifications").css("border", "0");
        $("#profile").css("border", "0");
        $("#settings").css("border", "0");
        $("#logout").css("border", "0");
    } else if (pointerIndex == 3) {
        $("#live-tv").css("border", "0");
        $("#live-tv").css("width", "150px");
        $("#live-tv").css("height", "150px");
        $("#movies").css("border", "0");
        $("#movies").css("width", "150px");
        $("#movies").css("height", "100px");
        $("#adult").css("border", "0");
        $("#adult").css("width", "150px");
        $("#adult").css("height", "100px");
        $("#record").css("border", "3px solid white");
        $("#record").css("width", "calc(100% - 16px)");
        $("#record").css("height", "24px");
        $("#notifications").css("border", "0");
        $("#profile").css("border", "0");
        $("#settings").css("border", "0");
        $("#logout").css("border", "0");
    } else if (pointerIndex == 4) {
        $("#live-tv").css("border", "0");
        $("#movies").css("border", "0");
        $("#adult").css("border", "0");
        $("#record").css("border", "0");
        $("#notifications").css("border", "2px solid white");
        $("#profile").css("border", "0");
        $("#settings").css("border", "0");
        $("#logout").css("border", "0");
    } else if (pointerIndex == 5) {
        $("#live-tv").css("border", "0");
        $("#movies").css("border", "0");
        $("#adult").css("border", "0");
        $("#record").css("border", "0");
        $("#notifications").css("border", "0");
        $("#profile").css("border", "2px solid white");
        $("#settings").css("border", "0");
        $("#logout").css("border", "0");
    } else if (pointerIndex == 6) {
        $("#live-tv").css("border", "0");
        $("#movies").css("border", "0");
        $("#adult").css("border", "0");
        $("#record").css("border", "0");
        $("#notifications").css("border", "0");
        $("#profile").css("border", "0");
        $("#settings").css("border", "2px solid white");
        $("#logout").css("border", "0");
    } else if (pointerIndex == 7) {
        $("#live-tv").css("border", "0");
        $("#movies").css("border", "0");
        $("#adult").css("border", "0");
        $("#record").css("border", "0");
        $("#notifications").css("border", "0");
        $("#profile").css("border", "0");
        $("#settings").css("border", "0");
        $("#logout").css("border", "2px solid white");
    }
}