var monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

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
            $("#loading-container").css("display", "none");
            if (a < 0) {
                // Error
            } else {
                var user = JSON.parse(a);
                $("#username").html(user["username"]);
                if (user["end_date"] != '' && user["made_in"] != 0) {
                    var date = new Date(parseInt(user["end_date"]));
                    $("#enddate").html("" + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear());
                }
                if (user["is_trial"] == 1) {
                    $("#trial").html("Ya");
                } else {
                    $("#trial").html("Tidak");
                }
                $("#active-connections").html(user["active_connections"]);
                if (user["made_in"] != '' && user["made_in"] != 0) {
                    date = new Date(parseInt(user["made_in"]));
                    $("#made-in").html(date.getDate()+" "+monthNames[date.getMonth()]+" "+date.getFullYear());
                }
                $("#maximum-connections").html(user["maximum_connections"]);
                var profilePictureURL = user["profile_picture_url"];
                if (profilePictureURL != "") {
                    $("#profile-picture").attr("src", profilePictureURL);
                }
            }
        }
    });
}

function editProfile() {
    window.location.href = "edit-profile.html";
}