var categories = [];
var channels = [];

$(document).ready(function () {
    loadProfile();
    loadChannels();
});

function loadProfile() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-user-info.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                var user = JSON.parse(a);
                var name = user["name"];
                name = name.toUpperCase();
                if (name == '') {
                    $("#welcome-text").html("SELAMAT DATANG");
                } else {
                    if (name.includes(" ")) {
                        name = name.substring(0, name.indexOf(" "));
                    }
                    $("#welcome-text").html("SELAMAT DATANG "+name);
                }
                var profilePictureURL = user["profile_picture_url"];
                if (profilePictureURL != "") {
                    $("#profile-picture").attr("src", profilePictureURL);
                }
            }
        }
    });
}

function loadChannels() {
    categories = [];
    $("#channels").find("*").remove();
    $("#categories").find("*").remove();
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/channels.m3u',
        dataType: 'text',
        cache: false,
        success: function (a) {
            var m3uData = a;
            var length = m3uData.length;
            // Get categories first
            try {
                var a = 0;
                for (var i = 0; i < occurrences(m3uData, "#EXTINF"); i++) {
                    a = m3uData.indexOf("#EXTINF", a) + 7;
                    var b = m3uData.indexOf("group-title", a) + 13;
                    var c = m3uData.indexOf("\"", b);
                    var categoryName = m3uData.substr(b, c - b);
                    if (!isCategoryAlreadyAdded(categoryName)) {
                        categories.push(categoryName);
                    }
                }
            } catch (e) {
            }
            for (var i = 0; i < categories.length; i++) {
                var categoryName = categories[i];
                var indicatorDisplay;
                if (i == 0) {
                    indicatorDisplay = "block";
                } else {
                    indicatorDisplay = "none";
                }
                $("#channels").append("<div id='category-panel-" + i + "' style='display: none; flex-flow: row nowrap; justify-content: center; align-items: center; align-content: center; width: 100%; height: 100%; position: absolute; left: 0; top: 0;'></div>")
                $("#categories").append("<div class=\"category-selector\" style=\"cursor: pointer; padding-left: 40px; padding-right: 40px; display: flex; align-items: center; color: white; font-size: 20px; position: relative;\">\n" +
                    "" + categoryName + "\n" +
                    "<div class=\"category-indicator-top\" style=\"display: " + indicatorDisplay + "; width: 100%; height: 2px; position: absolute; left: 0; top: 0; background-color: #941b3a;\"></div>\n" +
                    "<div class=\"category-indicator-bottom\" style=\"display: " + indicatorDisplay + "; width: 100%; height: 2px; position: absolute; left: 0; bottom: 0; background-color: #941b3a;\"></div>\n" +
                    "</div>");
            }
            // Get channels
            try {
                var a = 0;
                for (var i = 0; i < occurrences(m3uData, "#EXTINF"); i++) {
                    a = m3uData.indexOf("#EXTINF", a) + 7;
                    var b = m3uData.indexOf("tvg-id", a) + 8;
                    var c = m3uData.indexOf("\"", b);
                    var channelId = m3uData.substr(b, c - b);
                    b = m3uData.indexOf("tvg-name", a) + 10;
                    c = m3uData.indexOf("\"", b);
                    var channelName = m3uData.substr(b, c - b);
                    b = m3uData.indexOf("tvg-logo", a) + 10;
                    c = m3uData.indexOf("\"", b);
                    var channelLogoURL = m3uData.substr(b, c - b);
                    b = m3uData.indexOf("group-title", a) + 13;
                    c = m3uData.indexOf("\"", b);
                    var groupTitle = m3uData.substr(b, c - b);
                    b = m3uData.indexOf("http", b);
                    c = m3uData.indexOf(".m3u8", b) + 5;
                    var channelURL = m3uData.substr(b, c - b);
                    var channel = {
                        'id': channelId,
                        'name': channelName,
                        'url': channelURL,
                        'logo-url': channelLogoURL,
                        'group-title': groupTitle
                    };
                    channels.push(channel);
                    var categoryIndex = findCategoryIndex(groupTitle);
                    $("#category-panel-" + categoryIndex).append("<img id='" + channelId + "' class='channel' src='" + channelLogoURL + "' onerror='this.src=\"img/channel-placeholder.jpg\"' width='80px' height='60px' style='margin: 5px; border-radius: 10px; cursor: pointer;'>");
                }
                $("#category-panel-0").css("display", "block");
            } catch (e) {
            }
            setCategoryClickListener();
            setChannelClickListener();
            $("#channels").css("display", "flex");
            $("#channels").hide();
            $("#channels").fadeIn(1000);
            $("#welcome-text").fadeIn(1500);
            $("#welcome-border-bottom").animate({
                width: "200px",
                marginLeft: "20px"
            }, 1000);
        }
    });
}

function setCategoryClickListener() {
    var categoryLength = categories.length;
    $(".category-selector").on("click", function () {
        for (var i = 0; i < categoryLength; i++) {
            $("#category-panel-" + i).fadeOut(300);
        }
        var index = $(this).parent().children().index($(this));
        var categories = $(this).parent();
        $("#category-panel-" + index).fadeIn(300);
        categories.find("*").each(function () {
            var indicatorTop = $(this).find(".category-indicator-top");
            var indicatorBottom = $(this).find(".category-indicator-bottom");
            indicatorTop.fadeOut(300);
            indicatorBottom.fadeOut(300);
        });
        var indicatorTop = categories.find(".category-selector:eq(" + index + ")").find(".category-indicator-top");
        var indicatorBottom = categories.find(".category-selector:eq(" + index + ")").find(".category-indicator-bottom");
        indicatorTop.fadeIn(300);
        indicatorBottom.fadeIn(300);
    });
}

function setChannelClickListener() {
    $(".channel").on("click", function () {
        var channelId = $(this).attr("id");
        var channel = findChannelById(channelId);
        if (channel != null) {
            var channelURL = channel["url"];
            var channelName = channel["name"];
            window.location.href = "playvideo.html?channel_url=" + encodeURIComponent(channelURL) + "&channel_name=" + encodeURIComponent(channelName);
        }
    });
}

function findChannelById(channelId) {
    for (var i = 0; i < channels.length; i++) {
        if (channels[i].id == channelId) {
            return channels[i];
        }
    }
    return null;
}

function isCategoryAlreadyAdded(name) {
    // Check if categori exists
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        if (category == name) {
            return true;
        }
    }
    return false;
}

function findCategoryIndex(categoryName) {
    for (var i = 0; i < categories.length; i++) {
        if (categories[i] == categoryName) {
            return i;
        }
    }
    return 0;
}

function showMenu() {
    $("#menu").css("display", "flex");
    $("#menu").hide();
    $("#menu").fadeIn(300);
    $("#menu-container").fadeIn(300);
}

function hideMenu() {
    $("#menu").fadeOut(300);
    $("#menu-container").fadeOut(300);
}

function logout() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'logout.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            window.location.href = "login.html";
        }
    });
}