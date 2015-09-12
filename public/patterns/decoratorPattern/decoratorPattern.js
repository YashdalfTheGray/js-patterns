/* global angular */

angular.module('jsPatternsDemo')
.controller('DecoratorPatternCtrl', 
    [
        function() {
            var vm = this;
            
            function Laptop() {
                this.processor = function() {
                    return 2.0
                };
                this.memory = function() {
                    return 4;
                };
                this.storage = function() {
                    return 128;
                };
                this.videoMemory = function() {
                    return 2;
                };
                this.displaySize = function() {
                    return 13.3;
                };
                this.cost = function() {
                    return 700.00;
                };
            }

            vm.upgrades = {
                processor: function(latop) {
                    var p = laptop.processor();
                    var c = laptop.cost();

                    laptop.processor = function() {
                        return p + 0.5;
                    };

                    laptop.cost = function() {
                        return c + 200;
                    };
                },
                memory: function(laptop) {
                    var m = laptop.memory();
                    var c = laptop.cost();

                    laptop.memory = function() {
                        return m + 4;
                    };

                    laptop.cost = function() {
                        return c + 100;
                    };
                },
                storage: function(laptop) {
                    var s = laptop.storage();
                    var c = laptop.cost();

                    laptop.storage = function() {
                        return s + 384;
                    };
                    laptop.cost = function() {
                        return c + 400;
                    };
                },
                videoMemory: function() {
                    var v = laptop.videoMemory();
                    var c = laptop.cost();

                    laptop.videoMemory = function() {
                        return v + 2;
                    };
                    laptop.cost = function() {
                        return c + 250;
                    }
                },
                displaySize: function() {
                    var d = laptop.displaySize();
                    var c = cost();

                    laptop.displaySize = function() {
                        return d + 2.3;
                    }
                    laptop.cost = function() {
                        return c + 300;
                    }
                }
            }
        }
    ]
);