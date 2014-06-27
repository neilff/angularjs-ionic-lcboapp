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
    .factory('ProductsModelFactory', ['$filter', function($filter) {
        'use strict';

        /**
         *  This function will return a minimal version of the
         *  rawData object, this is used for listing several
         *  drinks.
         *
         *  @method makeListModel
         *
         *  @param  {Object} rawData The input model
         *
         *  @return {Object} The output model
         */
        function makeListModel(rawData) {
            return {
                id: rawData.id,
                name: rawData.name,
                image: rawData.image_thumb_url,
                sale: rawData.has_limited_time_offer,
                content: (rawData.alcohol_content / 100).toFixed(1) + '% ' + rawData.primary_category,
                size: rawData.package,
                price: '$' + (rawData.price_in_cents / 100).toFixed(2)
            };
        }

        /**
         *  This function will return a minimal version of the
         *  rawData object, this is used for listing the details
         *  of a single product.
         *
         *  @method makeDetailModel
         *
         *  @param  {Object} rawData The input model
         *
         *  @return {Object} The output model
         */
        function makeDetailModel(rawData) {
            return {
                id: rawData.id,
                name: rawData.name,
                image: rawData.image_url,
                sale: rawData.has_limited_time_offer,
                content: (rawData.alcohol_content / 100).toFixed(1) + '% ' + rawData.primary_category,
                size: rawData.package,
                price: $filter('price')(rawData.price_in_cents),
                category: rawData.primary_category,
                tastingNotes: rawData.tasting_note,
                servingSuggestions: rawData.serving_suggestions
            };
        }

        return {
            makeListModel: makeListModel,
            makeDetailModel: makeDetailModel
        };
    }])

    /**
     *  This factory will retrieve individual product details.
     *
     *  @method ProductLoader
     */
    .factory('ProductLoader', ['$http', '$q', '_', 'ApiAddress', 'ProductsModelFactory', function($http, $q, _, ApiAddress, ProductsModelFactory) {
        'use strict';

        var apiAddress = ApiAddress + '/products'
        var details = {};

        /**
         *  This function will retrieve a product details from the LCBO API
         *
         *  @method getProduct
         *
         *  @param  {String} id ID of the product
         *
         *  @return {Object} $q promise object
         */
        function getProduct(id) {
            var address = apiAddress + '/' + id;
            var defered = $q.defer();

            $http.jsonp(address, {
                params: {
                    callback: 'JSON_CALLBACK'
                }
            })
            .success(function(data, status) {
                console.log(data, status);
                var newModel = ProductsModelFactory.makeDetailModel(data.result);
                console.log(newModel);

                angular.copy(newModel, details);

                defered.resolve('success');
            })
            .error(function(data, status) {
                console.log(data, status);
                defered.reject('error');
            });

            return defered.promise;
        }

        /**
         *  This function will return the drink details currently stored in the service
         *
         *  @method drinkDetails
         *
         *  @return {Object} The drink details
         */
        function drinkDetails() {
            return details;
        }

        return {
            getProduct: getProduct,
            drinkDetails: drinkDetails
        };
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
                    drinks.push(ProductsModelFactory.makeListModel(drink));
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
    }]);