/**
 *  This controller is used to manage drink lists and details
 *  of each drink
 *
 *  @module DrinksController
 */
angular.module('lcboApp.products')
    .controller('DrinksController', ['$scope', 'ProductsLoader', '_', function($scope, ProductsLoader, _) {
        'use strict';

        function onProductsError(data) {
            console.log(data);
        }

        function onProductsSuccess(data) {
            console.log(data);
        }

        /**
         *  Controller init function
         *
         *  @method init
         *
         *  @return {undefined}
         */
        function init() {
            console.log('DrinksController is ready.');
        }

        /**
         *  Define $scope methods
         */
        _.extend($scope, {
            init: init,
            drinks: ProductsLoader.listDrinks()
        });

        init();
    }]);