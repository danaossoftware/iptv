var pointerIndex = 0;

$(document).ready(function () {
    if (Native.isAndroidTV() == 1) {
        $("#general").css("background-color", "#3498db");
    }
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function () {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    if (getLanguage() == 1) {
        $("#text1").html("General");
        $("#text2").html("Stream Format");
        $("#text3").html("Time Format");
        $("#text4").html("Parental Control");
        $("#text5").html("Default Player");
        $("#text6").html("Player Settings");
        $("#text7").html("HOME");
        $("#text8").html("BACK");
        $("#text9").html("Password:");
        $("#text10").html("Repeat password:");
        $("#text11").html("Save");
        $("#text12").html("Close");
        $("#text13").html("SETTINGS");
    }
    $("#loading-container").fadeOut(300);
});

function setItemSizes() {
    if (pointerIndex == 0) {
        $("#general").css("background-color", "#3498db");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "white");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#general").offset().top
        }, 1000);
    } else if (pointerIndex == 1) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "#3498db");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "black");
        $("#text14").css("color", "white");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#general").offset().top
        }, 1000);
    } else if (pointerIndex == 2) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "#3498db");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "white");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#general").offset().top
        }, 1000);
    } else if (pointerIndex == 3) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "#3498db");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "white");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#time-format").offset().top
        }, 1000);
    } else if (pointerIndex == 4) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "#3498db");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "white");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#time-format").offset().top
        }, 1000);
    } else if (pointerIndex == 5) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "#3498db");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "white");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#time-format").offset().top
        }, 1000);
    } else if (pointerIndex == 6) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "#3498db");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "white");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#player").offset().top
        }, 1000);
    } else if (pointerIndex == 7) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "#3498db");
        $("#player").css("background-color", "white");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "white");
        $("#text6").css("color", "black");
        $("#items").animate({
            scrollTop: $("#player").offset().top
        }, 1000);
    } else if (pointerIndex == 8) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "#3498db");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "white");
        $("#items").animate({
            scrollTop: $("#player").offset().top
        }, 1000);
    }
}

function rightKey() {
    if (pointerIndex < 8) {
        pointerIndex++;
    }
    setItemSizes();
}

function leftKey() {
    if (pointerIndex > 0) {
        pointerIndex--;
    }
    setItemSizes();
}

function upKey() {
    if (pointerIndex > 2) {
        pointerIndex -= 3;
    }
    setItemSizes();
}

function downKey() {
    if (pointerIndex < 6) {
        pointerIndex += 3;
    }
    setItemSizes();
}

function enterKey() {
    if (pointerIndex == 0) {
        window.location.href = "settings/common.html";
    } else if (pointerIndex == 1) {
        window.location.href = "settings/epgtimeshift.html";
    } else if (pointerIndex == 2) {
        window.location.href = "settings/streamformat.html";
    } else if (pointerIndex == 3) {
        window.location.href = "settings/timeformat.html";
    } else if (pointerIndex == 4) {
        window.location.href = "settings/epgtimeline.html";
    } else if (pointerIndex == 5) {
        window.location.href = "settings/automation.html";
    } else if (pointerIndex == 6) {
        openControlDialog();
    } else if (pointerIndex == 7) {
        window.location.href = "settings/players.html";
    } else if (pointerIndex == 8) {
        window.location.href = "settings/player.html";
    }
}

function setPassword() {
    $("#error").css("display", "none");
    var password = $("#control-password").val();
    var repeatedPassword = $("#repeated-control-password").val();
    if (password == "" || repeatedPassword == "") {
        $("#error").html("Mohon isi kata sandi");
        $("#error").css("display", "block");
        return;
    }
    if (password != repeatedPassword) {
        $("#error").html("Kata sandi tidak cocok");
        $("#error").css("display", "block");
        return;
    }
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    $("#control-dialog-container").css("display", "none");
    Native.writeString("parental_control_password", password);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}

function openControlDialog() {
    $("#control-password").val("");
    $("#repeated-control-password").val("");
    $("#control-dialog-container").css("display", "flex").hide().fadeIn(300);
}

function closeControlDialog() {
    $("#control-dialog-container").fadeOut(300);
}

function saveSettings() {
}