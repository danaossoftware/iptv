var m3uData;
var currentCategory = 0;
var selectedCategoryName;
var fullScreen = false;
var channelMenuShown = false;
var menuShown = false;
var pressEvent;
var currentChannel = 0;
var currentChannelMenu = 0;
var recording = false;
var recordingData = [];
var pointerIndex = 0;
var channels = [];
var currentPointerInMenu = false;
var sortingMenuShown = false;
var sortingPointerIndex = 0;
var channelMenuPointerIndex = 0;
var categories = [];

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
    currentCategory = params.split("&")[0].split("=")[1];
    selectedCategoryName = params.split("&")[1].split("=")[1];
    $("#category-name").html(selectedCategoryName.toUpperCase());
    loadChannels();
});

function loadChannels() {
    $("#channels").find("*").remove();
    $.ajax({
        type: 'GET',
        url: SERVER_URL + 'get-channels.php',
        dataType: 'text',
        cache: false,
        success: function (a) {
            m3uData = a;
            var length = occurrences(m3uData, "#EXTINF");
            channels = [];
            selectedCategoryName = selectedCategoryName.toLowerCase();
            if (selectedCategoryName == "semua") {
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
                        categoryName = categoryName.toLowerCase();
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
                firstChannel.css("background-color", "#e67e22");
            }
            pointerIndex = 0;
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
        $("#channel-menu-container").css("display", "flex").hide().fadeIn(300);
        channelMenuShown = true;
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
    } else if (channelMenuShown) {
        $("#channel-menu-container").fadeOut(300);
        channelMenuShown = false;
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

function setItemsBorder() {
    var allChannels = $("#channels").find(".channel");
    allChannels.css("background-color", "");
    var allChannelMenu = $("#channels").find(".channel-menu");
    allChannelMenu.css("border", "0");
    allChannelMenu.css("width", "50px");
    allChannelMenu.css("height", "100%");
    $("#navigator-right").css("border", "0");
    $("#navigator-right").css("width", "30px");
    $("#navigator-right").css("height", "50px");
    $("#navigator-left").css("border", "0");
    $("#navigator-left").css("width", "30px");
    $("#navigator-left").css("height", "50px");
    $("#search").css("width", "50px").css("height", "50px").css("border", "0");
    $("#menu").css("width", "50px").css("height", "50px").css("border", "0");
    $("#live-video-container").css("width", "calc(50% - 8px)");
    $("#live-video-container").css("height", "100%");
    $("#live-video-container").css("border", "0");
    if (pointerIndex >= 0 && pointerIndex < channels.length) {
        if (currentPointerInMenu) {
            var channelMenuItem = $("#channels").find(".channel-menu:eq(" + pointerIndex + ")");
            channelMenuItem.css("width", "46px");
            channelMenuItem.css("height", "calc(100% - 4px)");
            channelMenuItem.css("border", "2px solid white");
        } else {
            var channelItem = $("#channels").find(".channel:eq(" + pointerIndex + ")");
            channelItem.css("background-color", "#e67e22");
        }
    } else if (pointerIndex == -1) {
        $("#navigator-right").css("border", "1px solid white");
        $("#navigator-right").css("width", "28px");
        $("#navigator-right").css("height", "48px");
    } else if (pointerIndex == -2) {
        $("#navigator-left").css("border", "1px solid white");
        $("#navigator-left").css("width", "28px");
        $("#navigator-left").css("height", "48px");
    } else if (pointerIndex == -3) {
        $("#search").css("width", "46px").css("height", "46px").css("border", "2px solid white");
    } else if (pointerIndex == -4) {
        $("#menu").css("width", "46px").css("height", "46px").css("border", "2px solid white");
    } else if (pointerIndex == channels.length) {
        $("#live-video-container").css("width", "calc(50% - 14px)");
        $("#live-video-container").css("height", "calc(100% - 6px)");
        $("#live-video-container").css("border", "3px solid white");
    }
}

function setSortingItemsBorder() {
    if (sortingPointerIndex == 0) {
        $("#sort-option-1").css("background-color", "#eeeeee");
        $("#sort-option-2").css("background-color", "");
        $("#sort-option-3").css("background-color", "");
        $("#save").css("width", "150px");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "150px");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
    } else if (sortingPointerIndex == 1) {
        $("#sort-option-1").css("background-color", "");
        $("#sort-option-2").css("background-color", "#eeeeee");
        $("#sort-option-3").css("background-color", "");
        $("#save").css("width", "150px");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "150px");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
    } else if (sortingPointerIndex == 2) {
        $("#sort-option-1").css("background-color", "");
        $("#sort-option-2").css("background-color", "");
        $("#sort-option-3").css("background-color", "#eeeeee");
        $("#save").css("width", "150px");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "150px");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
    } else if (sortingPointerIndex == 3) {
        $("#sort-option-1").css("background-color", "");
        $("#sort-option-2").css("background-color", "");
        $("#sort-option-3").css("background-color", "");
        $("#save").css("width", "146px");
        $("#save").css("height", "36px");
        $("#save").css("border", "2px solid #3498db");
        $("#close").css("width", "150px");
        $("#close").css("height", "40px");
        $("#close").css("border", "0");
    } else if (sortingPointerIndex == 4) {
        $("#sort-option-1").css("background-color", "");
        $("#sort-option-2").css("background-color", "");
        $("#sort-option-3").css("background-color", "");
        $("#save").css("width", "150px");
        $("#save").css("height", "40px");
        $("#save").css("border", "0");
        $("#close").css("width", "146px");
        $("#close").css("height", "36px");
        $("#close").css("border", "2px solid #3498db");
    }
}

function setChannelMenuItemsBorder() {
    $("#channel-menu-item-1").css("background-color", "");
    $("#channel-menu-item-2").css("background-color", "");
    $("#channel-menu-item-3").css("background-color", "");
    $("#channel-menu-item-4").css("background-color", "");
    if (channelMenuPointerIndex == 0) {
        $("#channel-menu-item-1").css("background-color", "#eeeeee");
    } else if (channelMenuPointerIndex == 1) {
        $("#channel-menu-item-2").css("background-color", "#eeeeee");
    } else if (channelMenuPointerIndex == 2) {
        $("#channel-menu-item-3").css("background-color", "#eeeeee");
    } else if (channelMenuPointerIndex == 3) {
        $("#channel-menu-item-4").css("background-color", "#eeeeee");
    }
}

function downKey() {
    if (sortingMenuShown) {
        if (sortingPointerIndex < 4) {
            sortingPointerIndex++;
        }
        setSortingItemsBorder();
    } else if (channelMenuShown) {
        if (channelMenuPointerIndex < 3) {
            channelMenuPointerIndex++;
        }
        setChannelMenuItemsBorder();
    } else {
        if (pointerIndex < channels.length) {
            pointerIndex++;
        }
        setItemsBorder();
    }
}

function upKey() {
    if (sortingMenuShown) {
        if (sortingPointerIndex > 0) {
            sortingPointerIndex--;
        }
        setSortingItemsBorder();
    } else if (channelMenuShown) {
        if (channelMenuPointerIndex > 0) {
            channelMenuPointerIndex--;
        }
        setChannelMenuItemsBorder();
    } else {
        if (pointerIndex > -4) {
            pointerIndex--;
        }
        setItemsBorder();
    }
}

function rightKey() {
    if (sortingMenuShown) {
        if (sortingPointerIndex == 2) {
            sortingPointerIndex = 3;
        }
        setSortingItemsBorder();
    } else {
        if (pointerIndex >= 0 && pointerIndex < channels.length) {
            if (!currentPointerInMenu) {
                currentPointerInMenu = true;
            } else {
                currentPointerInMenu = false;
                pointerIndex = channels.length;
            }
        } else if (pointerIndex == -3) {
            pointerIndex = -4;
        } else if (pointerIndex == -2) {
            pointerIndex = -1;
        }
        setItemsBorder();
    }
}

function leftKey() {
    if (sortingMenuShown) {
        if (sortingPointerIndex == 3) {
            sortingPointerIndex = 2;
        }
        setSortingItemsBorder();
    } else {
        if (pointerIndex == channels.length) {
            pointerIndex = 0;
            currentPointerInMenu = true;
        } else if (pointerIndex >= 0 && pointerIndex < channels.length) {
            currentPointerInMenu = false;
        } else if (pointerIndex == -4) {
            pointerIndex = -3;
        } else if (pointerIndex == -1) {
            pointerIndex = -2;
        }
        setItemsBorder();
    }
}

function enterKey() {
    if (sortingMenuShown) {
        if (sortingPointerIndex == 0) {
            selectSortType(0);
        } else if (sortingPointerIndex == 1) {
            selectSortType(1);
        } else if (sortingPointerIndex == 2) {
            selectSortType(2);
        } else if (sortingPointerIndex == 3) {
            applySorting();
        } else if (sortingPointerIndex == 4) {
            closeSortDialog();
        }
    } else {
        if (pointerIndex == channels.length) {
            switchToFullScreen();
        } else if (pointerIndex >= 0 && pointerIndex < channels.length) {
            if (currentPointerInMenu) {
                currentChannelMenu = pointerIndex;
                $("#channel-menu-container").css("display", "flex").hide().fadeIn(300);
                $("#channel-menu-item-1").css("background-color", "#eeeeee");
                channelMenuShown = true;
            } else {
                if (pointerIndex != currentChannel) {
                    var channelURL = channels[pointerIndex]["url"];
                    playVideo(channelURL);
                    currentChannel = pointerIndex;
                }
            }
        } else if (pointerIndex == -1) {
            toNextCategory();
        } else if (pointerIndex == -2) {
            toPreviousCategory();
        } else if (pointerIndex == -3) {
            var title = "Cari channel";
            if (getLanguage() == 1) {
                title = "Find channel";
            }
            Native.showEditTextDialog(1, getLanguage(), title, "");
        } else if (pointerIndex == -4) {
            showOrHideMenu();
        }
    }
}

function focusChannel(index) {
    var allChannels = $("#channels").find(".channel");
    allChannels.css("background-color", "");
    var allChannelMenu = $("#channels").find(".channel-menu");
    allChannelMenu.css("border", "0");
    allChannelMenu.css("width", "50px");
    allChannelMenu.css("height", "100%");
    $("#navigator-right").css("border", "0");
    $("#navigator-right").css("width", "30px");
    $("#navigator-right").css("height", "50px");
    $("#navigator-left").css("border", "0");
    $("#navigator-left").css("width", "30px");
    $("#navigator-left").css("height", "50px");
    $("#search").css("width", "50px").css("height", "50px").css("border", "0");
    $("#menu").css("width", "50px").css("height", "50px").css("border", "0");
    $("#live-video-container").css("width", "calc(50% - 8px)");
    $("#live-video-container").css("height", "100%");
    $("#live-video-container").css("border", "0");
    var channelItem = $("#channels").find(".channel:eq("+index+")");
    channelItem.css("background-color", "#e67e22");
    pointerIndex = index;
    currentPointerInMenu = false;
}

function editTextFinished(code, value) {
    if (code == 1) {
        value = value.toLowerCase();
        for (var i=0; i<channels.length; i++) {
            var channel = channels[i];
            if (channel.toLowerCase() == channel) {
                focusChannel(i);
                break;
            }
        }
    }
}

function showOrHideMenu() {
    if (!menuShown) {
        $("#menu-container").css("display", "flex");
        menuShown = true;
    } else {
        $("#menu-container").css("display", "none");
        menuShown = false;
    }
}

function refreshChannels() {
    $("#menu-container").css("display", "none");
    loadChannels();
}

function sortCategories() {
    $("#menu-container").css("display", "none");
    $("#sort-container").css("display", "flex");
    if (Native.isAndroidTV() == 1) {
        $("#sort-option-1").css("background-color", "#eeeeee");
    }
    sortingMenuShown = true;
    sortingPointerIndex = 0;
}

function selectSortType(type) {
    selectedSortType = type;
    $("#sort-type-img-1").css("visibility", "hidden");
    $("#sort-type-img-2").css("visibility", "hidden");
    $("#sort-type-img-3").css("visibility", "hidden");
    if (type == 0) {
        $("#sort-type-img-1").css("visibility", "visible");
    } else if (type == 1) {
        $("#sort-type-img-2").css("visibility", "visible");
    } else if (type == 2) {
        $("#sort-type-img-3").css("visibility", "visible");
    }
}

function applySorting() {
    $("#sort-container").css("display", "none");
    loadCategories();
}

function closeSortDialog() {
    $("#sort-container").css("display", "none");
}

function toNextCategory() {
    var video = document.getElementById('live-video');
    video.pause();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-channels.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            Native.show("Channels data length: "+a.length);
            if (a < 0) {
                // Error
            } else {
                m3uData = a;
                var length = occurrences(m3uData, "#EXTINF");
                // Get categories first
                categories = [];
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
                        if (!isCategoryAlreadyAdded(categoryName)) {
                            categories.push(categoryName);
                        }
                    }
                } catch (e) {
                }
                Native.show("Categories length: "+categories.length);
                var selectedSortType = Native.readInt("sort_type", 1);
                if (selectedSortType == 1) {
                    categories.sort(function(a, b) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                        if (a < b) {
                            return -1;
                        } else if (a > b) {
                            return 1;
                        }
                        return 0;
                    });
                } else if (selectedSortType == 2) {
                    categories.sort(function(a, b) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                        if (a < b) {
                            return 1;
                        } else if (a > b) {
                            return -1;
                        }
                        return 0;
                    });
                }
                if (currentCategory < categories.length-1) {
                    currentCategory++;
                }
                selectedCategoryName = categories[currentCategory];
                $("#category-name").html(selectedCategoryName.toUpperCase());
                loadChannels();
            }
        }
    });
}

