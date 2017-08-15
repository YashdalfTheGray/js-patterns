import * as angular from 'angular';

angular.module('jsPatternsDemo')
.controller('FlyweightPatternCtrl',
    [
        '$timeout', '$scope', 'mdClearInput',
        function($timeout, $scope, mdClearInput) {
            const vm = this;

            // This approximates the implements keyword in other languages.
            // Find a better way to do this, modifying native objects feels...weird.
            /* eslint-disable new-cap, no-extend-native */
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
            /* eslint-enable new-cap, no-extend-native */

            const CoffeeOrder = {
                serveCoffee() {},
                getFlavor() {}
            };

            function CoffeeFlavor(newFlavor) {
                const flavor = newFlavor;

                if (typeof this.getFlavor === 'function') {
                    this.getFlavor = function() {
                        return flavor;
                    };
                }

                if (typeof this.serveCoffee === 'function') {
                    this.serveCoffee = function(context) {
                        return `Serving coffee flavor ${flavor} to table ${context.getTable()}.`;
                    };
                }
            }

            CoffeeFlavor.implementsFor(CoffeeOrder);

            function CoffeeOrderContext(tableNumber) {
                return {
                    getTable() {
                        return tableNumber;
                    }
                };
            }

            function CoffeeFlavorFactory() {
                const flavors = {};
                let length = 0;

                return {
                    getCoffeeFlavor(flavorName) {
                        let flavor = flavors[flavorName];
                        if (typeof flavor === 'undefined') {
                            flavor = new CoffeeFlavor(flavorName);
                            flavors[flavorName] = flavor;
                            length += 1;
                        }
                        return flavor;
                    },
                    getTotalCoffeeFlavorsMade() {
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
                vm.flavors[vm.ordersMade] = vm.flavorFactory.getCoffeeFlavor(flavorIn);
                vm.tables[vm.ordersMade] = new CoffeeOrderContext(table);

                const timer = $timeout(
                    vm.flavors[vm.ordersMade].serveCoffee,
                    vm.getRandomDuration(),
                    true,
                    vm.tables[vm.ordersMade]
                );
                timer.then((result) => {
                    vm.servedLog.push(result);
                },
                () => {
                    console.log('Coffee order canceled.');
                });
                vm.timers.push(timer);

                vm.ordersMade += 1;

                mdClearInput.clearInputBoxes(['flavor-input', 'table-input']);
            };

            $scope.$on('$destroy', () => {
                vm.timers.forEach(t => $timeout.cancel(t));
            });
        }
    ]
);
