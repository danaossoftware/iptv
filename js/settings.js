var pointerIndex = 0;

$(document).ready(function () {
    if (Native.isAndroidTV() == 1) {
        $("#general").css("width", "33%");
        $("#general").css("height", "90px");
        $("#general").css("margin-top", "-5px");
        $("#general").css("margin-left", "-5px");
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
        $("#general").css("width", "33%");
        $("#general").css("height", "90px");
        $("#general").css("margin-top", "-5px");
        $("#general").css("margin-left", "-5px");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 1) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 10px)");
        $("#epg-time-shift").css("height", "90px");
        $("#epg-time-shift").css("margin-top", "-5px");
        $("#epg-time-shift").css("margin-left", "5px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 2) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "33%");
        $("#stream-format").css("height", "90px");
        $("#stream-format").css("margin-top", "-5px");
        $("#stream-format").css("margin-left", "5px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 3) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "33%");
        $("#time-format").css("height", "90px");
        $("#time-format").css("margin-top", "15px");
        $("#time-format").css("margin-left", "-5px");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 4) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "33%");
        $("#epg-time-line").css("height", "90px");
        $("#epg-time-line").css("margin-top", "15px");
        $("#epg-time-line").css("margin-left", "5px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 5) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "33%");
        $("#automation").css("height", "90px");
        $("#automation").css("margin-top", "15px");
        $("#automation").css("margin-left", "5px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 6) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "33%");
        $("#control").css("height", "90px");
        $("#control").css("margin-top", "15px");
        $("#control").css("margin-left", "-5px");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 7) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "33%");
        $("#players").css("height", "90px");
        $("#players").css("margin-top", "15px");
        $("#players").css("margin-left", "5px");
        $("#player").css("width", "calc(33% - 10px)");
        $("#player").css("height", "80px");
        $("#player").css("margin-top", "20px");
        $("#player").css("margin-left", "10px");
    } else if (pointerIndex == 8) {
        $("#general").css("width", "calc(33% - 10px)");
        $("#general").css("height", "80px");
        $("#general").css("margin-top", "0");
        $("#general").css("margin-left", "0");
        $("#epg-time-shift").css("width", "calc(33% - 20px)");
        $("#epg-time-shift").css("height", "80px");
        $("#epg-time-shift").css("margin-top", "0");
        $("#epg-time-shift").css("margin-left", "10px");
        $("#stream-format").css("width", "calc(33% - 10px)");
        $("#stream-format").css("height", "80px");
        $("#stream-format").css("margin-top", "0");
        $("#stream-format").css("margin-left", "10px");
        $("#time-format").css("width", "calc(33% - 10px)");
        $("#time-format").css("height", "80px");
        $("#time-format").css("margin-top", "20px");
        $("#time-format").css("margin-left", "0");
        $("#epg-time-line").css("width", "calc(33% - 10px)");
        $("#epg-time-line").css("height", "80px");
        $("#epg-time-line").css("margin-top", "20px");
        $("#epg-time-line").css("margin-left", "10px");
        $("#automation").css("width", "calc(33% - 10px)");
        $("#automation").css("height", "80px");
        $("#automation").css("margin-top", "20px");
        $("#automation").css("margin-left", "10px");
        $("#control").css("width", "calc(33% - 10px)");
        $("#control").css("height", "80px");
        $("#control").css("margin-top", "20px");
        $("#control").css("margin-left", "0");
        $("#players").css("width", "calc(33% - 10px)");
        $("#players").css("height", "80px");
        $("#players").css("margin-top", "20px");
        $("#players").css("margin-left", "10px");
        $("#player").css("width", "33%");
        $("#player").css("height", "90px");
        $("#player").css("margin-top", "15px");
        $("#player").css("margin-left", "5px");
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