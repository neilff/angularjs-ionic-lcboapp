/**
 *  This controller is used to manage drink lists and details
 *  of each drink
 *
 *  @module DrinksController
 */
angular.module('lcboApp.products')
    .controller('DrinkDetailController', ['$scope', 'ProductsLoader', '_', function($scope, ProductsLoader, _) {
        'use strict';

        /**
         *  Controller init function
         *
         *  @method init
         *
         *  @return {undefined}
         */
        function init() {
            console.log('DrinkDetailController is ready.');
        }

        /**
         *  Define $scope methods
         */
        _.extend($scope, {
            init: init
        });

        init();
    }]);