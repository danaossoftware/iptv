var currentIndex = -1;
const SERVER_URL = "https://iptvjoss.com/iptv/php/";
var dialogShown = false;
var language = 0;

$(document).ready(function() {
	language = Native.readInt("language", 0);
    if (language == 1) {
        $("#text1").html("Enter your login detail");
        $("#phone").attr("placeholder", "Phone Number");
        $("#password").attr("placeholder", "Password");
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

function login() {
    $("#error-container").css("display", "none");
    var phone = $("#phone").val();
    var password = $("#password").val();
    if (phone == '' || password == '') {
        return;
    }
    var rememberMe = 0;
    if ($("#remember-me").prop("checked") == true) {
        rememberMe = 1;
    }
    Native.login(phone, password);
    /*$.ajax({
        type: 'GET',
        url: 'https://iptvjoss.com/iptv/php/login.php',
        data: {'phone': phone, 'password': password, 'remember-me': rememberMe},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == 0) {
                // Success
                window.location.href = 'landing.html';
            } else {
                Native.show("Response: "+a);
                var response = parseInt(a);
                if (response == -1) {
                    // User not found
                    $("#error").html("User tidak ditemukan");
                    $("#error-container").css("display", "flex");
                } else if (response == -2) {
                    // User not confirmed
                    $("#error").html("Maaf, akun Anda belum disetujui. Silahkan cek beberapa saat lagi sampai admin menyetujui akun Anda.");
                    $("#error-container").css("display", "flex");
                } else if (response == -3) {
                    // Password not macthes
                    $("#error").html("Kata sandi tidak cocok");
                    $("#error-container").css("display", "flex");
                } else if (response == -4) {
                    // Maximum connections reached
                    dialogShown = true;
                    $("#error").html("Maaf, jumlah maksimum koneksi terlampaui. Silahkan keluar dari perangkat lain terlebih dahulu, atau hubungi admin.");
                    $("#error-container").css("display", "flex");
                    $.ajax({
                        type: 'GET',
                        url: SERVER_URL+'get-configuration.php',
                        data: {'name': 'admin-info'},
                        dataType: 'text',
                        cache: false,
                        success: function(a) {
                            if (a < 0) {
                                // Error
                            } else {
                                $("#error").html("Maaf, jumlah maksimum koneksi terlampaui. Silahkan keluar dari perangkat lain terlebih dahulu, atau hubungi admin di "+a["config1"].split("=")[1]+".");
                                $("#error-container").css("display", "flex");
                            }
                        }
                    });
                }
            }
        }
    });*/
}

function backKey() {
    Native.finishApp();
}

function closeErrorDialog() {
    $("#error-container").fadeOut(300);
    dialogShown = false;
}

function downKey() {
	Native.log("Down key");
    if (currentIndex < 3) {
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

function enterKey() {
    if (dialogShown) {
        closeErrorDialog();
    } else {
		if (currentIndex == 0) {
			var title = "No. HP atau username";
			if (language == 1) {
				title = "Phone number or username";
			}
			Native.showEditTextDialog(1, language, title, "");
		} else if (currentIndex == 1) {
			var title = "Kata sandi";
			if (language == 1) {
				title = "Password";
			}
			Native.showPasswordDialog(2, language, title, "");
        } else if (currentIndex == 2) {
            login();
        } else if (currentIndex == 3) {
            window.location.href = "signup.html";
		}
    }
}

function editTextFinished(code, value) {
	if (code == 1) {
		$("#phone").val(value);
	} else if (code == 2) {
		$("#password").val(value);
	}
}

function focusToIndex() {
    Native.log("Current index: "+currentIndex);
    switch (currentIndex) {
        case 0:
			$("#phone").css("border", "2px solid #3498db");
			$("#password").css("border", "0");
			$("#login").css("border", "0");
			$("#div1").css("border", "0");
            break;
        case 1:
			$("#phone").css("border", "0");
			$("#password").css("border", "2px solid #3498db");
			$("#login").css("border", "0");
			$("#div1").css("border", "0");
            break;
		case 2:
			$("#phone").css("border", "0");
			$("#password").css("border", "0");
			$("#login").css("border", "2px solid #3498db");
			$("#div1").css("border", "0");
			break;
		case 3:
			$("#phone").css("border", "0");
			$("#password").css("border", "0");
			$("#login").css("border", "0");
			$("#div1").css("border", "2px solid #3498db");
			break;
        default:
			$("#phone").css("border", "0");
			$("#password").css("border", "0");
			$("#login").css("border", "0");
			$("#div1").css("border", "0");
            hideKeyboard();
            break;
    }
}

function disableKeyListener() {
    Native.disableKeyListener();
}