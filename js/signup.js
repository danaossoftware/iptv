var currentIndex = -1;
const SERVER_URL = "https://iptvjoss.com/iptv/php/";
var language = 0;

$(document).ready(function() {
	language = Native.readInt("language", 0);
    if (language == 1) {
        $("#text1").html("Signup");
        $("#phone").attr("placeholder", "Phone Number");
        $("#username").attr("placeholder", "Username");
        $("#password").attr("placeholder", "Password");
        $("#signup").html("SIGN UP");
        $("#text2").html("Have account already? Login here");
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                window.location.href = "landing.html";
            }
        }
    });
});

function signup() {
    $("#error").css("display", "none");
    var phone = $("#phone").val().trim();
    var password = $("#password").val().trim();
    var username = $("#username").val().trim();
    if (phone == '') {
        $("#error").html("Mohon masukkan no. HP");
        $("#error").css("display", "block");
        return;
    }
    if (username == '') {
        $("#error").html("Mohon masukkan username");
        $("#error").css("display", "block");
        return;
    }
    if (password == '') {
        $("#error").html("Mohon masukkan kata sandi");
        $("#error").css("display", "block");
        return;
    }
    if (password.length < 8) {
        $("#error").html("Masukkan kata sandi minimum 8 karakter");
        $("#error").css("display", "block");
        return;
    }
    if (!validatePhoneNumber(phone)) {
        $("#error").html("Mohon periksa nomor telepon Anda");
        $("#error").show();
        return;
    }
    $("#loading-container").css("display", "flex");
    $.ajax({
        type: 'GET',
        url: 'https://iptvjoss.com/iptv/php/signup.php',
        data: {'phone': phone, 'username': username, 'password': password},
        dataType: 'text',
        cache: false,
        success: function(a) {
            $("#loading-container").css("display", "none");
            if (a == 0) {
                // Success
                window.location.href = 'wait-for-confirmation.html';
            } else if (a == -2) {
                // User sudah ada
                $("#error").html("Nomor handphone sudah digunakan");
                $("#error").css("display", "block");
            }
        }
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function validatePhoneNumber(phone) {
    var isPhone = true;
    for (var i=0; i<phone.length; i++) {
        var char = phone.charAt(i);
        if (char < '0' || char > '9') {
            isPhone = false;
            break;
        }
    }
    return isPhone;
}

function backKey() {
    Native.finishApp();
}

function downKey() {
    if (currentIndex < 4) {
        currentIndex++;
    }
    focusToIndex();
}

function upKey() {
    if (currentIndex > 0) {
        currentIndex--;
    }
    focusToIndex();
}

function focusToIndex() {
    switch (currentIndex) {
        case 0:
			$("#phone").css("border", "2px solid #3498db");
			$("#username").css("border", "0");
			$("#password").css("border", "0");
			$("#signup").css("border", "0");
			$("#text2").css("border", "0");
            break;
        case 1:
			$("#phone").css("border", "0");
			$("#username").css("border", "2px solid #3498db");
			$("#password").css("border", "0");
			$("#signup").css("border", "0");
			$("#text2").css("border", "0");
            break;
        case 2:
			$("#phone").css("border", "0");
			$("#username").css("border", "0");
			$("#password").css("border", "2px solid #3498db");
			$("#signup").css("border", "0");
			$("#text2").css("border", "0");
            break;
        case 3:
			$("#phone").css("border", "0");
			$("#username").css("border", "0");
			$("#password").css("border", "0");
			$("#signup").css("border", "2px solid #3498db");
			$("#text2").css("border", "0");
            break;
        case 4:
			$("#phone").css("border", "0");
			$("#username").css("border", "0");
			$("#password").css("border", "0");
			$("#signup").css("border", "0");
			$("#text2").css("border", "2px solid #3498db");
            break;
    }
}

function enterKey() {
	if (currentIndex == 0) {
		var title = "Nomor handphone";
		if (language == 1) {
			title = "Phone number";
		}
		Native.showEditTextDialog(1, language, title, "");
    } else if (currentIndex == 1) {
		var title = "Nama pengguna";
		if (language == 1) {
			title = "Username";
		}
		Native.showEditTextDialog(2, language, title, "");
    } else if (currentIndex == 2) {
		var title = "Kata sandi";
		if (language == 1) {
			title = "Password";
		}
		Native.showPasswordDialog(3, language, title, "");
    } else if (currentIndex == 3) {
        signup();
    } else if (currentIndex == 4) {
        window.location.href = "login.html";
    }
}

function editTextFinished(code, value) {
	if (code == 1) {
		$("#phone").val(value);
	} else if (code == 2) {
		$("#username").val(value);
	} else if (code == 3) {
		$("#password").val(value);
	}
}