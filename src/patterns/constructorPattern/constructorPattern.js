import * as angular from 'angular';

angular.module('jsPatternsDemo')
.controller('ConstructorPatternCtrl',
    [
        'mdClearInput', 'infoButtonSvc',
        function ConstructorPatternCtrl(mdClearInput, infoButtonSvc) {
            const vm = this;

            vm.ibs = infoButtonSvc;

            function Car(model, year, mileage) {
                this.model = model;
                this.year = year;
                this.mileage = mileage;
            }

            Car.prototype.toString = function carToString() {
                return `This ${this.year} ${this.model} has driven ${this.mileage} miles.`;
            };

            vm.cars = [];

            vm.createNew = function createNew(model, year, mileage) {
                vm.cars.push(new Car(model, year, mileage));
                mdClearInput.clearInputBoxes(['year-input', 'model-input', 'mileage-input']);
            };
        }
    ]
);
