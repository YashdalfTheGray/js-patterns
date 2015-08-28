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
                controller: 'HomeCtrl as ctrl'
            })
            .state('constructor-pattern', {
                url: '/constructor-pattern',
                templateUrl: 'patterns/constructorPattern/constructorPattern.tpl.html',
                controller: 'ConstructorPatternCtrl as ctrl'
            })
            .state('module-pattern', {
                url: '/module-pattern',
                templateUrl: 'patterns/modulePattern/modulePattern.tpl.html',
                controller: 'ModulePatternCtrl as ctrl'
            })
            .state('singleton-pattern', {
                url: '/singleton-pattern',
                templateUrl: 'patterns/singletonPattern/singletonPattern.tpl.html',
                controller: 'SingletonPatternCtrl as ctrl'
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
        '$mdSidenav', '$state',
        function($mdSidenav, $state) {
            var vm = this;

            vm.goTo = function goToState(state) {
                $state.go(state);
                if(!$mdSidenav('patterns').isLockedOpen()) {
                    $mdSidenav('patterns').close();
                }
            };

            vm.patterns = [
                { name: 'Constructor', state: 'constructor-pattern' },
                { name: 'Revealing Module', state: 'module-pattern' },
                { name: 'Singleton', state: 'singleton-pattern' }
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