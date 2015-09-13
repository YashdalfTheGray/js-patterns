/* global angular */

angular.module('jsPatternsDemo')
.controller('FlyweightPatternCtrl', 
    [
        function() {
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
                        return 'Serving coffee flavor' + flavor + ' to table ' + context.getTable() + '.';
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

            vm.flavors = new CoffeeFlavor();
            vm.tables = new CoffeeOrderContext();
            vm.ordersMade = 0;
            vm.flavorFactory = new CoffeeFlavorFactory();
            vm.servedLog = [];

            vm.takeOrders = function(flavorIn, table) {
                vm.flavors[vm.ordersMade] = vm.flavorFactory.getCoffeeFlavor(flavorIn);
                vm.tables[vm.ordersMade] = new CoffeeOrderContext(table);
                vm.ordersMade++;
            };
        }
    ]
);