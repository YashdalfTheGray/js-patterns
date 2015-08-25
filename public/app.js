/* global angular */

angular.module('jsPatternsDemo', 
    [
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        'firebase'
    ]
)
.config([
        '$urlRouterProvider', '$stateProvider', '$mdThemingProvider',
        function($urlRouterProvider, $stateProvider, $mdThemingProvider) {
            // $stateProvider
            // .state('home', {
            //     url: '/',
            //     templateUrl: 'homeView/homeView.tpl.html',
            //     controller: 'HomeViewCtrl'
            // });

            // $urlRouterProvider.otherwise('/');
            

            $mdThemingProvider.theme('default')
                .primaryPalette('deep-orange')
                .accentPalette('blue',{
                    'default': 'A400',
                    'hue-1': 'A700'
                })
                .warnPalette('red');
        }
])
.controller('HomeCtrl', 
    [
        function() {
            var vm = this;

            vm.appName = "JavaScript Design Patterns Demo";
        }
    ]
);
