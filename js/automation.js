var pointerIndex = 0;

$(document).ready(function () {
    if (Native.isAndroidTV() == 1) {
        $("#option1").css("background-color", "rgba(255, 255, 255, .5)");
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
        $("#text1").html("| Settings | Automation");
        $("#text2").html("Refresh channels & movies automatically");
        $("#text3").html("Refresh EPG automatically");
        $("#text4").html("SAVE");
        $("#text5").html("BACK");
    }
});

function loadSettings() {
    var autoUpdateChannels = Native.readInt("auto_update_channels", 0);
    var autoUpdateEPG = Native.readInt("auto_update_epg", 0);
    if (autoUpdateChannels == 1) {
        $("#auto-update-channels").prop("checked", true);
    }
    if (autoUpdateEPG == 1) {
        $("#auto-update-epg").prop("checked", true);
    }
    $("#loading-container").fadeOut(300);
    setCheckBoxItemListener();
}

function setCheckBoxItemListener() {
    $(".checkbox-item").on("click", function () {
        var checked = $(this).find(".magic-checkbox").prop("checked");
        checked = !checked;
        $(this).find(".magic-checkbox").prop("checked", checked);
    });
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    var autoUpdateChannels = 0;
    if ($("#auto-update-channels").prop("checked")) {
        autoUpdateChannels = 1;
    }
    var autoUpdateEPG = 0;
    if ($("#auto-update-epg").prop("checked")) {
        autoUpdateEPG = 1;
    }
    Native.writeInt("auto_update_channels", autoUpdateChannels);
    Native.writeInt("auto_update_epg", autoUpdateEPG);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}

function setItemsBorder() {
    if (pointerIndex == 0) {
        $("#option1").css("background-color", "rgba(255, 255, 255, .5)");
        $("#option2").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 1) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "rgba(255, 255, 255, .5)");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 2) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#save").css("width", "calc(50% - 36px)");
        $("#save").css("height", "34px");
        $("#save").css("border", "3px solid white");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 3) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 36px)");
        $("#back").css("height", "34px");
        $("#back").css("border", "3px solid white");
    }
}

function downKey() {
    if (pointerIndex < 3) {
        pointerIndex++;
    }
    setItemsBorder();
}

function upKey() {
    if (pointerIndex > 0) {
        if (pointerIndex == 2 || pointerIndex == 3) {
            pointerIndex = 1;
        } else {
            pointerIndex--;
        }
    }
    setItemsBorder();
}

function rightKey() {
    if (pointerIndex == 2) {
        pointerIndex = 3;
    }
    setItemsBorder();
}

function leftKey() {
    if (pointerIndex == 3) {
        pointerIndex = 2;
    }
    setItemsBorder();
}

function enterKey() {
    if (pointerIndex == 0) {
        $("#auto-update-channels").prop("checked", !$("#auto-update-channels").prop("checked"));
    } else if (pointerIndex == 1) {
        $("#auto-update-epg").prop("checked", !$("#auto-update-epg").prop("checked"));
    } else if (pointerIndex == 2) {
        saveSettings();
    } else if (pointerIndex == 3) {
        window.history.back();
    }
}