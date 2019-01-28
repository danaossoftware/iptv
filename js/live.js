var m3uData;
var selectedCategoryName;
var fullScreen = false;
var menuShowed = false;
var pressEvent;
var currentChannel = 0;
var currentChannelMenu = 0;
var recording = false;
var recordingData = [];

$(document).ready(function () {
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/php/check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == -1) {
                window.location.href = 'login.html';
            }
        }
    });
    var params = location.search;
    params = params.substr(1, params.length);
    var category = params.split("&")[0].split("=")[1];
    selectedCategoryName = params.split("&")[1].split("=")[1];
    selectedCategoryName = selectedCategoryName.toUpperCase();
    $("#category-name").html(selectedCategoryName);
    loadChannels();
});

function loadChannels() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-channels.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            m3uData = a;
            var length = occurrences(m3uData, "#EXTINF");
            channels = [];
            if (selectedCategoryName == "SEMUA") {
                try {
                    var a = 0;
                    for (var i = 0; i < length; i++) {
                        a = m3uData.indexOf("#EXTINF", a) + 7;
                        var b = m3uData.indexOf("tvg-name", a) + 10;
                        var c = m3uData.indexOf("\"", b);
                        var channelName = m3uData.substr(b, c - b);
                        b = m3uData.indexOf("tvg-logo", a) + 10;
                        c = m3uData.indexOf("\"", b);
                        var logoURL = m3uData.substr(b, c - b);
                        a = m3uData.indexOf("group-title", a);
                        b = m3uData.indexOf("http", a);
                        c = m3uData.indexOf("\n", b);
                        var channelURL = m3uData.substr(b, c - b);
                        channelURL = channelURL.trim();
                        channels.push({'name': channelName, 'logo': logoURL, 'url': channelURL});
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    var a = 0;
                    for (var i = 0; i < length; i++) {
                        a = m3uData.indexOf("#EXTINF", a) + 7;
                        var b = m3uData.indexOf("group-title", a) + 13;
                        var c = m3uData.indexOf("\"", b);
                        var categoryName = m3uData.substr(b, c - b);
                        if (categoryName == "") {
                            categoryName = "Tidak terdefinisi";
                        }
                        if (categoryName == selectedCategoryName) {
                            b = m3uData.indexOf("tvg-name", a) + 10;
                            c = m3uData.indexOf("\"", b);
                            var channelName = m3uData.substr(b, c - b);
                            b = m3uData.indexOf("tvg-logo", a) + 10;
                            c = m3uData.indexOf("\"", b);
                            var logoURL = m3uData.substr(b, c - b);
                            a = m3uData.indexOf("group-title", a);
                            b = m3uData.indexOf("http", a);
                            c = m3uData.indexOf("\n", b);
                            var channelURL = m3uData.substr(b, c - b);
                            channelURL = channelURL.trim();
                            channels.push({'name': channelName, 'logo': logoURL, 'url': channelURL});
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            for (var i = 0; i < channels.length; i++) {
                var channelName = channels[i]["name"];
                var logoURL = channels[i]["logo"];
                var channelURL = channels[i]["url"];
                var indicatorDisplay;
                if (i == 0) {
                    indicatorDisplay = "block";
                } else {
                    indicatorDisplay = "none";
                }
                if (logoURL == '') {
                    logoURL = '../img/channel-2.png';
                }
                $("#channels").append("<div style=\"cursor: pointer; margin-left: 10px; margin-right: 10px; margin-top: 5px; position: relative; width: calc(100% - 20px);\">\n" +
                    "<div class=\"channel\" style='width: calc(100% - 60px); margin-left: 10px; margin-right: 50px; display: flex; flex-flow: row nowrap; align-items: center;'>" +
                    "   <div style='color: white; font-family: \"PalanquinBold\";'>" + (i + 1) + "</div>" +
                    "   <img src='" + logoURL + "' width='30px' height='28px' style='margin-left: 15px;'>" +
                    "   <div style='color: white; margin-left: 10px; margin-top: -3px;'>" + channelName + "</div>" +
                    "</div>" +
                    "<div class='channel-menu' style='position: absolute; top: 0; right: 0; width: 50px; height: 100%; display: flex; justify-content: center; align-items: center;'>" +
                    "   <img src='../img/menu.png' style='width: 15px; height: 15px;'>"+
                    "</div>"+
                    "</div>");
            }
            setChannelClickListener();
            playVideo(channels[0]["url"]);
            $("#loading-container").hide();
            if (Native.isAndroidTV() == 1) {
                var firstChannel = $("#channels").find(".channel:eq(0)");
                firstChannel.addClass("active");
            }
        }
    });
}

function setChannelClickListener() {
    $(".channel").unbind().click(function() {
        var channelNum = $(this).parent().parent().children().index($(this).parent());
        if (channelNum != currentChannel) {
            var channelURL = channels[channelNum]["url"];
            playVideo(channelURL);
            currentChannel = channelNum;
        }
    });
    $(".channel-menu").unbind().click(function() {
        var channelNum = $(this).parent().parent().children().index($(this).parent());
        currentChannelMenu = channelNum;
        $("#menu-container").css("display", "flex").hide().fadeIn(300);
        menuShowed = true;
    });
}

function playVideo(videoURL) {
    $("#loading-container").css("display", "flex");
    var video = document.getElementById('live-video');
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoURL);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
            $("#loading-container").fadeOut(300);
        });
        hls.on(Hls.Events.BUFFER_APPENDING, function (event, data) {
            if (recording) {
                recordingData.push(data.data);
            }
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoURL;
        video.addEventListener('loadedmetadata', function () {
            video.play();
            $("#loading-container").fadeOut(300);
        });
    }
    $("#live-video-container").css("visibility", "visible");
}

function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);
    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function switchToFullScreen() {
    $("#live-video-container").css("position", "absolute");
    $("#live-video-container").css("left", "0");
    $("#live-video-container").css("top", "0");
    $("#live-video-container").css("width", "100%");
    $("#live-video-container").css("margin-left", "0");
    $("#live-video-container").css("background", "black");
    fullScreen = true;
}

function backKey() {
    if (fullScreen) {
        $("#live-video-container").css("position", "");
        $("#live-video-container").css("left", "");
        $("#live-video-container").css("top", "");
        $("#live-video-container").css("width", "calc(50% - 8px)");
        $("#live-video-container").css("margin-left", "8px");
        $("#live-video-container").css("background", "rgba(0, 0, 0, .5)");
        fullScreen = false;
    } else if (menuShowed) {
        $("#menu-container").fadeOut(300);
        menuShowed = false;
    } else {
        window.history.back();
    }
}

function playWithVLC() {
    var channelURL = channels[currentChannelMenu]["url"];
    Native.playWithVLC(channelURL);
}

function playWithMX() {
    var channelURL = channels[currentChannelMenu]["url"];
    Native.playWithMX(channelURL);
}

function addToFavorite() {
    var channel = JSON.stringify(channels[currentChannelMenu]);
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'add-to-favorite.php',
        data: {'channel-info': channel},
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#loading-container").fadeOut(300);
            Native.show("Ditambahkan ke Favorit");
        }
    });
}

function startRecording() {
    Native.show("Mulai merekam...");
    recording = true;
    recordingData = [];
    setTimeout(function() {
        var allRecordingData = [];
        for (var i=0; i<Object.keys(recordingData).length; i++) {
            allRecordingData.push(recordingData[i]);
        }
        Native.show("Berhenti merekam, ukuran file: "+allRecordingData.length);
        recording = false;
        Native.writeFile("/sdcard/a.mp4", allRecordingData);
    }, 5000);
}