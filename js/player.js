var xmlData;
var selectedDecoder = 0;

$(document).ready(function () {
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