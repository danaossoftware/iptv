var pointerIndex = 0;
var controlShown = false;
var controlPointerIndex = 0;

$(document).ready(function () {
    if (Native.isAndroidTV() == 1) {
        $("#general").css("background-color", "#3498db");
        $("#general-img").attr("src", "img/settings-3-white.png");
        $("#text1").css("color", "white");
    }
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function () {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 0);
    }, 0);
    if (getLanguage() == 1) {
        $("#text1").html("General");
        $("#text2").html("Stream Format");
        $("#text3").html("Time Format");
        $("#text4").html("Parental Control");
        $("#text5").html("Default Player");
        $("#text6").html("Player Settings");
        $("#text7").html("HOME");
        $("#text8").html("BACK");
        $("#text9").html("Password:");
        $("#text10").html("Repeat password:");
        $("#text11").html("Save");
        $("#text12").html("Close");
        $("#text13").html("SETTINGS");
    }
    $("#loading-container").fadeOut(300);
});

function setItemSizes() {
    if (pointerIndex == 0) {
        $("#general").css("background-color", "#3498db");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3-white.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "white");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#general").offset().top
        }, 0);
    } else if (pointerIndex == 1) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "#3498db");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2-white.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "white");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#general").offset().top
        }, 0);
    } else if (pointerIndex == 2) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "#3498db");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv-white.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "white");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#general").offset().top
        }, 0);
    } else if (pointerIndex == 3) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "#3498db");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time-white.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "white");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#time-format").offset().top
        }, 0);
    } else if (pointerIndex == 4) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "#3498db");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline-white.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "white");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#time-format").offset().top
        }, 0);
    } else if (pointerIndex == 5) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "#3498db");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation-white.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "white");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#time-format").offset().top
        }, 0);
    } else if (pointerIndex == 6) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "#3498db");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield-white.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "white");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#player").offset().top
        }, 0);
    } else if (pointerIndex == 7) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "#3498db");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3-white.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "white");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#player").offset().top
        }, 0);
    } else if (pointerIndex == 8) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "#3498db");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4-white.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "white");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#player").offset().top
        }, 0);
    } else if (pointerIndex == 9) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "194px");
        $("#home").css("height", "34px");
        $("#home").css("border", "3px solid white");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
    } else if (pointerIndex == 10) {
        $("#general").css("background-color", "white");
        $("#epg-time-shift").css("background-color", "white");
        $("#stream-format").css("background-color", "white");
        $("#time-format").css("background-color", "white");
        $("#epg-time-line").css("background-color", "white");
        $("#automation").css("background-color", "white");
        $("#control").css("background-color", "white");
        $("#players").css("background-color", "white");
        $("#player").css("background-color", "white");
        $("#general-img").attr("src", "img/settings-3.png");
        $("#epg-time-shift-img").attr("src", "img/history-2.png");
        $("#stream-format-img").attr("src", "img/tv.png");
        $("#time-format-img").attr("src", "img/time.png");
        $("#epg-time-line-img").attr("src", "img/timeline.png");
        $("#automation-img").attr("src", "img/automation.png");
        $("#control-img").attr("src", "img/shield.png");
        $("#players-img").attr("src", "img/play-3.png");
        $("#player-img").attr("src", "img/settings-4.png");
        $("#text1").css("color", "black");
        $("#text14").css("color", "black");
        $("#text2").css("color", "black");
        $("#text3").css("color", "black");
        $("#text15").css("color", "black");
        $("#text16").css("color", "black");
        $("#text4").css("color", "black");
        $("#text5").css("color", "black");
        $("#text6").css("color", "black");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "194px");
        $("#back").css("height", "34px");
        $("#back").css("border", "3px solid white");
    }
}

