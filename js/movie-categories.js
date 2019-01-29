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
                        if (categoryName == 'Movie') {
                            if (!isCategoryAlreadyAdded(categoryName)) {
                                categories.push(categoryName);
                            }
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
                    $("#categories").append("<div class=\"category\" style=\"cursor: pointer; margin-left: 10px; margin-right: 10px; margin-top: 20px; position: relative; width: calc(50% - 20px);\">\n" +
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
                    var firstCategory = $("#categories").find("div:eq(0)");
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
        alert(categories[index]);
        window.location.href = "channels/live.html?cat="+index+"&name="+categories[index];
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

function setItemsBorder() {
    var allCategories = $("#categories").find(".category");
    allCategories.css("width", "calc(50% - 20px)");
    allCategories.css("height", "60px");
    allCategories.css("border", "0");
    if (pointerIndex == -1) {
        $("#search").css("border", "2px solid white");
        $("#search").css("width", "46px");
        $("#search").css("height", "46px");
        $("#menu").css("border", "0");
        $("#menu").css("width", "50px");
        $("#menu").css("height", "50px");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#search").offset().top
        }, 0);
    } else if (pointerIndex == -2) {
        $("#search").css("border", "0");
        $("#search").css("width", "50px");
        $("#search").css("height", "50px");
        $("#menu").css("border", "2px solid white");
        $("#menu").css("width", "46px");
        $("#menu").css("height", "46px");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#search").offset().top
        }, 0);
    } else if (pointerIndex >= 0 && pointerIndex <= categories.length) {
        var currentCategory = $("#categories").find(".category:eq("+pointerIndex+")");
        currentCategory.css("width", "calc(50% - 24px)");
        currentCategory.css("height", "56px");
        currentCategory.css("border", "2px solid white");
        $("#search").css("border", "0");
        $("#search").css("width", "50px");
        $("#search").css("height", "50px");
        $("#menu").css("border", "0");
        $("#menu").css("width", "50px");
        $("#menu").css("height", "50px");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $(".category:eq(" + pointerIndex + ")").offset().top
        }, 0);
    } else if (pointerIndex == categories.length+1) {
        $("#search").css("border", "0");
        $("#search").css("width", "50px");
        $("#search").css("height", "50px");
        $("#menu").css("border", "0");
        $("#menu").css("width", "50px");
        $("#menu").css("height", "50px");
        $("#home").css("width", "194px");
        $("#home").css("height", "34px");
        $("#home").css("border", "3px solid white");
        $("#back").css("width", "200px");
        $("#back").css("height", "40px");
        $("#back").css("border", "0");
        $("html, body").animate({
            scrollTop: $("#home").offset().top
        }, 0);
    } else if (pointerIndex == categories.length+2) {
        $("#search").css("border", "0");
        $("#search").css("width", "50px");
        $("#search").css("height", "50px");
        $("#menu").css("border", "0");
        $("#menu").css("width", "50px");
        $("#menu").css("height", "50px");
        $("#home").css("width", "200px");
        $("#home").css("height", "40px");
        $("#home").css("border", "0");
        $("#back").css("width", "194px");
        $("#back").css("height", "34px");
        $("#back").css("border", "3px solid white");
        $("html, body").animate({
            scrollTop: $("#back").offset().top
        }, 0);
    }
}

function downKey() {
    if (pointerIndex >= 0 && pointerIndex <= categories.length) {
        if (pointerIndex < categories.length) {
            pointerIndex += 2;
        } else {
            pointerIndex++;
        }
    } else {
        if (pointerIndex < categories.length+2) {
            pointerIndex++;
        }
    }
    setItemsBorder();
}

function upKey() {
    if (pointerIndex > 1 && pointerIndex <= categories.length) {
        pointerIndex -= 2;
    } else {
        if (pointerIndex > -2) {
            pointerIndex--;
        }
    }
    setItemsBorder();
}

function rightKey() {
    if (pointerIndex == -1) {
        pointerIndex = -2;
    } else if (pointerIndex < categories.length+2) {
        pointerIndex++;
    }
    setItemsBorder();
}

function leftKey() {
    if (pointerIndex == -2) {
        pointerIndex = -1;
    } else if (pointerIndex > 0) {
        pointerIndex--;
    }
    setItemsBorder();
}

function enterKey() {
    if (pointerIndex == -1) {
        var title = "Cari channel";
        if (getLanguage() == 1) {
            title = "Find channel";
        }
        Native.showEditTextDialog(1, getLanguage(), title, "");
    } else if (pointerIndex == -2) {
        showOrHideMenu();
    } else if (pointerIndex >= 0 && pointerIndex <= categories.length) {
        var categoryName = categories[pointerIndex];
        if (selectedSortType == 1) {
            if (pointerIndex == 0) {
                categoryName = "Semua";
            }
        } else if (selectedSortType == 2) {
            if (pointerIndex == categories.length) {
                categoryName = "Semua";
            }
        }
        window.location.href = "channels/live.html?cat="+pointerIndex+"&name="+categoryName;
    } else if (pointerIndex == categories.length+1) {
        window.location.href = "landing.html";
    } else if (pointerIndex == categories.length+2) {
        window.history.back();
    }
}

function focusChannel(index) {
    var allCategories = $("#categories").find(".category");
    allCategories.css("width", "calc(50% - 20px)");
    allCategories.css("height", "60px");
    allCategories.css("border", "0");
    $("#search").css("border", "0");
    $("#search").css("width", "50px");
    $("#search").css("height", "50px");
    $("#menu").css("border", "0");
    $("#menu").css("width", "50px");
    $("#menu").css("height", "50px");
    $("#home").css("width", "200px");
    $("#home").css("height", "40px");
    $("#home").css("border", "0");
    $("#back").css("width", "200px");
    $("#back").css("height", "40px");
    $("#back").css("border", "0");
    var categoryItem = $("#categories").find(".category:eq("+index+")");
    categoryItem.css("width", "calc(50% - 24px)");
    categoryItem.css("height", "56px");
    categoryItem.css("border", "2px solid white");
    $("html, body").animate({
        scrollTop: categoryItem.offset().top
    }, 0);
    pointerIndex = index;
}

function editTextFinished(code, value) {
    Native.show("Searching for: "+value);
    if (code == 1) {
        value = value.toLowerCase();
        for (var i=0; i<categories.length; i++) {
            var category = categories[i];
            if (category.toLowerCase() == value) {
                Native.show("Channel found: "+category);
                if (selectedSortType == 1) {
                    focusChannel(i+1);
                } else if (selectedSortType == 2) {
                    focusChannel(i-1);
                }
                break;
            }
        }
    }
}