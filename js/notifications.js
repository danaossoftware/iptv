var notificationsJSON;

$(document).ready(function() {
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
                    items += "<div class=\"notification-item\" style=\"background-color: rgba(136, 136, 136, .5); padding-left: 30px; padding-right: 20px; padding-top: 20px; padding-bottom: 20px; width: calc(100% - 50px); display: flex; flex-flow: row nowrap; margin-top: 10px; overflow: hidden;\">\n" +
                        "                    <div style=\"color: #eeeeee;\">19:32</div>\n" +
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