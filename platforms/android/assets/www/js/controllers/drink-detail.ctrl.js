/**
 *  This controller is used to manage drink lists and details
 *  of each drink
 *
 *  @module DrinksController
 */
angular.module('lcboApp.products')
    .controller('DrinkDetailController', ['$scope', 'ProductLoader', '_', '$stateParams', function($scope, ProductLoader, _, $stateParams) {
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
            console.log($stateParams.drinkId);
            ProductLoader.getProduct($stateParams.drinkId);
        }

        /**
         *  Define $scope methods
         */
        _.extend($scope, {
            item: ProductLoader.drinkDetails()
        });

        init();
    }]);