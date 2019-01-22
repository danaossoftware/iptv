var xmlData;
var selectedPlayer = 0;

$(document).ready(function() {
    loadSettings();
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
            selectedPlayer = xml.getElementsByTagName("player")[0].childNodes[0].nodeValue;
            selectOption(selectedPlayer);
            $("#loading-container").css("display", "none");
        }
    });
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
    xmlData.getElementsByTagName("player")[0].childNodes[0].nodeValue = selectedPlayer;
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