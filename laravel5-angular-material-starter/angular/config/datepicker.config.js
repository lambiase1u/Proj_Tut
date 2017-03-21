export function datePickerConfig($mdDateLocaleProvider){
    'ngInject';

// Example uses moment.js to parse and format dates.
    $mdDateLocaleProvider.parseDate = function(dateString) {
        let m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = function(date) {
        let m = moment(date);
        return m.isValid() ? m.format('DD/MM/YYYY') : '';
    };
}