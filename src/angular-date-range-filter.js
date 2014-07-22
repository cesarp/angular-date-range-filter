angular.module('cpc.dateRangeFilter', [])
    .filter('dateRange', function () {
        return function (arr, property, start, end) {
            if (!angular.isArray(arr)) {
                return arr;
            }

            var check = function (date) {
                var dateAsMoment = moment(date);

                if (start && dateAsMoment.isBefore(start, 'day')) {
                    return false;
                }

                return !(end && dateAsMoment.isAfter(end, 'day'));
            };

            var filtered = [];

            for (var i = 0; i < arr.length; i++) {
                if (check(arr[i][property])) {
                    filtered.push(arr[i]);
                }
            }

            return filtered;
        };
    });
