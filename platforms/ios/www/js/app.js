'use strict';

/**
 *  Application Modules
 */
angular.module('lcboApp', ['ionic', 'lcboApp.products', 'lcboApp.stores']);

// Controllers
angular.module('lcboApp.products', ['lcboApp.product-api']);
angular.module('lcboApp.stores', ['lcboApp.stores-api']);
angular.module('lcboApp.info', []);

// Services
angular.module('lcboApp.product-api', []);
angular.module('lcboApp.stores-api', []);

angular.module('lcboApp').run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.drinks', {
            url: '/drinks',
            views: {
                'tab-drinks': {
                    templateUrl: 'templates/tab-drinks.html',
                    controller: 'DrinksController'
                }
            }
        })

        .state('tab.drinks-detail', {
            url: '/drinks/:drinkId',
            views: {
                'tab-drinks': {
                    templateUrl: 'templates/drink-detail.html',
                    controller: 'DrinkDetailController'
                }
            }
        })

        .state('tab.stores', {
            url: '/stores',
            views: {
                'tab-stores': {
                    templateUrl: 'templates/tab-stores.html',
                    controller: 'StoresController'
                }
            }
        })
        .state('tab.stores-detail', {
            url: '/stores/:storesId',
            views: {
                'tab-stores': {
                    templateUrl: 'templates/stores-detail.html',
                    controller: 'StoresController'
                }
            }
        })

        .state('tab.about', {
            url: '/about',
            views: {
                'tab-about': {
                    templateUrl: 'templates/tab-about.html',
                    controller: 'AboutController'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/drinks');
});

