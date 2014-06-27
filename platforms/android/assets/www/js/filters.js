/**
 *  This filter will take an integer such as 1350 and convert
 *  it to $13.50
 *
 *  @method price
 *
 *  @return {String} Formatted string
 */
angular.module('lcboApp').filter('price', [function() {
    return function (input) {
        return '$' + (input / 100).toFixed(2);
    }
}]);