function toPreviousCategory() {
    var video = document.getElementById('live-video');
    video.pause();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-channels.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            Native.show("Channels data length: "+a.length);
            if (a < 0) {
                // Error
            } else {
                m3uData = a;
                var length = occurrences(m3uData, "#EXTINF");
                // Get categories first
                categories = [];
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
                        if (!isCategoryAlreadyAdded(categoryName)) {
                            categories.push(categoryName);
                        }
                    }
                } catch (e) {
                }
                Native.show("Categories length: "+categories.length);
                var selectedSortType = Native.readInt("sort_type", 1);
                if (selectedSortType == 1) {
                    categories.sort(function(a, b) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                        if (a < b) {
                            return -1;
                        } else if (a > b) {
                            return 1;
                        }
                        return 0;
                    });
                } else if (selectedSortType == 2) {
                    categories.sort(function(a, b) {
                        a = a.toLowerCase();
                        b = b.toLowerCase();
                        if (a < b) {
                            return 1;
                        } else if (a > b) {
                            return -1;
                        }
                        return 0;
                    });
                }
                if (currentCategory > 0) {
                    currentCategory--;
                }
                selectedCategoryName = categories[currentCategory];
                $("#category-name").html(selectedCategoryName.toUpperCase());
                loadChannels();
            }
        }
    });
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