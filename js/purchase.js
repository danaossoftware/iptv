var currentBankType = 1;
var selectedBankType = 0;
var currentIndex = -1;

$(document).ready(function() {
    var params = location.search;
    params = params.substr(1, params.length);
    var type = params.split("&")[0].split("=")[1];
    if (type == 1) {
        $("#purchase-desc").html("Upgrade akun IPTV Joss selama 1 bulan");
    } else if (type == 2) {
        $("#purchase-desc").html("Upgrade akun IPTV Joss selama 3 bulan");
    } else if (type == 3) {
        $("#purchase-desc").html("Upgrade akun IPTV Joss selama 6 bulan");
    } else if (type == 4) {
        $("#purchase-desc").html("Upgrade akun IPTV Joss selama 1 tahun");
    }
    $.ajax({
        type: 'GET',
        url: SERVER_URL+'get-purchase-info.php',
        data: {'user_id': Native.getUserID(), 'type': type},
        dataType: 'text',
        cache: false,
        success: function(a) {
            try {
                var price = "Rp" + formatMoney(a, ",", ".") + ",-";
                $("#price").html(price);
                $("#price-2").html(price);
            } catch (e) {
                console.log(e);
            }
            $("#loading-container").fadeOut(300);
        }
    });
});

function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function setBankItemClickListener() {
    $(".bank-item").on("click", function() {
        $(".bank-item").find(".bank-item-check-img").css("visibility", "hidden");
        $(this).find(".bank-item-check-img").css("visibility", "visible");
        var bankType = $(this).parent().children(".bank-item").index(this);
        selectedBankType = bankType;
    });
}

function openBankChangeDialog() {
    if (currentBankType == 0) {
        $("#bca-check-img").css("visibility", "visible");
        $("#mandiri-check-img").css("visibility", "hidden");
    } else if (currentBankType == 1) {
        $("#bca-check-img").css("visibility", "hidden");
        $("#mandiri-check-img").css("visibility", "visible");
    }
    $("#bank-change-dialog").css("display", "flex").hide().fadeIn(300);
    setBankItemClickListener();
}

function closeBankChangeDialog() {
    $("#bank-change-dialog").fadeOut(300);
}

function setBankType() {
    currentBankType = selectedBankType;
    if (currentBankType == 0) {
        $("#account-number").html("8910 374 312")
        $("#bank-type-img").attr("src", "img/bca.png");
        $("#bank-name").html("PT Bank Central Asia Tbk");
    } else if (currentBankType == 1) {
        $("#account-number").html("900 00 4200200 7");
        $("#bank-type-img").attr("src", "img/mandiri.png");
        $("#bank-name").html("PT Bank Mandiri (Persero) Tbk");
    }
    $("#bank-change-dialog").fadeOut(300);
}

function downKey() {
    currentIndex = 0;
    focusToCurrentIndex();
}

function focusToCurrentIndex() {
    if (currentIndex == 0) {
        $("#back").css("border", "3px solid #3498db");
    }
}

function enterKey() {
    if (currentIndex == 0) {
        window.history.back();
    }
}