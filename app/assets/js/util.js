
var util = (function() {
    var module = {};

    module.parseTime = function (value) {
        var hours = 0;
        var mins = 0;
        var iHours = value.indexOf('h');
        var iMins = value.indexOf('m');

        if (iHours > 0) {
            hours = parseInt(value.substr(0, iHours));
        }

        if (iMins > 0 ) {
            mins = parseInt(value.substr(iHours+1, iMins));
        }

        if (hours == 0 && mins == 0) {
            return 0;
        } else {
            return hours*60 + mins;
        }
    };

    module.eventMinDuration = function (duration, value) {
        if (value > 120) {
            return true;
        } else {
            return false;
        }
    }

    return module;
})();

