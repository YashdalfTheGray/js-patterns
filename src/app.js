import * as angular from 'angular';
import * as _ from 'lodash';
import * as ngAnimate from 'angular-animate';
import * as ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';

angular.module('jsPatternsDemo', [
    uiRouter,
    ngAnimate,
    ngMaterial,
    'firebase'
])
.config([
    '$urlRouterProvider', '$stateProvider', '$mdThemingProvider',
    ($urlRouterProvider, $stateProvider, $mdThemingProvider) => {
        $stateProvider
        .state('home', {
            url: '/',
            component: 'home'
        })
        .state('abstract-factory-pattern', {
            url: '/abstract-factory-pattern',
            component: 'abstractFactoryPattern'
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
        .state('decorator-pattern', {
            url: '/decorator-pattern',
            templateUrl: 'patterns/decoratorPattern/decoratorPattern.tpl.html',
            controller: 'DecoratorPatternCtrl as ctrl'
        })
        .state('facade-pattern', {
            url: '/facade-pattern',
            templateUrl: 'patterns/facadePattern/facadePattern.tpl.html',
            controller: 'FacadePatternCtrl as ctrl'
        })
        .state('factory-pattern', {
            url: '/factory-pattern',
            templateUrl: 'patterns/factoryPattern/factoryPattern.tpl.html',
            controller: 'FactoryPatternCtrl as ctrl'
        })
        .state('flyweight-pattern', {
            url: '/flyweight-pattern',
            templateUrl: 'patterns/flyweightPattern/flyweightPattern.tpl.html',
            controller: 'FlyweightPatternCtrl as ctrl'
        })
        .state('mixin-pattern', {
            url: '/mixin-pattern',
            templateUrl: 'patterns/mixinPattern/mixinPattern.tpl.html',
            controller: 'MixinPatternCtrl as ctrl'
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
        })
        .state('visitor-pattern', {
            url: '/visitor-pattern',
            templateUrl: 'patterns/visitorPattern/visitorPattern.tpl.html',
            controller: 'VisitorPatternCtrl as ctrl'
        });

        $urlRouterProvider.otherwise('/');

        $mdThemingProvider.theme('default')
        .primaryPalette('deep-orange')
        .accentPalette('blue', {
            default: 'A400',
            'hue-1': 'A700'
        })
        .warnPalette('red');
    }
])
.factory('mdClearInput', () => {
    function clearInput(inputId) {
        const inputBox = document.getElementById(inputId);
        if (inputBox !== null) {
            inputBox.value = '';
            angular.element(document.getElementById(`${inputId}-container`)).removeClass('md-input-has-value');
        }
    }

    function clearInputs(inputIdArray) {
        if (_.isArray(inputIdArray)) {
            _.forEach(inputIdArray, (item) => {
                clearInput(item);
            });
        }
        else if (_.isString(inputIdArray)) {
            clearInput(inputIdArray);
        }
    }

    return {
        clearInputBox: clearInput,
        clearInputBoxes: clearInputs

    };
})
.factory('infoButtonSvc', [
    '$rootScope',
    ($rootScope) => {
        $rootScope.infoShowing = false;

        function toggleInfo() {
            $rootScope.infoShowing = !$rootScope.infoShowing;
        }

        function isInfoVisible() {
            return $rootScope.infoShowing;
        }

        return { toggleInfo, isInfoVisible };
    }
])
.controller('SidebarCtrl', [
    '$mdSidenav', '$state',
    function SidebarCtrl($mdSidenav, $state) {
        const vm = this;

        vm.goTo = function goToState(state) {
            $state.go(state);
            if (!$mdSidenav('patterns').isLockedOpen()) {
                $mdSidenav('patterns').close();
            }
        };

        vm.patterns = [
            { name: 'Abstract Factory', state: 'abstract-factory-pattern' },
            { name: 'Command', state: 'command-pattern' },
            { name: 'Constructor', state: 'constructor-pattern' },
            { name: 'Decorator', state: 'decorator-pattern' },
            { name: 'Facade', state: 'facade-pattern' },
            { name: 'Factory', state: 'factory-pattern' },
            { name: 'Flyweight', state: 'flyweight-pattern' },
            { name: 'Mixin', state: 'mixin-pattern' },
            { name: 'Module', state: 'module-pattern' },
            { name: 'Observer', state: 'observer-pattern' },
            { name: 'Prototype', state: 'prototype-pattern' },
            { name: 'Singleton', state: 'singleton-pattern' },
            { name: 'Visitor', state: 'visitor-pattern' }
        ];
    }
])
.controller('ToolbarCtrl', [
    '$mdSidenav', '$state', 'infoButtonSvc',
    function ToolbarCtrl($mdSidenav, $state, infoButtonSvc) {
        const vm = this;

        vm.compomentName = 'Toolbar';
        vm.ibs = infoButtonSvc;

        vm.isHome = function isHome() {
            return $state.is('home');
        };

        vm.showNav = function showNav() {
            $mdSidenav('patterns').toggle();
        };
    }
]);
