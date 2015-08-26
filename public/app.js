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
            $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.tpl.html',
                controller: 'HomeCtrl',
                controllerAs: 'ctrl'
            })
            .state('constructor-pattern', {
                url: '/constructor-pattern',
                templateUrl: 'patterns/constructorPattern/constructorPattern.tpl.html',
                controller: 'ConstructorPatternCtrl',
                controllerAs: 'ctrl'
            });

            $urlRouterProvider.otherwise('/');
            

            $mdThemingProvider.theme('default')
                .primaryPalette('deep-orange')
                .accentPalette('blue',{
                    'default': 'A400',
                    'hue-1': 'A700'
                })
                .warnPalette('red');
        }
])
.controller('SidebarCtrl', 
    [
        function() {
            var vm = this;

            vm.patterns = [
                { name: 'Constructor', state: 'constructor-pattern' }
            ];
        }
    ]
)
.controller('ToolbarCtrl', 
    [
        '$mdSidenav', '$state',
        function($mdSidenav, $state) {
            var vm = this;

            vm.compomentName = "Toolbar";

            vm.isHome = function isHome() {
                return $state.is('home');
            };

            vm.showNav = function showNav() {
                $mdSidenav('patterns').toggle();
            };
        }
    ]
);