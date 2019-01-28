var pointerIndex = 0;
var selectedPlayer = 0;

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
        $("#text1").html("| Settings | Default Player");
        $("#text2").html("DEFAULT PLAYER");
        $("#text3").html("Built-In (standard) player");
        $("#text4").html("VLC Player");
        $("#text5").html("MX Player");
        $("#text6").html("SAVE");
        $("#text7").html("BACK");
    }
});

function loadSettings() {
    selectedPlayer = Native.readInt("default_player", 0);
    selectOption(selectedPlayer);
    $("#loading-container").css("display", "none");
}

function selectOption(option) {
    selectedPlayer = option;
    if (option == 0) {
        $("#default").find(".radio-inner").css("display", "block");
        $("#vlc").find(".radio-inner").css("display", "none");
        $("#mx").find(".radio-inner").css("display", "none");
    } else if (option == 1) {
        $("#default").find(".radio-inner").css("display", "none");
        $("#vlc").find(".radio-inner").css("display", "block");
        $("#mx").find(".radio-inner").css("display", "none");
    } else if (option == 2) {
        $("#default").find(".radio-inner").css("display", "none");
        $("#vlc").find(".radio-inner").css("display", "none");
        $("#mx").find(".radio-inner").css("display", "block");
    }
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    Native.writeInt("default_player", selectedPlayer);
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
        $("#option3").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 1) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "rgba(255, 255, 255, .5)");
        $("#option3").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 2) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "rgba(255, 255, 255, .5)");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 3) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "");
        $("#save").css("width", "calc(50% - 36px)");
        $("#save").css("height", "34px");
        $("#save").css("border", "3px solid white");
        $("#back").css("width", "calc(50% - 30px)");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 4) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#back").css("width", "calc(50% - 36px)");
        $("#back").css("height", "34px");
        $("#back").css("border", "3px solid white");
    }
}

function downKey() {
    if (pointerIndex < 4) {
        pointerIndex++;
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
    if (pointerIndex == 3) {
        pointerIndex = 4;
    }
    setItemsBorder();
}
function leftKey() {
    if (pointerIndex == 4) {
        pointerIndex = 3;
    }
    setItemsBorder();
}

function enterKey() {
    if (pointerIndex == 0) {
        selectOption(0);
    } else if (pointerIndex == 1) {
        selectOption(1);
    } else if (pointerIndex == 2) {
        selectOption(2);
    } else if (pointerIndex == 3) {
        saveSettings();
    } else if (pointerIndex == 4) {
        window.history.back();
    }
}