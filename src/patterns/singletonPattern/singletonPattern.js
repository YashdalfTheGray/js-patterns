import * as angular from 'angular';

angular.module('jsPatternsDemo')
.controller('SingletonPatternCtrl',
    [
        'infoButtonSvc',
        function(infoButtonSvc) {
            const vm = this;
            vm.ibs = infoButtonSvc;

            vm.randomNumGen = (function() {
                let instance;

                function init() {
                    // This is where the singleton declaration goes
                    // This pattern builds on the module pattern

                    const pNumList = [];

                    const pModuleName = 'Random Number Generator';
                    const pModuleVersion = '0.1.0';

                    function getAnotherNumber() {
                        const num = Math.floor(Math.random() * 999999);
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
            }());

            vm.rng = vm.randomNumGen.getinstance();
            vm.number = vm.rng.getAnother();

            vm.getNumber = function() {
                vm.rng = vm.randomNumGen.getinstance();
                vm.number = vm.rng.getAnother();
            };
        }
    ]
);
