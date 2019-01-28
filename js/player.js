var xmlData;
var selectedDecoder = 0;

$(document).ready(function() {
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
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
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(a, "text/xml");
            xmlData = xml;
            var player = xml.getElementsByTagName("player")[0];
            selectedDecoder = player.getElementsByTagName("decoder")[0].childNodes[0].nodeValue;
            selectDecoder(selectedDecoder);
            var enableOpenSLES = player.getElementsByTagName("enable-opensl-es")[0].childNodes[0].nodeValue;
            var enableOpenGL = player.getElementsByTagName("enable-opengl")[0].childNodes[0].nodeValue;
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
    });
}

function setCheckBoxListener() {
    $(".checkbox-item").on("click", function() {
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
    var player = xmlData.getElementsByTagName("player")[0];
    player.getElementsByTagName("decoder")[0].childNodes[0].nodeValue = selectedDecoder;
    var enableOpenSLES = 0;
    if ($("#enable-opensl-es").prop("checked") == true) {
        enableOpenSLES = 1;
    }
    var enableOpenGL = 0;
    if ($("#enable-opengl").prop("checked") == true) {
        enableOpenGL = 1;
    }
    player.getElementsByTagName("enable-opensl-es")[0].childNodes[0].nodeValue = enableOpenSLES;
    player.getElementsByTagName("enable-opengl")[0].childNodes[0].nodeValue = enableOpenGL;
    var fd = new FormData();
    fd.append("settings", new XMLSerializer().serializeToString(xmlData));
    $.ajax({
        type: 'POST',
        url: SERVER_URL+'update-settings.php',
        data: fd,
        processData: false,
        contentType: false,
        success: function(a) {
            $("#loading-container").fadeOut(300);
        }
    });
}