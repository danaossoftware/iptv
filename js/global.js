const SERVER_URL = "http://iptvjoss.com/iptv/php/";

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://iptvjoss.com/iptv/php/check-session.php',
        dataType: 'text',
        cache: false,
        success: function(a) {
            if (a == -1) {
                window.location.href = 'login.html';
            }
        }
    });
});

function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getTime() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (hour < 10) {
        hour = "0"+hour;
    }
    if (minute < 10) {
        minute = "0"+minute;
    }
    return hour+":"+minute;
}

function getDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var monthNamesID = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    var monthNamesEN = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    if (getLanguage() == 0) {
        return day+" "+monthNamesID[month]+" "+year;
    } else {
        return day+" "+monthNamesEN[month]+" "+year;
    }
}

function getMonthName(month) {
    var language = Native.readInt("language", 0);
    var monthNamesID = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    var monthNamesEN = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    if (language == 0) {
        return monthNamesID[month];
    } else {
        return monthNamesEN[month];
    }
}

function getLanguage() {
    return Native.readInt("language", 0);
}