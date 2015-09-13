/* global angular */

angular.module('jsPatternsDemo')
.controller('SingletonPatternCtrl',
    [
        function() {
            "use strict";
            var vm = this;

            vm.randomNumGen = (function() {

                var instance;

                function init() {
                    // This is where the singleton declaration goes
                    // This pattern builds on the module pattern
                    
                    var pNumList = [];

                    var pModuleName = 'Random Number Generator';
                    var pModuleVersion = '0.1.0';

                    function getAnotherNumber() {
                        var num = Math.floor(Math.random() * 999999);
                        pNumList.push(num);
                        return num;
                    }

                    return {
                        moduleName: pModuleName,
                        moduleVersion: pModuleVersion,
                        numberList: pNumList,
                        getAnother: getAnotherNumber
                    };
                }

                return {
                    getinstance: function getSingletonInstance() {
                        if (!instance) {
                            instance = init();
                        }

                        return instance;
                    }
                };

            })();

            vm.rng = vm.randomNumGen.getinstance();
            vm.number = vm.rng.getAnother();

            vm.getNumber = function() {
                vm.rng = vm.randomNumGen.getinstance();
                vm.number = vm.rng.getAnother();
            };
        }
    ]
);