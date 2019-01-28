var pointerIndex = 0;
var selectedStreamFormat = 0;

$(document).ready(function() {
    if (Native.isAndroidTV() == 1) {
        $("#option1").css("background-color", "#3498db");
    }
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    loadSettings();
    if (getLanguage() == 1) {
        $("#text1").html("| Settings | Stream Format");
        $("#text2").html("STREAM FORMAT");
        $("#text3").html("SAVE");
        $("#text4").html("BACK");
    }
});

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var streamFormat = Native.readInt("stream_format", 0);
            selectOption(streamFormat);
            $("#loading-container").fadeOut(300);
        }
    });
}

function selectOption(option) {
    selectedStreamFormat = option;
    if (option == 0) {
        $("#mpeg-ts").find(".radio-inner").css("display", "block");
        $("#hls").find(".radio-inner").css("display", "none");
    } else if (option == 1) {
        $("#mpeg-ts").find(".radio-inner").css("display", "none");
        $("#hls").find(".radio-inner").css("display", "block");
    }
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    Native.writeInt("stream_format", selectedStreamFormat);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}

function setItemsBorder() {
    if (pointerIndex == 0) {
        $("#option1").css("background-color", "#3498db");
        $("#option2").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 1) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "#3498db");
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
        selectOption(0);
    } else if (pointerIndex == 1) {
        selectOption(1);
    } else if (pointerIndex == 2) {
        saveSettings();
    } else if (pointerIndex == 3) {
        window.history.back();
    }
}