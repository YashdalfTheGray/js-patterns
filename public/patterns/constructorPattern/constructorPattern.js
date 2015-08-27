/* global angular */

angular.module('jsPatternsDemo')
.controller('ConstructorPatternCtrl', 
    [
        function() {
            var vm = this;

            function Car(model, year, mileage) {
                this.model = model;
                this.year = year;
                this.mileage = mileage;
            }

            Car.prototype.toString = function() {
                return 'This ' + this.year + ' ' + this.model + ' has driven ' + this.mileage + ' miles.';
            };

            vm.cars = [];

            vm.createNew = function createNew(model, year, mileage) {
                console.log('Incoming data: ', model, year, mileage);
                vm.cars.push(new Car(model, year, mileage));
            };
        }
    ]
);