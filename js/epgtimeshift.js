$(document).ready(function () {
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function () {
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
    var epgTimeShift = Native.readInt("epg_time_shift", 0);
    $("#epg-time-shift").val(epgTimeShift);
    $("#loading-container").fadeOut(300);
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    var epgTimeShift = parseInt($("#epg-time-shift").val());
    Native.writeInt("epg_time_shift", epgTimeShift);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}