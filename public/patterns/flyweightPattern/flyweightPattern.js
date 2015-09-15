/* global angular */

angular.module('jsPatternsDemo')
.controller('FlyweightPatternCtrl', 
    [
        '$timeout', '$scope', 'mdClearInput',
        function($timeout, $scope, mdClearInput) {
            "use strict";
            var vm = this;

            // This approximates the implements keyword in other languages.
            // Find a better way to do this, modifying native objects feels...weird.
            /* jshint newcap:false, freeze:false */
            Function.prototype.implementsFor = function(parent) {
                if (parent.constructor === Function) {
                    this.prototype = new parent();
                    this.prototype.constructor = this;
                    this.prototype.parent = parent.prototype;
                }
                else {
                    this.prototype = parent;
                    this.prototype.constructor = this;
                    this.prototype.parent = parent;
                }
            };  
            /* jshint newcap:true, freeze:true */

            var CoffeeOrder = {
                serveCoffee: function() {},
                getFlavor: function() {}
            };

            function CoffeeFlavor(newFlavor) {
                var flavor = newFlavor;

                if (typeof this.getFlavor === 'function') {
                    this.getFlavor = function() {
                        return flavor;
                    };
                }

                if (typeof this.serveCoffee === 'function') {
                    this.serveCoffee = function(context) {
                        return 'Serving coffee flavor ' + flavor + ' to table ' + context.getTable() + '.';
                    };
                }
            }

            CoffeeFlavor.implementsFor(CoffeeOrder);

            function CoffeeOrderContext(tableNumber) {
                return {
                    getTable: function() {
                        return tableNumber;
                    }
                };
            }

            function CoffeeFlavorFactory() {
                var flavors = {};
                var length = 0;

                return {
                    getCoffeeFlavor: function(flavorName) {
                        var flavor = flavors[flavorName];
                        if (typeof flavor === 'undefined') {
                            flavor = new CoffeeFlavor(flavorName);
                            flavors[flavorName] = flavor;
                            length++;
                        }
                        return flavor;
                    },
                    getTotalCoffeeFlavorsMade: function() {
                        return length;
                    }
                };
            }

            vm.flavors = [];
            vm.tables = [];
            vm.ordersMade = 0;
            vm.flavorFactory = new CoffeeFlavorFactory();
            vm.servedLog = [];
            vm.timers = [];

            vm.getRandomDuration = function() {
                return 100 * Math.round(((Math.random() * 3) + 1) * 10);
            };

            vm.takeOrders = function(flavorIn, table) {
                var timer;

                vm.flavors[vm.ordersMade] = vm.flavorFactory.getCoffeeFlavor(flavorIn);
                vm.tables[vm.ordersMade] = new CoffeeOrderContext(table);

                timer = $timeout(vm.flavors[vm.ordersMade].serveCoffee, vm.getRandomDuration(), true, vm.tables[vm.ordersMade]);
                timer.then(function(result) {
                    vm.servedLog.push(result);
                },
                function() {
                    console.log('Coffee order canceled.');
                });
                vm.timers.push(timer);

                vm.ordersMade++;

                mdClearInput.clearInputBoxes(['flavor-input', 'table-input']);
            };

            $scope.$on('$destroy', function() {
                for (var i = 0; i < vm.timers.length; i++) {
                    $timeout.cancel(vm.timers[i]);
                }
            });
        }
    ]
);