function setControlItemsBorder() {
    if (controlPointerIndex == 0) {
        $("#control-password").css("border", "3px solid #3498db");
        $("#control-password").css("width", "calc(100% - 16px)");
        $("#control-password").css("height", "24px");
        $("#repeated-control-password").css("border", "0");
        $("#repeated-control-password").css("width", "calc(100% - 10px)");
        $("#repeated-control-password").css("height", "30px");
        $("#save").css("width", "calc(50% - 25px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 25px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
    } else if (controlPointerIndex == 1) {
        $("#control-password").css("border", "0");
        $("#control-password").css("width", "calc(100% - 10px)");
        $("#control-password").css("height", "30px");
        $("#repeated-control-password").css("border", "3px solid #3498db");
        $("#repeated-control-password").css("width", "calc(100% - 16px)");
        $("#repeated-control-password").css("height", "24px");
        $("#save").css("width", "calc(50% - 25px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 25px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
    } else if (controlPointerIndex == 2) {
        $("#control-password").css("border", "0");
        $("#control-password").css("width", "calc(100% - 10px)");
        $("#control-password").css("height", "30px");
        $("#repeated-control-password").css("border", "0");
        $("#repeated-control-password").css("width", "calc(100% - 10px)");
        $("#repeated-control-password").css("height", "30px");
        $("#save").css("width", "calc(50% - 31px)");
        $("#save").css("height", "34px");
        $("#save").css("border", "3px solid #3498db");
        $("#close").css("width", "calc(50% - 25px)");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
    } else if (controlPointerIndex == 3) {
        $("#control-password").css("border", "0");
        $("#control-password").css("width", "calc(100% - 10px)");
        $("#control-password").css("height", "30px");
        $("#repeated-control-password").css("border", "0");
        $("#repeated-control-password").css("width", "calc(100% - 10px)");
        $("#repeated-control-password").css("height", "30px");
        $("#save").css("width", "calc(50% - 25px)");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "calc(50% - 31px)");
        $("#close").css("height", "34px");
        $("#close").css("border", "3px solid #3498db");
    }
}

function rightKey() {
    if (!controlShown) {
        if (pointerIndex < 8) {
            pointerIndex++;
        } else if (pointerIndex == 9) {
            pointerIndex = 10;
        }
        setItemSizes();
    } else {
        if (controlPointerIndex == 2) {
            controlPointerIndex = 3;
        }
        setControlItemsBorder();
    }
}

function leftKey() {
    if (!controlShown) {
        if (pointerIndex > 0) {
            pointerIndex--;
        } else if (pointerIndex == 10) {
            pointerIndex = 9;
        }
        setItemSizes();
    } else {
        if (controlPointerIndex > 0) {
            controlPointerIndex--;
        }
        setControlItemsBorder();
    }
}

function upKey() {
    if (!controlShown) {
        if (pointerIndex == 9 || pointerIndex == 10) {
            pointerIndex = 6;
        } else if (pointerIndex > 2) {
            pointerIndex -= 3;
        }
        setItemSizes();
    } else {
        if (controlPointerIndex > 0) {
            controlPointerIndex--;
        }
        setControlItemsBorder();
    }
}

function downKey() {
    if (!controlShown) {
        if (pointerIndex < 6) {
            pointerIndex += 3;
        } else if (pointerIndex == 6 || pointerIndex == 7 || pointerIndex == 8) {
            pointerIndex = 9;
        }
        setItemSizes();
    } else {
        if (controlPointerIndex < 3) {
            controlPointerIndex++;
        }
        setControlItemsBorder();
    }
}

function enterKey() {
    if (!controlShown) {
        if (pointerIndex == 0) {
            window.location.href = "settings/common.html";
        } else if (pointerIndex == 1) {
            window.location.href = "settings/epgtimeshift.html";
        } else if (pointerIndex == 2) {
            window.location.href = "settings/streamformat.html";
        } else if (pointerIndex == 3) {
            window.location.href = "settings/timeformat.html";
        } else if (pointerIndex == 4) {
            window.location.href = "settings/epgtimeline.html";
        } else if (pointerIndex == 5) {
            window.location.href = "settings/automation.html";
        } else if (pointerIndex == 6) {
            controlShown = !controlShown;
            if (controlShown) {
                $("#control-password").css("border", "3px solid #3498db");
                $("#control-password").css("width", "calc(100% - 16px)");
                $("#control-password").css("height", "24px");
                $("#repeated-control-password").css("border", "0");
                $("#repeated-control-password").css("width", "calc(100% - 10px)");
                $("#repeated-control-password").css("height", "30px");
                $("#save").css("width", "calc(50% - 25px)");
                $("#save").css("height", "40px");
                $("#save").css("border", "0");
                $("#close").css("width", "calc(50% - 25px)");
                $("#close").css("height", "40px");
                $("#close").css("border", "0");
                $("#control-password").val("");
                $("#repeated-control-password").val("");
                $("#control-dialog-container").css("display", "flex").hide().fadeIn(300);
                controlPointerIndex = 0;
            }
        } else if (pointerIndex == 7) {
            window.location.href = "settings/players.html";
        } else if (pointerIndex == 8) {
            window.location.href = "settings/player.html";
        } else if (pointerIndex == 9) {
            window.history.href = "landing.html";
        } else if (pointerIndex == 10) {
            window.history.back();
        }
    } else {
        if (controlPointerIndex == 0) {
            var title = "Kata Sandi Kontrol Orang Tua";
            if (getLanguage() == 1) {
                title = "Parental Control Password";
            }
            Native.showEditTextDialog(1, getLanguage(), title, "");
        } else if (controlPointerIndex == 1) {
            var title = "Kata Sandi Kontrol Orang Tua";
            if (getLanguage() == 1) {
                title = "Parental Control Password";
            }
            Native.showEditTextDialog(2, getLanguage(), title, "");
        } else if (controlPointerIndex == 2) {
            setPassword();
        } else if (controlPointerIndex == 3) {
            closeControlDialog();
        }
    }
}

function setPassword() {
    $("#error").css("display", "none");
    var password = $("#control-password").val();
    var repeatedPassword = $("#repeated-control-password").val();
    if (password == "" || repeatedPassword == "") {
        $("#error").html("Mohon isi kata sandi");
        $("#error").css("display", "block");
        return;
    }
    if (password != repeatedPassword) {
        $("#error").html("Kata sandi tidak cocok");
        $("#error").css("display", "block");
        return;
    }
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    $("#control-dialog-container").css("display", "none");
    Native.writeString("parental_control_password", password);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
    controlShown = false;
}

function openControlDialog() {
    $("#control-password").val("");
    $("#repeated-control-password").val("");
    $("#control-dialog-container").css("display", "flex").hide().fadeIn(300);
}

function closeControlDialog() {
    $("#control-dialog-container").fadeOut(300);
    controlShown = false;
}

function saveSettings() {
}

function editTextFinised(code, value) {
    if (code == 1) {
        $("#control-password").val(value);
    } else if (code == 2) {
        $("#repeated-control-password").val(value);
    }
}