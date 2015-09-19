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
            function PrintDetails() {
                this.visit = function(employee) {
                    return employee.getName() + ' makes $' + employee.getSalary() + ' and has ' + employee.getVacation() + ' days of vacation.';
                };
            }

            vm.salaryVisitor = new ExtraSalary();
            vm.vacationVisitor = new ExtraVacation();
            vm.printVisitor = new PrintDetails();

            vm.employees = [
                new Employee('John Doe', 45000, 10),
                new Employee('Jane Smith', 48000, 10)
            ];

            vm.addEmployee = function(name) {
                var randomSalary = Math.round((Math.random() * 20) + 45) * 1000;
                var randomVacation = Math.round((Math.random() * 5) + 10);
                vm.employees.push(new Employee(name, randomSalary, randomVacation));
            };
        }
    ]
);