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
        $("#text1").html("| Settings | Automation");
        $("#text2").html("Refresh channels & movies automatically");
        $("#text3").html("Refresh EPG automatically");
        $("#text4").html("SAVE");
        $("#text5").html("BACK");
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
            var autoUpdateChannels = parseInt(xml.getElementsByTagName("automation")[0].getElementsByTagName("auto-update-channels")[0].childNodes[0].nodeValue);
            var autoUpdateEPG = parseInt(xml.getElementsByTagName("automation")[0].getElementsByTagName("auto-update-epg")[0].childNodes[0].nodeValue);
            if (autoUpdateChannels == 1) {
                $("#auto-update-channels").prop("checked", true);
            }
            if (autoUpdateEPG == 1) {
                $("#auto-update-epg").prop("checked", true);
            }
            $("#loading-container").fadeOut(300);
            setCheckBoxItemListener();
        }
    });
}

function setCheckBoxItemListener() {
    $(".checkbox-item").on("click", function() {
        var checked = $(this).find(".magic-checkbox").prop("checked");
        checked = !checked;
        $(this).find(".magic-checkbox").prop("checked", checked);
    });
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    var automation = xmlData.getElementsByTagName("automation")[0];
    var autoUpdateChannels = 0;
    if ($("#auto-update-channels").prop("checked")) {
        autoUpdateChannels = 1;
    }
    var autoUpdateEPG = 0;
    if ($("#auto-update-epg").prop("checked")) {
        autoUpdateEPG = 1;
    }
    automation.getElementsByTagName("auto-update-channels")[0].childNodes[0].nodeValue = autoUpdateChannels;
    automation.getElementsByTagName("auto-update-epg")[0].childNodes[0].nodeValue = autoUpdateEPG;
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