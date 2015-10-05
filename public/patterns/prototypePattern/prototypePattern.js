/* global angular */

angular.module('jsPatternsDemo')
.controller('PrototypePatternCtrl', 
    [
        'mdClearInput', 'infoButtonSvc',
        function(mdClearInput, infoButtonSvc) {
            "use strict";

            var vm = this;
            vm.ibs = infoButtonSvc;
            vm.cars = [];

            vm.car = {
                details: function() {
                    if (this.year && this.make && this.model) {
                        return 'This car is a ' + this.year + ' ' + this.make + ' ' + this.model + '.';
                    }
                    else {
                        return 'This is a generic car.';
                    }
                }
            };

            vm.cars.push(vm.car);

            vm.addCar = function(year, make, model) {
                var newCar = Object.create(vm.car, {
                    "year": {
                        value: year,
                        enumerable: true
                    },
                    "make": {
                        value: make,
                        enumerable: true
                    },
                    "model": {
                        value: model,
                        enumerable: true
                    }
                });
                vm.cars.push(newCar);
                mdClearInput.clearInputBoxes(['year-input', 'make-input', 'model-input']);
            };
        }
    ]
);