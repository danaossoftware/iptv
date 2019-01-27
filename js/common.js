var xmlData = null;
var selectedLanguage = 0;
var checkedLanguage = 0;

$(document).ready(function () {
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    loadSettings();
});

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(a, "text/xml");
            xmlData = xml;
            var userAgent = Native.getUserAgent();
            $("#user-agent").val(userAgent);
            selectedLanguage = language;
            var autoStart = Native.readInt("autostart", 0);
            if (autoStart == 1) {
                $("#auto-start").prop("checked", true);
            }
            var fullEPG = Native.readInt("full_epg", 0);
            if (fullEPG == 1) {
                $("#full-epg").prop("checked", true);
            }
            var subtitle = Native.readInt("active_subtitle", 0);
            if (subtitle == 1) {
                $("#active-subtitle").prop("checked", true);
            }
            var language = Native.readInt("language", 0);
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
    if ($("#auto-start").prop("checked") == true) {
        //Native.setStartAtBoot(1);
    } else {
        Native.setStartAtBoot(0);
    }
    if ($("#full-epg").prop("checked") == true) {
        Native.writeInt("full_epg", 1);
    } else {
        Native.writeInt("full_epg", 0);
    }
    if ($("#active-subtitle").prop("checked") == true) {
        Native.writeInt("active_subtitle", 1);
        Native.enableSubtitle(1);
    } else {
        Native.writeInt("active_subtitle", 0);
        Native.enableSubtitle(0);
    }
    var userAgent = $("#user-agent").val();
    Native.setUserAgent(userAgent);
    $("#loading-container").fadeOut(300);
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