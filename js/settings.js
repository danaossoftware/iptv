var xmlData;

$(document).ready(function() {
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function() {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    loadSettings();
});

function loadSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var parser = new DOMParser();
            xmlData = parser.parseFromString(a, "text/xml");
            $("#loading-container").fadeOut(300);
        }
    });
}

function setPassword() {
    $("#error").css("display", "none");
    var password = $("#control-password").val();
    var repeatedPassword = $("#repeated-control-password").val();
    if (password == "" || repeatedPassword == "") {
        $("#error").html("Mohon isi kata sandi");
        $("#error").css("display", "block");
        return;
    }
    if (password != repeatedPassword) {
        $("#error").html("Kata sandi tidak cocok");
        $("#error").css("display", "block");
        return;
    }
    $("#loading-container").css("display", "flex").hide().fadeIn(300);
    xmlData.getElementsByTagName("control-password")[0].childNodes[0].nodeValue = password;
    var fd = new FormData();
    fd.append("settings", new XMLSerializer().serializeToString(xmlData));
    $.ajax({
        type: 'POST',
        url: SERVER_URL+'update-settings.php',
        data: fd,
        contentType: false,
        processData: false,
        cache: false,
        success: function(a) {
            $("#control-dialog-container").css("display", "none");
            $("#loading-container").fadeOut(300);
        }
    });
}

function openControlDialog() {
    $("#control-password").val("");
    $("#repeated-control-password").val("");
    $("#control-dialog-container").css("display", "flex").hide().fadeIn(300);
}

function closeControlDialog() {
    $("#control-dialog-container").fadeOut(300);
}

function saveSettings() {
}