var xmlData = null;
var selectedLanguage = 0;
var checkedLanguage = 0;
var pointerIndex = 0;
var selectLanguageDialogShown = false;
var selectLanguagePointerIndex = 0;

$(document).ready(function () {
    if (Native.isAndroidTV() == 1) {
        $("#item1").css("background-color", "#3498db");
    }
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    loadSettings();
    if (getLanguage() == 1) {
        $("#text1").html("| Settings | General");
        $("#text2").html("GENERAL SETTINGS");
        $("#text3").html("Automatically started after boot");
        $("#text4").html("Enable subtitle");
        $("#text5").html("Language");
        $("#text6").html("SAVE");
        $("#text7").html("BACK");
        $("#text8").html("LANGUAGE");
        $("#text9").html("SAVE");
        $("#text10").html("CLOSE");
    }
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
            var autoStart = Native.readInt("autostart", 0);
            if (autoStart == 1) {
                $("#auto-start").prop("checked", true);
            }
            var subtitle = Native.readInt("enable_subtitle", 0);
            if (subtitle == 1) {
                $("#active-subtitle").prop("checked", true);
            }
            var language = Native.readInt("language", 0);
            if (language == 0) {
                $("#language-text").html("Bahasa Indonesia");
            } else if (language == 1) {
                $("#language-text").html("English");
            }
            selectedLanguage = language;
            $("#loading-container").fadeOut(300);
        }
    });
}

function saveSettings() {
    $("#loading-container").css("display", "flex");
    $("#loading-container").hide();
    $("#loading-container").fadeIn(300);
    if ($("#auto-start").prop("checked") == true) {
        Native.setStartAtBoot(1);
    } else {
        Native.setStartAtBoot(0);
    }
    if ($("#active-subtitle").prop("checked") == true) {
        Native.enableSubtitle(1);
    } else {
        Native.enableSubtitle(0);
    }
    var userAgent = $("#user-agent").val();
    Native.setUserAgent(userAgent);
    var language = Native.readInt("language", 0);
    Native.writeInt("language", selectedLanguage);
    if (selectedLanguage != language) {
        Native.restartApp();
    }
    $("#loading-container").fadeOut(300);
    Native.show("Pengaturan disimpan");
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
    selectLanguageDialogShown = false;
    $("#language-select-dialog-container").css("display", "none");
}

function showLanguageSelectDialog() {
    selectLanguageDialogShown = true;
    selectLanguagePointerIndex = 0;
    $("#language1").css("background-color", "#eeeeee");
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

function setItemsBorder() {
    if (pointerIndex == 0) {
        $("#item1").css("background-color", "#3498db");
        $("#item2").css("background-color", "");
        $("#user-agent").css("border", "0");
        $("#user-agent").css("width", "calc(100% - 10px);");
        $("#user-agent").css("height", "30px");
        $("#item3").css("border", "0");
        $("#item3").css("width", "calc(100% - 10px);");
        $("#item3").css("height", "30px");
        $("#item4").css("border", "0");
        $("#item4").css("width", "calc(50% - 30px)");
        $("#item4").css("height", "40px");
        $("#item5").css("border", "0");
        $("#item5").css("width", "calc(50% - 30px)");
        $("#item5").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#option1").offset().top
        }, 0);
    } else if (pointerIndex == 1) {
        $("#item1").css("background-color", "");
        $("#item2").css("background-color", "#3498db");
        $("#user-agent").css("border", "0");
        $("#user-agent").css("width", "calc(100% - 10px);");
        $("#user-agent").css("height", "30px");
        $("#item3").css("border", "0");
        $("#item3").css("width", "calc(100% - 10px);");
        $("#item3").css("height", "30px");
        $("#item4").css("border", "0");
        $("#item4").css("width", "calc(50% - 30px)");
        $("#item4").css("height", "40px");
        $("#item5").css("border", "0");
        $("#item5").css("width", "calc(50% - 30px)");
        $("#item5").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#item1").offset().top
        }, 0);
    } else if (pointerIndex == 2) {
        $("#item1").css("background-color", "");
        $("#item2").css("background-color", "");
        $("#user-agent").css("border", "2px solid #3498db");
        $("#user-agent").css("width", "calc(100% - 14px);");
        $("#user-agent").css("height", "26px");
        $("#item3").css("border", "0");
        $("#item3").css("width", "calc(100% - 10px);");
        $("#item3").css("height", "30px");
        $("#item4").css("border", "0");
        $("#item4").css("width", "calc(50% - 30px)");
        $("#item4").css("height", "40px");
        $("#item5").css("border", "0");
        $("#item5").css("width", "calc(50% - 30px)");
        $("#item5").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#item2").offset().top
        }, 0);
    } else if (pointerIndex == 3) {
        $("#item1").css("background-color", "");
        $("#item2").css("background-color", "");
        $("#user-agent").css("border", "0");
        $("#user-agent").css("width", "calc(100% - 10px);");
        $("#user-agent").css("height", "30px");
        $("#item3").css("border", "2px solid #3498db");
        $("#item3").css("width", "calc(100% - 14px);");
        $("#item3").css("height", "26px");
        $("#item4").css("border", "0");
        $("#item4").css("width", "calc(50% - 30px)");
        $("#item4").css("height", "40px");
        $("#item5").css("border", "0");
        $("#item5").css("width", "calc(50% - 30px)");
        $("#item5").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#item3").offset().top
        }, 0);
    } else if (pointerIndex == 4) {
        $("#item1").css("background-color", "");
        $("#item2").css("background-color", "");
        $("#user-agent").css("border", "0");
        $("#user-agent").css("width", "calc(100% - 10px);");
        $("#user-agent").css("height", "30px");
        $("#item3").css("border", "0");
        $("#item3").css("width", "calc(100% - 10px);");
        $("#item3").css("height", "30px");
        $("#item4").css("border", "3px solid white");
        $("#item4").css("width", "calc(50% - 36px)");
        $("#item4").css("height", "34px");
        $("#item5").css("border", "0");
        $("#item5").css("width", "calc(50% - 30px)");
        $("#item5").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#item4").offset().top
        }, 0);
    } else if (pointerIndex == 5) {
        $("#item1").css("background-color", "");
        $("#item2").css("background-color", "");
        $("#user-agent").css("border", "0");
        $("#user-agent").css("width", "calc(100% - 10px);");
        $("#user-agent").css("height", "30px");
        $("#item3").css("border", "0");
        $("#item3").css("width", "calc(100% - 10px);");
        $("#item3").css("height", "30px");
        $("#item4").css("border", "0");
        $("#item4").css("width", "calc(50% - 30px)");
        $("#item4").css("height", "40px");
        $("#item5").css("border", "3px solid white");
        $("#item5").css("width", "calc(50% - 36px)");
        $("#item5").css("height", "34px");
        $("html, body").animate({
            scrollTop: $("#item5").offset().top
        }, 0);
    }
}

