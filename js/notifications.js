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
                var items = "";
                for (var i=0; i<notifications.length; i++) {
                    var notification = notifications[i];
                    var title = notification["title"];
                    var content = notification["content"];
                    if (content.length > 128) {
                        content = content.substr(0, 128);
                        content += "...";
                    }
                    items += "<div class=\"notification-item\" style=\"padding-left: 30px; padding-right: 20px; padding-top: 20px; padding-bottom: 20px; width: calc(100% - 50px); display: flex; flex-flow: row nowrap;\">\n" +
                        "                    <div style=\"color: #9999a2;\">19:32</div>\n" +
                        "                    <img src=\"img/message.png\" width=\"25px\" height=\"25px\" style=\"margin-left: 20px; margin-top: 6px;\">\n" +
                        "                    <div style=\"display: flex; flex-flow: column nowrap; margin-left: 20px;\">\n" +
                        "                        <div style=\"color: #8181ac;\">"+title+"</div>\n" +
                        "                        <div style=\"color: #777777; margin-top: 10px;\">"+content+"</div>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "                <div style=\"width: calc(100% - 40px); margin-left: 40px; height: 1px; background-color: rgba(0, 0, 0, .1); margin-top: 0;\"></div>";
                }
                $("#notifications").append(items);
            }
        }
    });
}