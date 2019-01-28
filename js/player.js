var pointerIndex = 0;
var xmlData;
var selectedDecoder = 0;

$(document).ready(function () {
    if (Native.isAndroidTV() == 1) {
        $("#option1").css("background-color", "#3498db");
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
        $("#text1").html("| Settings | Player Settings");
        $("#text2").html("PLAYER SETTINGS");
        $("#text3").html("Enable native decoder");
        $("#text4").html("Enable hardware decoder");
        $("#text5").html("Enable software decoder");
        $("#text6").html("Enable OpenSL ES");
        $("#text7").html("Enable OpenGL");
        $("#text8").html("SAVE");
        $("#text9").html("BACK");
    }
});

function loadSettings() {
    selectedDecoder = Native.readInt("selected_decoder", 0);
    selectDecoder(selectedDecoder);
    var enableOpenSLES = Native.readInt("enable_opensl_es", 0);
    var enableOpenGL = Native.readInt("enable_opengl", 0);
    if (enableOpenSLES == 1) {
        $("#enable-opensl-es").prop("checked", true);
    } else {
        $("#enable-opensl-es").prop("checked", false);
    }
    if (enableOpenGL == 1) {
        $("#enable-opengl").prop("checked", true);
    } else {
        $("#enable-opengl").prop("checked", false);
    }
    setCheckBoxListener();
    $("#loading-container").css("display", "none");
}

function setCheckBoxListener() {
    $(".checkbox-item").on("click", function () {
        var checked = $(this).find("input").prop("checked");
        checked = !checked;
        $(this).find("input").prop("checked", checked);
    });
}

function selectDecoder(option) {
    selectedDecoder = option;
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
    Native.writeInt("selected_decoder", selectedDecoder);
    var enableOpenSLES = 0;
    if ($("#enable-opensl-es").prop("checked") == true) {
        enableOpenSLES = 1;
    }
    var enableOpenGL = 0;
    if ($("#enable-opengl").prop("checked") == true) {
        enableOpenGL = 1;
    }
    Native.writeInt("enable_opensl_es", enableOpenSLES);
    Native.writeInt("enable_opengl", enableOpenGL);
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
        $("#option3").css("background-color", "");
        $("#option4").css("background-color", "");
        $("#option5").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 30px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#option1").offset().top
        }, 0);
    } else if (pointerIndex == 1) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "#3498db");
        $("#option3").css("background-color", "");
        $("#option4").css("background-color", "");
        $("#option5").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 30px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#option2").offset().top
        }, 0);
    } else if (pointerIndex == 2) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "#3498db");
        $("#option4").css("background-color", "");
        $("#option5").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 30px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#option3").offset().top
        }, 0);
    } else if (pointerIndex == 3) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "");
        $("#option4").css("background-color", "#3498db");
        $("#option5").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 30px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#option4").offset().top
        }, 0);
    } else if (pointerIndex == 4) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "");
        $("#option4").css("background-color", "");
        $("#option5").css("background-color", "#3498db");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 30px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#option5").offset().top
        }, 0);
    } else if (pointerIndex == 5) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "");
        $("#option4").css("background-color", "");
        $("#option5").css("background-color", "");
        $("#save").css("width", "calc(50% - 36px)");
        $("#save").css("height", "34px");
        $("#save").css("border", "3px solid white");
        $("#close").css("width", "calc(50% - 30px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#save").offset().top
        }, 0);
    } else if (pointerIndex == 6) {
        $("#option1").css("background-color", "");
        $("#option2").css("background-color", "");
        $("#option3").css("background-color", "");
        $("#option4").css("background-color", "");
        $("#option5").css("background-color", "");
        $("#save").css("width", "calc(50% - 30px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 36px)");
        $("#close").css("height", "34px");
        $("#close").css("border", "3px solid white");
        $("html, body").animate({
            scrollTop: $("#close").offset().top
        }, 0);
    }
}

function downKey() {
    if (pointerIndex < 6) {
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
    if (pointerIndex == 5) {
        pointerIndex = 6;
    }
    setItemsBorder();
}

function leftKey() {
    if (pointerIndex == 6) {
        pointerIndex = 5;
    }
    setItemsBorder();
}

function enterKey() {
    if (pointerIndex == 0) {
        selectDecoder(0);
    } else if (pointerIndex == 1) {
        selectDecoder(1);
    } else if (pointerIndex == 2) {
        selectDecoder(2);
    } else if (pointerIndex == 3) {
        $("#enable-opensl-es").prop("checked", !$("#enable-opensl-es").prop("checked"));
    } else if (pointerIndex == 4) {
        $("#enable-opengl").prop("checked", !$("#enable-opengl").prop("checked"));
    } else if (pointerIndex == 5) {
        saveSettings();
    } else if (pointerIndex == 6) {
        window.history.back();
    }
}