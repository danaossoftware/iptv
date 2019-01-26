var xmlData = null;
var selectedLanguage = 0;
var checkedLanguage = 0;

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
            var common = xml.getElementsByTagName("common")[0];
            var autoStart = parseInt(common.getElementsByTagName("autostart")[0].childNodes[0].nodeValue);
            var fullEPG = parseInt(common.getElementsByTagName("full-epg")[0].childNodes[0].nodeValue);
            var subtitle = parseInt(common.getElementsByTagName("active-subtitle")[0].childNodes[0].nodeValue);
            var userAgent = common.getElementsByTagName("user-agent")[0].childNodes[0].nodeValue;
            var language = parseInt(common.getElementsByTagName("language")[0].childNodes[0].nodeValue);
            selectedLanguage = language;
            if (autoStart == 1) {
                $("#auto-start").prop("checked", true);
            }
            if (fullEPG == 1) {
                $("#full-epg").prop("checked", true);
            }
            if (subtitle == 1) {
                $("#active-subtitle").prop("checked", true);
            }
            $("#user-agent").val(userAgent);
            if (language == 0) {
                $("#language-text").html("Bahasa Indonesia");
            } else if (language == 1) {
                $("#language-text").html("English");
            }
            $("#loading-container").fadeOut(300);
        }
    });
}

function saveSettings() {
    $("#loading-container").css("display", "flex");
    $("#loading-container").hide();
    $("#loading-container").fadeIn(300);
    var common = xmlData.getElementsByTagName("common")[0];
    if ($("#auto-start").prop("checked") == true) {
        common.getElementsByTagName("autostart")[0].childNodes[0].nodeValue = 1;
        Native.setStartAtBoot(true);
    } else {
        common.getElementsByTagName("autostart")[0].childNodes[0].nodeValue = 0;
        Native.setStartAtBoot(false);
    }
    if ($("#full-epg").prop("checked") == true) {
        common.getElementsByTagName("full-epg")[0].childNodes[0].nodeValue = 1;
    } else {
        common.getElementsByTagName("full-epg")[0].childNodes[0].nodeValue = 0;
    }
    if ($("#active-subtitle").prop("checked") == true) {
        common.getElementsByTagName("active-subtitle")[0].childNodes[0].nodeValue = 1;
        Native.enableSubtitle(true);
    } else {
        common.getElementsByTagName("active-subtitle")[0].childNodes[0].nodeValue = 0;
        Native.enableSubtitle(false);
    }
    var userAgent = $("#user-agent").val();
    common.getElementsByTagName("user-agent")[0].childNodes[0].nodeValue = userAgent;
    common.getElementsByTagName("language")[0].childNodes[0].nodeValue = selectedLanguage;
    Object.defineProperty(navigator, 'userAgent', {
        get: function () { return userAgent; }
    });
    var serializer = new XMLSerializer();
    var settingsXML = serializer.serializeToString(xmlData);
    var fd = new FormData();
    fd.append("settings", settingsXML);
    $.ajax({
        type: 'POST',
        url: SERVER_URL+'update-settings.php',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function(a) {
            $("#loading-container").fadeOut(300);
        }
    });
}

function selectLanguage(language) {
    checkedLanguage = language;
    if (checkedLanguage == 0) {
        $("#indonesian-check-img").css("visibility", "visible");
        $("#english-check-img").css("visibility", "hidden");
    } else if (checkedLanguage == 1) {
        $("#indonesian-check-img").css("visibility", "hidden");
        $("#english-check-img").css("visibility", "visible");
    }
}

function selectCheckedLanguage() {
    $("#language-select-dialog-container").css("display", "none");
    selectedLanguage = checkedLanguage;
    if (selectedLanguage == 0) {
        $("#language-text").html("Bahasa Indonesia");
    } else if (selectedLanguage == 1) {
        $("#language-text").html("English");
    }
}

function closeLanguageSelectDialog() {
    $("#language-select-dialog-container").css("display", "none");
}

function showLanguageSelectDialog() {
    $("#language-select-dialog-container").css("display", "flex");
}

function checkOrUncheckAutostart() {
    if ($("#auto-start").prop("checked") == true) {
        $("#auto-start").prop("checked", false);
    } else if ($("#auto-start").prop("checked") == false) {
        $("#auto-start").prop("checked", true);
    }
}

function checkOrUncheckFullEPG() {
    if ($("#full-epg").prop("checked") == true) {
        $("#full-epg").prop("checked", false);
    } else if ($("#full-epg").prop("checked") == false) {
        $("#full-epg").prop("checked", true);
    }
}

function checkOrUncheckActiveSubtitle() {
    if ($("#active-subtitle").prop("checked") == true) {
        $("#active-subtitle").prop("checked", false);
    } else if ($("#active-subtitle").prop("checked") == false) {
        $("#active-subtitle").prop("checked", true);
    }
}