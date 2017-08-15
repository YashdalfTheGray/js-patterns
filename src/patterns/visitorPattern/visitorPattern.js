/* global angular */

angular.module('jsPatternsDemo')
.controller('VisitorPatternCtrl',
    [
        'mdClearInput',
        function(mdClearInput) {
            const vm = this;

            function Employee(name, salary, vacation) {
                const self = this;

                this.accept = function(visitor) {
                    return visitor.visit(self);
                };

                this.getName = function() {
                    return name;
                };

                this.setName = function(value) {
                    name = value; // eslint-disable-line no-param-reassign
                };

                this.getSalary = function() {
                    return salary;
                };

                this.setSalary = function(value) {
                    salary = value; // eslint-disable-line no-param-reassign
                };

                this.getVacation = function() {
                    return vacation;
                };

                this.setVacation = function(value) {
                    vacation = value; // eslint-disable-line no-param-reassign
                };
            }

            function ExtraSalary() {
                this.visit = function(employee) {
                    employee.setSalary(Math.round(employee.getSalary() * 1.2));
                };
            }

            function ExtraVacation() {
                this.visit = function(employee) {
                    employee.setVacation(employee.getVacation() + 5);
                };
            }
            function PrintDetails() {
                this.visit = function(employee) {
                    return `${employee.getName()} makes $${employee.getSalary()} and has ${employee.getVacation()} days of vacation.`;
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
                const randomSalary = Math.round((Math.random() * 20) + 45) * 1000;
                const randomVacation = Math.round((Math.random() * 5) + 10);
                vm.employees.push(new Employee(name, randomSalary, randomVacation));
                mdClearInput.clearInputBox('empname-input');
            };
            console.log(vm.employees);
        }
    ]
);
