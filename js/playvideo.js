$(document).ready(function() {
    var params = location.search;
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
            video.play();
        });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
    // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
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
    });
});