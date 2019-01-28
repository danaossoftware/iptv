var m3uData;
var menuShowed = false;
var selectedSortType = 1;

$(document).ready(function() {
    loadCategories();
    $(document).mouseup(function(e) {
        var container = $("#menu-container");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $("#menu-container").css("display", "none");
        }
    });
    if (getLanguage() == 1) {
        $("#text1").html("Home");
        $("#text2").html("HOME");
        $("#text3").html("BACK");
        $("#text4").html("Refresh Channel List");
        $("#text5").html("Refresh Guide Panel");
        $("#text6").html("Sort by");
        $("#text7").html("Settings");
        $("#text8").html("Log Out");
    }
});

function loadCategories() {
    $("#categories").find("*").remove();
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-channels.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
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
                $("#categories").append("<div class=\"category\" style=\"cursor: pointer; margin-left: 10px; margin-right: 10px; margin-top: 20px; position: relative; width: calc(50% - 20px); height: 60px;\">\n" +
                    "<div style='margin-left: 10px; height: 100%; display: flex; flex-flow: row nowrap; align-items: center;'>" +
                    "   <img src='img/channel.png' width='20px' height='18px'>" +
                    "   <div style='color: white; margin-left: 10px; margin-top: -3px;'>Semua</div>" +
                    "</div>" +
                    "<div style='position: absolute; height: 100%; right: 10px; top: 0; display: flex; flex-flow: row nowrap; align-items: center;'>" +
                    "   <div style='color: white; margin-right: 10px; margin-top: -3px;'>"+length+"</div>" +
                    "   <img src='img/right.png' width='20px' height='18px' style='margin-right: 10px;'>" +
                    "</div>" +
                    "</div>");
                for (var i = 0; i < categories.length; i++) {
                    var categoryName = categories[i];
                    var indicatorDisplay;
                    if (i == 0) {
                        indicatorDisplay = "block";
                    } else {
                        indicatorDisplay = "none";
                    }
                    $("#categories").append("<div class=\"category\" style=\"cursor: pointer; margin-left: 10px; margin-right: 10px; margin-top: 20px; position: relative; width: calc(50% - 20px); height: 60px;\">\n" +
                        "<div style='margin-left: 10px; height: 100%; display: flex; flex-flow: row nowrap; align-items: center;'>" +
                        "   <img src='img/channel.png' width='20px' height='18px'>" +
                        "   <div style='color: white; margin-left: 10px; margin-top: -3px;'>" + categoryName + "</div>" +
                        "</div>" +
                        "<div style='position: absolute; height: 100%; right: 10px; top: 0; display: flex; flex-flow: row nowrap; align-items: center;'>" +
                        "   <div style='color: white; margin-right: 10px; margin-top: -3px;'>"+getChannelsCount(categoryName)+"</div>" +
                        "   <img src='img/right.png' width='20px' height='18px' style='margin-right: 10px;'>" +
                        "</div>" +
                        "</div>");
                }
                setCategoryClickListener();
                if (Native.isAndroidTV() == 1) {
                    var firstCategory = $("#categories").find(".category");
                    firstCategory.css("border", "2px solid white");
                    firstCategory.css("width", "calc(50% - 24px)");
                    firstCategory.css("height", "56px");
                }
            }
        }
    });
}

function setCategoryClickListener() {
    $(".category").on("click", function() {
        var index = $(".category").parent().children().index(this);
        var categoryName = categories[index];
        if (selectedSortType == 1) {
            if (index == 0) {
                categoryName = "Semua";
            }
        } else if (selectedSortType == 2) {
            if (index == categories.length-1) {
                categoryName = "Semua";
            }
        }
        window.location.href = "channels/live.html?cat="+index+"&name="+categoryName;
    });
}

function getChannelsCount(categoryName) {
    var channelsCount = occurrences(m3uData, "group-title=\""+categoryName+"\"");
    return channelsCount;
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

function showOrHideMenu() {
    if (!menuShowed) {
        $("#menu-container").css("display", "flex");
        menuShowed = true;
    } else {
        $("#menu-container").css("display", "none");
        menuShowed = false;
    }
}

function refreshCategories() {
    $("#menu-container").css("display", "none");
    loadCategories();
}

function sortCategories() {
    $("#menu-container").css("display", "none");
    $("#sort-container").css("display", "flex");
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