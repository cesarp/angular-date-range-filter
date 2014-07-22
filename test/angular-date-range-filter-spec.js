describe('date range filter', function () {
    var today = moment(),
        yesterday = moment().subtract(1, 'days'),
        tomorrow = moment().add(1, 'days'),
        dateRangeFilter;

    beforeEach(module('cpc.dateRangeFilter'));

    beforeEach(inject(function ($filter) {
        dateRangeFilter = $filter('dateRange');
    }));

    it('should return arr if not an array', function () {
        var object = {};

        var result = dateRangeFilter(object);

        expect(result).toBe(object);
    });

    it('should not include an element when its date is before start date', function () {
        var arr = [
            {date: yesterday},
            {date: today}
        ];

        var result = dateRangeFilter(arr, 'date', tomorrow);

        expect(result.length).toBeFalsy();
    });

    it('should include an element when date is after start and end date not defined', function () {
        var arr = [
            {date: tomorrow},
            {date: yesterday}
        ];

        var result = dateRangeFilter(arr, 'date', today);

        expect(result.length).toBe(1);
        expect(result).toContain(arr[0]);
    });

    it('should not include an element when its date is after end date', function () {
        var arr = [
            {date: tomorrow},
            {date: today}
        ];

        var result = dateRangeFilter(arr, 'date', null, yesterday);

        expect(result.length).toBeFalsy();
    });

    it('should include an element when date is before end date and start date not defined', function () {
        var arr = [
            {date: tomorrow},
            {date: yesterday}
        ];

        var result = dateRangeFilter(arr, 'date', null, today);

        expect(result.length).toBe(1);
        expect(result).toContain(arr[1]);
    });

    it('should include an element when date is between start and end date', function () {
        var arr = [
            {date: today},
            {date: today}
        ];

        var result = dateRangeFilter(arr, 'date', yesterday, tomorrow);

        expect(result).toContain(arr[0]);
        expect(result).toContain(arr[1]);
    });
});