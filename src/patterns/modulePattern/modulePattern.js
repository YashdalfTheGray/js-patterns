import * as angular from 'angular';
import * as _ from 'lodash';

angular.module('jsPatternsDemo')
.controller('ModulePatternCtrl',
    [
        'mdClearInput', 'infoButtonSvc',
        function(mdClearInput, infoButtonSvc) {
            const vm = this;

            vm.ibs = infoButtonSvc;
            vm.todoModule = (function() {
                // private variables
                const pList = [];

                // public variables
                const pModuleName = 'Simple Todo';
                const pModuleVersion = '0.1.0';

                // private methods
                function getId() {
                    return Math.floor((Math.random() * (999999 - 100000)) + 100000);
                }

                // public methods
                function addTodoItem(title) {
                    pList.push({
                        _id: getId(),
                        title: title
                    });
                }

                function removeTodoItem(title) {
                    _.remove(pList, n => n.title === title);
                }

                function getAllTodoItems() {
                    const result = [];

                    _.forEach(pList, (item) => {
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
            }());

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
