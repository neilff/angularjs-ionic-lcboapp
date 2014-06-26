/**
 *  This factory will expose lodash library
 *
 *  @module  _
 */
angular.module('lcboApp')
    .factory('_', ['$window', function($window) {
        'use strict';

        return $window._;
    }]);