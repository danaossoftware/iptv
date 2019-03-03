var profilePictureFile = null;

$(document).ready(function() {
    loadProfile();
});

function loadProfile() {
    $.ajax({
        type: 'GET',
        url: 'https://iptvjoss.com/iptv/php/get-user-info.php',
        data: {'user_id': Native.getUserID()},
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a < 0) {
                // Error
            } else {
                $("#loading-container").css("display", "none");
                var user = JSON.parse(a);
                $("#name").val(user["name"]);
                $("#username").val(user["username"]);
                $("#city").val(user["city"]);
                var profilePictureURL = user["profile_picture_url"];
                $("#profile-picture").attr("src", profilePictureURL);
            }
        }
    });
}

function cancelEdittingProfile() {
    window.history.back();
}

function saveEdittedProfile() {
    $("#error").css("display", "none");
    var name = $("#name").val();
    var username = $("#username").val();
    var city = $("#city").val();
    if (name == '') {
        $("#error").html("Nama tidak boleh kosong");
        $("#error").css("display", "block");
        return;
    }
    if (username == '') {
        $("#error").html("Nama pengguna tidak boleh kosong");
        $("#error").css("display", "block");
        return;
    }
    $("#loading-container").css("display", "flex");
    var profilePictureURL = "";
    if (profilePictureFile != null) {
        var profilePictureName = guid();
        profilePictureURL = 'https://iptvjoss.com/iptv/userdata/imgs/'+profilePictureName;
        var fd = new FormData();
        fd.append("img-file-name", profilePictureName);
        fd.append("img-file", profilePictureFile);
        fd.append("user_id", Native.getUserID());
        $.ajax({
            type: 'POST',
            url: SERVER_URL+'upload-img.php',
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function(a) {
                $.ajax({
                    type: 'GET',
                    url: 'https://iptvjoss.com/iptv/php/update-profile.php',
                    data: {'user_id': Native.getUserID(), 'name': name, 'username': username, 'city': city, 'profile-picture-url': profilePictureURL},
                    dataType: 'text',
                    cache: false,
                    success: function(a) {
                        if (a == -1) {
                            $("#error").html("Maaf, nama pengguna sudah digunakan");
                            $("#error").css("display", "block");
                        } else {
                            window.location.href = "home.html";
                        }
                    },
                    error: function(a, b, c) {
                    }
                });
            }
        });
    } else {
        $.ajax({
            type: 'GET',
            url: 'https://iptvjoss.com/iptv/php/update-profile.php',
            data: {'user_id': Native.getUserID(), 'name': name, 'username': username, 'city': city, 'profile-picture-url': profilePictureURL},
            dataType: 'text',
            cache: false,
            success: function(a) {
                if (a == -1) {
                    $("#error").html("Maaf, nama pengguna sudah digunakan");
                    $("#error").css("display", "block");
                } else {
                    window.location.href = "home.html";
                }
            },
            error: function(a, b, c) {
            }
        });
    }
}

function changeProfilePicture() {
    $("#select-profile-picture").on("change", function() {
        var file = $(this).prop("files")[0];
        profilePictureFile = file;
        var fr = new FileReader();
        fr.onload = function() {
            $("#profile-picture").attr("src", fr.result);
        };
        fr.readAsDataURL(file);
    });
    $("#select-profile-picture").click();
}

function deleteProfilePicture() {
    $("#prompt-text").html("Apakah Anda yakin ingin menghapus foto profil Anda?")
    $("#prompt-cancel").on("click", function() {
        $("#prompt-container").css("display", "none");
    });
    $("#prompt-ok").on("click", function() {
        profilePictureFile = null;
        $("#profile-picture").attr("src", "img/profile_icon.png");
        $("#prompt-container").css("display", "none");
    });
    $("#prompt-container").css("display", "flex");
}