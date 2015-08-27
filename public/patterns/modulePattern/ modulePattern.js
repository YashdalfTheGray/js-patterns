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
                    return Math.random() * (999999 - 100000) + 100000;
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
                        console.log(list);
                    },
                    remove: function addTodoItem(title) {
                        _.remove(list, function(n) {
                            return n.title === title;
                        });
                        console.log(list);
                    },
                    getAllItems: function getAllTodoItems() {
                        var result;

                        _.forEach(list, function(item) {
                            result.push(item.title);
                        });

                        console.log(list);
                        console.log(result);

                        return result;
                    }
                };
            })();
        }
    ]
);