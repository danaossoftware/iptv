var currentIndex = -1;
var notificationsJSON;

$(document).ready(function() {
    if (getLanguage() == 1) {
        $("#text1").html("BACK");
        $("#text2").html("NOTIFIKASI");
        $("#text3").html("BACA NOTIFIKASI");
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(function() {
            $("#time").html(getTime());
            $("#date").html(getDate());
            setTimeout(this, 1000);
        }, 1000);
    }
    getNotifications();
});

function getNotifications() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-notifications.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
                $("#loading-container").fadeOut(300);
            } else {
                var notifications = JSON.parse(a);
                notificationsJSON = notifications;
                var items = "";
                for (var i=0; i<notifications.length; i++) {
                    var notification = notifications[i];
                    var title = notification["title"];
                    var content = notification["content"];
                    if (content.length > 128) {
                        content = content.substr(0, 128);
                        content += "...";
                    }
                    var date = new Date(parseInt(notification["date"]));
                    var day = date.getDate();
                    var month = date.getMonth();
                    var year = date.getFullYear();
                    items += "<div class=\"notification-item\" style=\"background-color: rgba(136, 136, 136, .5); padding-left: 30px; padding-right: 20px; padding-top: 20px; padding-bottom: 20px; width: calc(100% - 50px); display: flex; flex-flow: row nowrap; margin-top: 10px; overflow: hidden;\">\n" +
                        "                    <div style=\"color: #eeeeee;\">"+day+" "+getMonthName(month)+" "+year+"</div>\n" +
                        "                    <div style=\"display: flex; flex-flow: column nowrap; margin-left: 20px;\">\n" +
                        "                        <div style=\"color: white; font-family: 'PalanquinBold'; font-size: 17px;\">"+title+"</div>\n" +
                        "                        <div style=\"color: white; margin-top: 10px;\">"+content+"</div>\n" +
                        "                    </div>\n" +
                        "                </div></div>";
                }
                $("#notifications").append(items);
                $("#loading-container").fadeOut(300);
                setNotificationClickListener();
            }
        }
    });
}

function setNotificationClickListener() {
    $(".notification-item").on("click", function() {
        var index = $(this).parent().children().index(this);
        var notification = notificationsJSON[index];
        var title = notification["title"];
        var content = notification["content"];
        $("#notification-title").html(title);
        $("#notification-text").html(content);
        openNotificationReviewDialog();
    });
}

function openNotificationReviewDialog() {
    $("#notification-dialog-ctr").css("display", "flex").hide().fadeIn(300);
}

function closeNotificationReviewDialog() {
    $("#notification-dialog-ctr").fadeOut(300);
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

function enterKey() {
    if (currentIndex == 0) {
        window.history.back();
    } else {
        var index = currentIndex-1;
        var notification = notificationsJSON[index];
        var title = notification["title"];
        var content = notification["content"];
        $("#notification-title").html(title);
        $("#notification-text").html(content);
        openNotificationReviewDialog();
    }
}

function focusToCurrentIndex() {
    if (currentIndex == 0) {
        $("#back").css("border", "3px solid white").css("width", "calc(50% - 31px)").css("height", "34px");
        $(".notification-item").css("border", "0").css("width", "calc(100% - 50px)");
        $("html, body").animate({
            scrollTop: $("#back").offset().top
        });
    } else {
        $("#back").css("border", "0").css("width", "calc(50% - 25px)").css("height", "40px");
        $(".notification-item").css("border", "0").css("width", "calc(100% - 50px)");
        $(".notification-item:eq("+(currentIndex-1)+")").css("border", "3px solid white").css("width", "calc(100% - 56px)");
        $("html, body").animate({
            scrollTop: $(".notification-item:eq("+(currentIndex-1)+")").offset().top
        });
    }
}