function setSelectLanguageItemsBorder() {
    if (selectLanguagePointerIndex == 0) {
        $("#language1").css("background-color", "#eeeeee");
        $("#language2").css("background-color", "white");
        $("#select-language-save").css("border", "0");
        $("#select-language-save").css("width", "calc(50% - 25px)");
        $("#select-language-save").css("height", "40px");
        $("#select-language-close").css("border", "0");
        $("#select-language-close").css("width", "calc(50% - 25px)");
        $("#select-language-close").css("height", "40px");
    } else if (selectLanguagePointerIndex == 1) {
        $("#language1").css("background-color", "white");
        $("#language2").css("background-color", "#eeeeee");
        $("#select-language-save").css("border", "0");
        $("#select-language-save").css("width", "calc(50% - 25px)");
        $("#select-language-save").css("height", "40px");
        $("#select-language-close").css("border", "0");
        $("#select-language-close").css("width", "calc(50% - 25px)");
        $("#select-language-close").css("height", "40px");
    } else if (selectLanguagePointerIndex == 2) {
        $("#language1").css("background-color", "white");
        $("#language2").css("background-color", "white");
        $("#select-language-save").css("border", "3px solid #3498db");
        $("#select-language-save").css("width", "calc(50% - 31px)");
        $("#select-language-save").css("height", "34px");
        $("#select-language-close").css("border", "0");
        $("#select-language-close").css("width", "calc(50% - 25px)");
        $("#select-language-close").css("height", "40px");
    } else if (selectLanguagePointerIndex == 3) {
        $("#language1").css("background-color", "white");
        $("#language2").css("background-color", "white");
        $("#select-language-save").css("border", "0");
        $("#select-language-save").css("width", "calc(50% - 25px)");
        $("#select-language-save").css("height", "40px");
        $("#select-language-close").css("border", "3px solid #3498db");
        $("#select-language-close").css("width", "calc(50% - 31px)");
        $("#select-language-close").css("height", "34px");
    }
}

function downKey() {
    if (selectLanguageDialogShown) {
        if (selectLanguagePointerIndex < 3) {
            selectLanguagePointerIndex++;
        }
        setSelectLanguageItemsBorder();
    } else {
        if (pointerIndex < 5) {
            pointerIndex++;
        }
        setItemsBorder();
    }
}

function upKey() {
    if (!selectLanguageDialogShown) {
        if (pointerIndex > 0) {
            pointerIndex--;
        }
        setItemsBorder();
    } else {
        if (selectLanguagePointerIndex > 0) {
            selectLanguagePointerIndex--;
        }
        setSelectLanguageItemsBorder();
    }
}

function rightKey() {
    if (selectLanguageDialogShown) {
        if (selectLanguagePointerIndex == 2) {
            selectLanguagePointerIndex = 3;
        }
        setSelectLanguageItemsBorder();
    } else {
        if (pointerIndex == 4) {
            pointerIndex = 5;
        }
        setItemsBorder();
    }
}

function leftKey() {
    if (selectLanguageDialogShown) {
        if (selectLanguagePointerIndex == 3) {
            selectLanguagePointerIndex = 2;
        }
        setSelectLanguageItemsBorder();
    } else {
        if (pointerIndex == 5) {
            pointerIndex = 4;
        }
        setItemsBorder();
    }
}

function enterKey() {
    if (!selectLanguageDialogShown) {
        if (pointerIndex == 0) {
            checkOrUncheckAutostart();
        } else if (pointerIndex == 1) {
            checkOrUncheckActiveSubtitle();
        } else if (pointerIndex == 2) {
            Native.showEditTextDialog(1, getLanguage(), "User Agent", $("#user-agent").val());
        } else if (pointerIndex == 3) {
            showLanguageSelectDialog();
        } else if (pointerIndex == 4) {
            saveSettings();
        } else if (pointerIndex == 5) {
            window.history.back();
        }
    } else {
        if (selectLanguagePointerIndex == 0) {
            selectLanguage(0);
        } else if (selectLanguagePointerIndex == 1) {
            selectLanguage(1);
        } else if (selectLanguagePointerIndex == 2) {
            selectCheckedLanguage();
        } else if (selectLanguagePointerIndex == 3) {
            closeLanguageSelectDialog();
        }
    }
}

function editTextFinised(code, value) {
    if (code == 1) {
        $("#user-agent").val(value);
    }
}