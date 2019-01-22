var xmlData;
var selectedStreamFormat = 0;

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
            var streamFormat = parseInt(xml.getElementsByTagName("stream-format")[0].childNodes[0].nodeValue);
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
    xmlData.getElementsByTagName("stream-format")[0].childNodes[0].nodeValue = selectedStreamFormat;
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