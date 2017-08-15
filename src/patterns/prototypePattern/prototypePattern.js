import * as angular from 'angular';

angular.module('jsPatternsDemo')
.controller('PrototypePatternCtrl',
    [
        'mdClearInput', 'infoButtonSvc',
        function(mdClearInput, infoButtonSvc) {
            const vm = this;
            vm.ibs = infoButtonSvc;
            vm.cars = [];

            vm.car = {
                details() {
                    if (this.year && this.make && this.model) {
                        return `This car is a ${this.year} ${this.make} ${this.model}.`;
                    }

                    return 'This is a generic car.';
                }
            };

            vm.cars.push(vm.car);

            vm.addCar = function(year, make, model) {
                const newCar = Object.create(vm.car, {
                    year: {
                        value: year,
                        enumerable: true
                    },
                    make: {
                        value: make,
                        enumerable: true
                    },
                    model: {
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
