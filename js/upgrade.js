$(document).ready(function() {
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
});