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
        $("#text1").html("| Settings | Automation");
        $("#text2").html("Refresh channels & movies automatically");
        $("#text3").html("Refresh EPG automatically");
        $("#text4").html("SAVE");
        $("#text5").html("BACK");
    }
});

function loadSettings() {
    var autoUpdateChannels = Native.readInt("auto_update_channels", 0);
    var autoUpdateEPG = Native.readInt("auto_update_epg", 0);
    if (autoUpdateChannels == 1) {
        $("#auto-update-channels").prop("checked", true);
    }
    if (autoUpdateEPG == 1) {
        $("#auto-update-epg").prop("checked", true);
    }
    $("#loading-container").fadeOut(300);
    setCheckBoxItemListener();
}

function setCheckBoxItemListener() {
    $(".checkbox-item").on("click", function () {
        var checked = $(this).find(".magic-checkbox").prop("checked");
        checked = !checked;
        $(this).find(".magic-checkbox").prop("checked", checked);
    });
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    var autoUpdateChannels = 0;
    if ($("#auto-update-channels").prop("checked")) {
        autoUpdateChannels = 1;
    }
    var autoUpdateEPG = 0;
    if ($("#auto-update-epg").prop("checked")) {
        autoUpdateEPG = 1;
    }
    Native.writeInt("auto_update_channels", autoUpdateChannels);
    Native.writeInt("auto_update_epg", autoUpdateEPG);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}