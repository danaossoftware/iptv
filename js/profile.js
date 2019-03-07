var monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

$(document).ready(function() {
    Native.log("Hello, world 3");
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
                var endDate = parseInt(user["end_date"]);
                Native.log("End date: "+endDate);
                if (endDate != 0) {
                    var date = new Date(1551924607134);
                    $("#enddate").html("" + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear());
                } else {
                    $("#enddate").html("-");
                }
                if (user["is_trial"] == 1) {
                    $("#trial").html("Ya");
                } else {
                    $("#trial").html("Tidak");
                }
                $("#active-connections").html(user["active_connections"]);
                var madeIn = parseInt(user["made_in"]);
                if (madeIn != 0) {
                    date = new Date(madeIn);
                    $("#made-in").html(date.getDate()+" "+monthNames[date.getMonth()]+" "+date.getFullYear());
                } else {
                    var msg = "Tidak diketahui";
                    if (Native.getLanguage() == 1) {
                        msg = "Unknown";
                    }
                    $("#made-in").html(msg);
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