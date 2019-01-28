var selectedStreamFormat = 0;

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
        $("#text1").html("| Settings | Stream Format");
        $("#text2").html("STREAM FORMAT");
        $("#text3").html("SAVE");
        $("#text4").html("BACK");
    }
});

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var streamFormat = Native.readInt("stream_format", 0);
            selectOption(streamFormat);
            $("#loading-container").fadeOut(300);
        }
    });
}

function selectOption(option) {
    selectedStreamFormat = option;
    if (option == 0) {
        $("#mpeg-ts").find(".radio-inner").css("display", "block");
        $("#hls").find(".radio-inner").css("display", "none");
    } else if (option == 1) {
        $("#mpeg-ts").find(".radio-inner").css("display", "none");
        $("#hls").find(".radio-inner").css("display", "block");
    }
}

function saveSettings() {
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    Native.writeInt("stream_format", selectedStreamFormat);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
}