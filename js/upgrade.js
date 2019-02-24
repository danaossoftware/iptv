var currentIndex = -1;

$(document).ready(function() {
    $("#loading-container").css("display", "flex").hide().fadeIn(500);
    window.addEventListener("scroll", function(e) {
        console.log(this.scrollY);
        if (this.scrollY > 612) {
            $("#type-3").css("width", "160px");
        } else if (this.scrollY >= 130) {
            $("#type-3").css("width", "190px");
        } else if (this.scrollY < 130) {
            $("#type-3").css("width", "160px");
        }
    });
    getSettings();
});

function getSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-json-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            try {
                var settings = JSON.parse(a)["settings"];
                var month1 = settings.purchasing[0];
                var features1 = month1["features"];
                $("#price1").html("Rp "+month1["price"]);
                for (var i=0; i<features1.length; i++) {
                    $("#prices1").append("<div style=\"color: #eeeeee; width: 100%; display: flex; justify-content: center;\">"+features1[i]["msg"]+"</div>");
                }
                var month2 = settings.purchasing[1];
                var features2 = month2["features"];
                $("#price2").html("Rp "+month2["price"]);
                for (var i=0; i<features2.length; i++) {
                    $("#prices2").append("<div style=\"color: #eeeeee; width: 100%; display: flex; justify-content: center;\">"+features2[i]["msg"]+"</div>");
                }
                var month3 = settings.purchasing[2];
                var features3 = month3["features"];
                $("#price3").html("Rp "+month3["price"]);
                for (var i=0; i<features3.length; i++) {
                    $("#prices3").append("<div style=\"color: #eeeeee; width: 100%; display: flex; justify-content: center;\">"+features3[i]["msg"]+"</div>");
                }
                var month4 = settings.purchasing[3];
                var features4 = month4["features"];
                $("#price4").html("Rp "+month4["price"]);
                for (var i=0; i<features4.length; i++) {
                    $("#prices4").append("<div style=\"color: #eeeeee; width: 100%; display: flex; justify-content: center;\">"+features4[i]["msg"]+"</div>");
                }
                $("#loading-container").fadeOut(500);
            } catch (e) {
                console.log(e.toString());
                show(e.toString());
            }
        }
    });
}

function downKey() {
    if (currentIndex < 4) {
        currentIndex++;
    }
    focusToCurrentIndex();
}

function focusToCurrentIndex() {
    if (currentIndex == 0) {
        $("#upgrade-1").css("border", "2px solid white");
        $("#upgrade-3").css("border", "0");
        $("#upgrade-6").css("border", "0");
        $("#upgrade-12").css("border", "0");
        $("#back").css("border", "0").css("width", "200px").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#type-1").offset().top
        });
    } else if (currentIndex == 1) {
        $("#upgrade-1").css("border", "0");
        $("#upgrade-3").css("border", "2px solid white");
        $("#upgrade-6").css("border", "0");
        $("#upgrade-12").css("border", "0");
        $("#back").css("border", "0").css("width", "200px").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#type-3").offset().top
        });
    } else if (currentIndex == 2) {
        $("#upgrade-1").css("border", "0");
        $("#upgrade-3").css("border", "0");
        $("#upgrade-6").css("border", "2px solid white");
        $("#upgrade-12").css("border", "0");
        $("#back").css("border", "0").css("width", "200px").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#type-6").offset().top
        });
    } else if (currentIndex == 3) {
        $("#upgrade-1").css("border", "0");
        $("#upgrade-3").css("border", "0");
        $("#upgrade-6").css("border", "0");
        $("#upgrade-12").css("border", "2px solid white");
        $("#back").css("border", "0").css("width", "200px").css("height", "40px");
        $("html, body").animate({
            scrollTop: $("#type-12").offset().top
        });
    } else if (currentIndex == 4) {
        $("#upgrade-1").css("border", "0");
        $("#upgrade-3").css("border", "0");
        $("#upgrade-6").css("border", "0");
        $("#upgrade-12").css("border", "0");
        $("#back").css("border", "3px solid white").css("width", "194px").css("height", "34px");
        $("html, body").animate({
            scrollTop: $("#back").offset().top
        });
    }
}

function upKey() {
    var top = $("html").offset().top-10;
    if (top < 0) {
        top = 0;
    }
    $("html, body").animate({
        scrollTop: top
    });
}

function enterKey() {
    if (currentIndex == 0) {
        window.location.href='purchase.html?type=1';
    } else if (currentIndex == 1) {
        window.location.href='purchase.html?type=2';
    } else if (currentIndex == 2) {
        window.location.href='purchase.html?type=3';
    } else if (currentIndex == 3) {
        window.location.href='purchase.html?type=4';
    } else if (currentIndex == 4) {
        window.history.back();
    }
}