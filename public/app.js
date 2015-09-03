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
            .state('command-pattern', {
                url: '/command-pattern',
                templateUrl: 'patterns/commandPattern/commandPattern.tpl.html',
                controller: 'CommandPatternCtrl as ctrl'
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
            .state('observer-pattern', {
                url: '/observer-pattern',
                templateUrl: 'patterns/observerPattern/observerPattern.tpl.html',
                controller: 'ObserverPatternCtrl as ctrl'
            })
            .state('prototype-pattern', {
                url: '/prototype-pattern',
                templateUrl: 'patterns/prototypePattern/prototypePattern.tpl.html',
                controller: 'PrototypePatternCtrl as ctrl'
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
.factory('mdClearInput', 
    [
        function() {

            function clearInput(inputId) {
                var inputBox = document.getElementById(inputId);
                if (inputBox !== null) {
                    inputBox.value = '';
                    angular.element(document.getElementById(inputId + '-container')).removeClass('md-input-has-value');
                }
            }

            function clearInputs(inputIdArray) {
                if (_.isArray(inputIdArray)) {
                    _.forEach(inputIdArray, function(item) {
                        clearInput(item);
                    });
                }
                else if (_.isString(inputIdArray)) {
                    clearInput(inputIdArray)
                }
            }

            return {
                clearInputBox: clearInput,
                clearInputBoxes: clearInputs

            };
        }
    ]
)
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
                { name: 'Command', state: 'command-pattern' },
                { name: 'Constructor', state: 'constructor-pattern' },
                { name: 'Revealing Module', state: 'module-pattern' },
                { name: 'Observer', state: 'observer-pattern' },
                { name: 'Prototype', state: 'prototype-pattern'},
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