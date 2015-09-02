/* global angular */

angular.module('jsPatternsDemo')
.controller('ModulePatternCtrl',
    [
        'mdClearInput',
        function(mdClearInput) {
            var vm = this;

            vm.todoModule = (function() {

                // private variables
                var pList = [];

                // public variables
                var pModuleName = 'Simple Todo';
                var pModuleVersion = '0.1.0';

                // private methods
                function getId() {
                    return Math.floor(Math.random() * (999999 - 100000) + 100000);
                }

                // public methods
                function addTodoItem(title) {
                    pList.push({
                        _id: getId(),
                        title: title
                    });
                }
                
                function removeTodoItem(title) {
                    _.remove(pList, function(n) {
                        return n.title === title;
                    });
                }

                function getAllTodoItems() {
                    var result = [];

                    _.forEach(pList, function(item) {
                        result.push(item.title);
                    });

                    return result;
                }

                return {
                    moduleName: pModuleName,
                    moduleVersion: pModuleVersion,
                    add: addTodoItem,
                    remove: removeTodoItem,
                    getAllItems: getAllTodoItems
                };
            })();

            vm.todoList = vm.todoModule.getAllItems();

            vm.addItem = function addItem(title) {
                vm.todoModule.add(title);
                vm.todoList = vm.todoModule.getAllItems();
                mdClearInput.clearInputBox('title-input');

            };

            vm.removeItem = function removeItem(title) {
                vm.todoModule.remove(title);
                vm.todoList = vm.todoModule.getAllItems();
            };
        }
    ]
);