var xmlData;

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
        $("#text1").html("| Settings | EPG Time Shift");
        $("#text2").html("SAVE");
        $("#text3").html("BACK");

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
            var epgTimeShift = xml.getElementsByTagName("epgtimeshift")[0].childNodes[0].nodeValue;
            $("#epg-time-shift").val(epgTimeShift);
            $("#loading-container").fadeOut(300);
        }
    });
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    var epgTimeShift = $("#epg-time-shift").val();
    xmlData.getElementsByTagName("epgtimeshift")[0].childNodes[0].nodeValue = epgTimeShift;
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