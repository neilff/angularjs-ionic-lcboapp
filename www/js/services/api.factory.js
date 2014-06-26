/**
 *  This module is used for retrieving product information from
 *  the LCBO API
 *
 *  @method lcboApp.product-api
 */
angular.module('lcboApp.product-api')

    /**
     *  This factory is responsible for crunching down the
     *  raw api data LCBOAPI feeds us.
     *
     *  @method ProductsModelFactory
     */
    .factory('ProductsModelFactory', [function() {

        /**
         *  This function will return a minimal version of the
         *  rawData object, this is used for listing several
         *  drinks.
         *
         *  @method makeModel
         *
         *  @param  {Object} rawData Raw data object
         *
         *  @return {Object} Simplified object
         */
        function makeModel(rawData) {
            return {
                id: rawData.id,
                name: rawData.name,
                image: 'http://www.lcbo.com/content/dam/lcbo/products/' + rawData.id + '.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png',
                sale: rawData.has_limited_time_offer,
                content: (rawData.alcohol_content / 100).toFixed(1) + '% ' + rawData.primary_category,
                size: rawData.package,
                price: '$' + (rawData.price_in_cents / 100).toFixed(2)
            }
        }
        return {
            makeModel: makeModel
        }
    }])

    /**
     *  This factory is responsible for retrieving products
     *  from the LCBO API.
     *
     *  @method ProductsLoader
     *
     *  @param  {Object} $http Dependency
     *  @param  {Object} ApiAddress Dependency
     *
     *  @return {Object} Factory methods
     */
    .factory('ProductsLoader', ['$http', '$q', '_', 'ApiAddress', 'ProductsModelFactory', function($http, $q, _, ApiAddress, ProductsModelFactory) {
        'use strict';

        var apiAddress = ApiAddress + '/products';
        var drinks = [];

        /**
         *  This function will retrieve the first twenty results from
         *  the LCBO Api. It is used to fill the factory with data,
         *  there are no search parameters attached.
         *
         *  @method getProducts
         *
         *  @return {Object} $q promise object
         */
        function getProducts() {
            var defered = $q.defer();

            $http.jsonp(apiAddress, {
                params: {
                    callback: 'JSON_CALLBACK'
                }
            })
            .success(function(data, status) {
                console.log(data, status);

                angular.forEach(data.result, function(drink) {
                    drinks.push(ProductsModelFactory.makeModel(drink));
                });

                defered.resolve('success');
            })
            .error(function(data, status) {
                console.log(data, status);
                defered.reject('error');
            });

            return defered.promise;
        }

        /**
         *  This function will retrieve the list of drinks
         *  currently stored in the service.
         *
         *  @method listDrinks
         *
         *  @return {undefined}
         */
        function listDrinks() {
            return drinks;
        }

        /**
         *  Factory init function
         *
         *  @method init
         *
         *  @return {undefined}
         */
        function init() {
            getProducts().then(function() {
                console.log('Drink Factory Online');
            });
        }

        init();

        return {
            getProducts: getProducts,
            listDrinks: listDrinks
        };
    }])