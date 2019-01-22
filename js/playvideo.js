$(document).ready(function() {
    /*var params = location.search;
    params = params.substr(1, params.length);
    var videoURL = params.split("&")[0].split("=")[1];
    videoURL = decodeURIComponent(videoURL);
    var channelName = params.split("&")[1].split("=")[1];
    channelName = decodeURIComponent(channelName);
    $("#channel-name").html(channelName);
    var video = document.getElementById('video');
    if(Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoURL);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            $("#loading-container").css("display", "none");
            //video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoURL;
        video.addEventListener('loadedmetadata',function() {
            video.play();
        });
    }
    $("#video").on("click", function() {
        if ($("#titlebar").css("display") == "flex") {
            $("#titlebar").fadeOut(300);
        } else {
            $("#titlebar").css("display", "flex");
            $("#titlebar").hide();
            $("#titlebar").fadeIn(300);
        }
    });*/
});

function pauseVideo() {
    $("#play-video-container").css("display", "flex");
    $("#play-video-container").hide();
    $("#play-video-container").fadeIn(300);
    $("#video")[0].pause();
}

function playVideo() {
    //$("#play-video-container").fadeOut(300);
    $("#video")[0].play();
}