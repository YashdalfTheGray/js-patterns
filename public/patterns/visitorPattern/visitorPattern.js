/* global angular */

angular.module('jsPatternsDemo')
.controller('VisitorPatternCtrl',
    [
        function() {
            "use strict";
            var vm = this;

            function Employee(name, salary, vacation) {
                var self = this;

                this.accept = function(visitor) {
                    visitor.visit(self);
                };

                this.getName = function() {
                    return name;
                };

                this.setName = function(value) {
                    name = value;
                };

                this.getSalary = function() {
                    return salary;
                };

                this.setSalary = function(value) {
                    salary = value;
                };

                this.getVacation = function() {
                    return vacation;
                };

                this.setVacation = function(value) {
                    vacation = value;
                };
            }

            function ExtraSalary() {
                this.visit = function(employee) {
                    employee.setSalary(employee.getSalary() * 1.2);
                };
            }

            function ExtraVacation() {
                this.visit = function(employee) {
                    employee.setVacation(employee.getVacation + 5);
                };
            }
        }
    ]
);