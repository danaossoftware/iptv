var selectedTimelineOption = 0;

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
        $("#text1").html("| Settings | EPG Timeline");
        $("#text2").html("Show channels with EPG");
        $("#text3").html("Show all channels");
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
            var epgTimeLine = Native.readInt("epg_time_line", 0);
            selectOption(epgTimeLine);
            $("#loading-container").fadeOut(300);
        }
    });
}

function selectOption(option) {
    selectedTimelineOption = option;
    if (option == 0) {
        $("#epg-channels").find(".radio-inner").css("display", "block");
        $("#all-channels").find(".radio-inner").css("display", "none");
    } else if (option == 1) {
        $("#epg-channels").find(".radio-inner").css("display", "none");
        $("#all-channels").find(".radio-inner").css("display", "block");
    }
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    Native.writeInt("epg_time_line", selectedTimelineOption);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}