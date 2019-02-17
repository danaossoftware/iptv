$(document).ready(function() {
    $("#loading-container").css("display", "flex").hide().fadeIn(500);
    window.addEventListener("scroll", function(e) {
        console.log(this.scrollY);
        if (this.scrollY > 612) {
            $("#type-3").css("width", "160px");
        } else if (this.scrollY >= 130) {
            $("#type-3").css("width", "190px");
        } else if (this.scrollY < 130) {
            $("#type-3").css("width", "160px");
        }
    });
    getSettings();
});

function getSettings() {
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-json-settings.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            var settings = JSON.parse(a);
            
        }
    });
}