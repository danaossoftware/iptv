var xmlData;
var selectedTimeFormat = 0;

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
        $("#text1").html("| Settings | Time Format");
        $("#text2").html("TIME FORMAT");
        $("#text3").html("12 Hours");
        $("#text4").html("24 Hours");
        $("#text5").html("SAVE");
        $("#text6").html("BACK");
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
            var timeFormat = parseInt(xml.getElementsByTagName("time-format")[0].childNodes[0].nodeValue);
            selectOption(timeFormat);
            $("#loading-container").fadeOut(300);
        }
    });
}

function selectOption(option) {
    selectedTimeFormat = option;
    if (option == 0) {
        $("#hours-24").find(".radio-inner").css("display", "block");
        $("#hours-12").find(".radio-inner").css("display", "none");
    } else if (option == 1) {
        $("#hours-24").find(".radio-inner").css("display", "none");
        $("#hours-12").find(".radio-inner").css("display", "block");
    }
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    xmlData.getElementsByTagName("time-format")[0].childNodes[0].nodeValue = selectedTimeFormat;
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