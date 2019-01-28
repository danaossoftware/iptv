$(document).ready(function () {
    $("#time").html(getTime());
    $("#date").html(getDate());
    setTimeout(function () {
        $("#time").html(getTime());
        $("#date").html(getDate());
        setTimeout(this, 1000);
    }, 1000);
    if (getLanguage() == 1) {
        $("#text1").html("General");
        $("#text2").html("Stream Format");
        $("#text3").html("Time Format");
        $("#text4").html("Parental Control");
        $("#text5").html("Default Player");
        $("#text6").html("Player Settings");
        $("#text7").html("HOME");
        $("#text8").html("BACK");
        $("#text9").html("Password:");
        $("#text10").html("Repeat password:");
        $("#text11").html("Save");
        $("#text12").html("Close");
        $("#text13").html("SETTINGS");
    }
    $("#loading-container").fadeOut(300);
});

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
    $("#control-dialog-container").css("display", "none");
    Native.writeString("parental_control_password", password);
    $("#loading-container").fadeOut(300);
    if (getLanguage() == 0) {
        Native.show("Pengaturan disimpan");
    } else if (getLanguage() == 1) {
        Native.show("Settings saved");
    }
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