var pointerIndex = 0;

$(document).ready(function () {
    if (Native.isAndroidTV() == 1) {
        $("#epg-time-shift").css("border", "3px solid #3498db");
        $("#epg-time-shift").css("width", "calc(100% - 16px)");
        $("#epg-time-shift").css("height", "24px");
    }
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function () {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    loadSettings();
    if (getLanguage() == 1) {
        $("#text1").html("| Settings | EPG Time Shift");
        $("#text2").html("SAVE");
        $("#text3").html("BACK");
    }
});

function loadSettings() {
    var epgTimeShift = Native.readInt("epg_time_shift", 0);
    $("#epg-time-shift").val(epgTimeShift);
    $("#loading-container").fadeOut(300);
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    var epgTimeShift = parseInt($("#epg-time-shift").val());
    Native.writeInt("epg_time_shift", epgTimeShift);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}

function setItemsBorder() {
    if (pointerIndex == 0) {
        $("#epg-time-shift").css("border", "3px solid #3498db");
        $("#epg-time-shift").css("width", "calc(100% - 16px)");
        $("#epg-time-shift").css("height", "24px");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 1) {
        $("#epg-time-shift").css("border", "0");
        $("#epg-time-shift").css("width", "calc(100% - 20px)");
        $("#epg-time-shift").css("height", "30px");
        $("#save").css("width", "calc(50% - 36px)");
        $("#save").css("height", "34px");
        $("#save").css("border", "3px solid #3498db");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 2) {
        $("#epg-time-shift").css("border", "0");
        $("#epg-time-shift").css("width", "calc(100% - 20px)");
        $("#epg-time-shift").css("height", "30px");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 36px)");
        $("#back").css("height", "34px");
        $("#back").css("border", "3px solid #3498db");
    }
}

function enterKey() {
    if (pointerIndex == 0) {
        Native.showEditTextDialog(1, getLanguage(), "EPG Time Shift", $("#epg-time-shift").val());
    } else if (pointerIndex == 1) {
        saveSettings();
    } else if (pointerIndex == 2) {
        window.history.back();
    }
}

function downKey() {
    if (pointerIndex == 0) {
        pointerIndex = 1;
    }
    setItemsBorder();
}

function upKey() {
    if (pointerIndex > 0) {
        pointerIndex--;
    }
    setItemsBorder();
}

function rightKey() {
    if (pointerIndex == 1) {
        pointerIndex = 2;
    }
    setItemsBorder();
}

function leftKey() {
    if (pointerIndex == 2) {
        pointerIndex = 1;
    }
    setItemsBorder();
}

function editTextFinised(code, value) {
    if (code == 1) {
        $("#epg-time-shift").val(value);
    }
}