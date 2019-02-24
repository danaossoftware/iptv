var currentIndex = -1;
var recordings;

$(document).ready(function () {
    var defaultPath = Native.getRecordingDir();
    $("#current-record-loc").html("Lokasi folder rekaman: " + defaultPath);
    if (getLanguage() == 1) {
        $("#text1").html("| REKAMAN");
        $("#no-recording").html("NO RECORDINGS");
        $("#text2").html("CHANGE FOLDER");
        $("#back").html("BACK");
    }
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    loadRecordings();
});

function loadRecordings() {
    $("#recordings").find("*").remove();
    var recordingsJSON = Native.getRecordings();
    recordings = JSON.parse(recordingsJSON);
    if (recordings.length > 0) {
        $("#no-recording-container").hide();
    }
    for (var i = 0; i < recordings.length; i++) {
        var recording = recordings[i];
        var path = recording['path'];
        var name = path.substring(path.lastIndexOf("/") + 1, path.length);
        var thumbnailPath = recording['thumbnail'];
        var date = new Date();
        var dateText = "";
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        dateText += day;
        dateText += " ";
        dateText += getMonthName(month);
        dateText += " ";
        dateText += year;
        $("#recordings").append("" +
            "<div class='video-recording' style='background-color: rgba(255, 255, 255, .5); width: calc(100% - 30px); margin-top: 5px; margin-left: 5px; margin-right: 5px; display: flex; flex-flow: row nowrap; align-items: center; padding: 10px;'>" +
            "<img src='" + thumbnailPath + "' width='80px' height='60px'>" +
            "<div style='display: flex; flex-flow: column nowrap; margin-left: 10px;'>" +
            "<div style='color: white; font-size: 18px; white-space: nowrap;'>" + name + "</div>" +
            "<div style='color: white; font-size: 18px; margin-bottom: 5px;'>" + dateText + "</div>" +
            "</div>" +
            "</div>"
        );
    }
    setRecordingClickListener();
}

function playVideo() {
}

function setRecordingClickListener() {
    $(".video-recording").on("click", function() {
        var index = $(this).parent().children().index(this);
        var recording = recordings[index];
        var path = recording['path'];
        if (!path.startsWith("file://")) {
            path = "file://" + path;
        }
        Native.playVideo(path);
    });
}

function changeDirectory() {
    Native.changeRecordDir();
}

function recordingDirSelected(path) {
    $("#current-record-loc").html("Lokasi folder rekaman: " + path);
}

function downKey() {
    currentIndex++;
    focusToCurrentIndex();
}

function upKey() {
    if (currentIndex > 0) {
        currentIndex--;
    }
    focusToCurrentIndex();
}

function focusToCurrentIndex() {
    if (currentIndex == 0) {
        $("#back").css("border", "3px solid white").css("width", "94px").css("height", "34px");
        $("#change-recording-dir").css("border", "0").css("width", "200px").css("height", "35px");
        $(".video-recording").css("border", "0").css("width", "calc(100% - 30px)");
    } else if (currentIndex == 1) {
        $("#back").css("border", "0").css("width", "100px").css("height", "40px");
        $("#change-recording-dir").css("border", "3px solid white").css("width", "194px").css("height", "29px");
        $(".video-recording").css("border", "0").css("width", "calc(100% - 30px)");
    } else {
        $("#back").css("border", "0").css("width", "100px").css("height", "40px");
        $("#change-recording-dir").css("border", "0").css("width", "200px").css("height", "35px");
        $(".video-recording").css("border", "0").css("width", "calc(100% - 30px)");
        $(".video-recording:eq("+(currentIndex-2)+")").css("border", "0").css("width", "calc(100% - 36px)");
    }
}

function enterKey() {
    if (currentIndex == 0) {
        window.history.back();
    } else if (currentIndex == 1) {
        changeDirectory();
    } else {
        var index = currentIndex-2;
        var recording = recordings[index];
        var path = recording['path'];
        if (!path.startsWith("file://")) {
            path = "file://" + path;
        }
        Native.playVideo(path);
    }
}