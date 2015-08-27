/* global angular */

angular.module('jsPatternsDemo')
.controller('ModulePatternCtrl',
    [
        function() {
            var vm = this;

            vm.todoModule = (function() {

                // private variables
                var list = [];

                // private methods
                function getId() {
                    return Math.floor(Math.random() * (999999 - 100000) + 100000);
                }

                return {
                    // public variables
                    moduleName: 'Simple Todo',
                    moduleVersion: '0.1.0',

                    // public methods
                    add: function addTodoItem(title) {
                        list.push({
                            _id: getId(),
                            title: title
                        });
                    },
                    remove: function removeTodoItem(title) {
                        _.remove(list, function(n) {
                            return n.title === title;
                        });
                    },
                    getAllItems: function getAllTodoItems() {
                        var result = [];

                        _.forEach(list, function(item) {
                            result.push(item.title);
                        });

                        return result;
                    }
                };
            })();

            vm.todoList = vm.todoModule.getAllItems();

            vm.addItem = function addItem(title) {
                vm.todoModule.add(title);
                vm.todoList = vm.todoModule.getAllItems();
            };

            vm.removeItem = function removeItem(title) {
                vm.todoModule.remove(title);
                vm.todoList = vm.todoModule.getAllItems();
            };
        }
    ]
);