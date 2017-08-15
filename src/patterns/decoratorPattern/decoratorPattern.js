import * as angular from 'angular';
import * as _ from 'lodash';

angular.module('jsPatternsDemo')
.controller('DecoratorPatternCtrl',
    [
        function() {
            const vm = this;

            function Laptop() {
                this.processor = function() {
                    return 2.5;
                };
                this.memory = function() {
                    return 8;
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
                    return 900;
                };
            }

            vm.upgrades = {
                processor(laptop) {
                    const p = laptop.processor();
                    const c = laptop.cost();

                    laptop.processor = function() {
                        return p + 0.7;
                    };

                    laptop.cost = function() {
                        return c + 200;
                    };
                },
                memory(laptop) {
                    const m = laptop.memory();
                    const c = laptop.cost();

                    laptop.memory = function() {
                        return m + 8;
                    };

                    laptop.cost = function() {
                        return c + 100;
                    };
                },
                storage(laptop) {
                    const s = laptop.storage();
                    const c = laptop.cost();

                    laptop.storage = function() {
                        return s + 384;
                    };
                    laptop.cost = function() {
                        return c + 400;
                    };
                },
                videoMemory(laptop) {
                    const v = laptop.videoMemory();
                    const c = laptop.cost();

                    laptop.videoMemory = function() {
                        return v + 2;
                    };
                    laptop.cost = function() {
                        return c + 250;
                    };
                },
                displaySize(laptop) {
                    const d = laptop.displaySize();
                    const c = laptop.cost();

                    laptop.displaySize = function() {
                        return d + 2.3;
                    };
                    laptop.cost = function() {
                        return c + 300;
                    };
                }
            };

            vm.appliedUpgrades = {
                processor: false,
                memory: false,
                storage: false,
                videoMemory: false,
                displaySize: false
            };

            vm.startOver = function() {
                vm.currentBuild = new Laptop();
                Object.keys(vm.appliedUpgrades).forEach((k) => {
                    vm.appliedUpgrades[k] = false;
                });
            };

            vm.upgrade = function(upgrade, decorator, laptop) {
                if (vm.appliedUpgrades[upgrade]) {
                    decorator(laptop);
                }
            };

            vm.format = function(key, value) {
                if (!value) {
                    return _.startCase(key);
                }

                let unit = '';
                const keyStr = key.toString();

                switch (keyStr) {
                case 'processor':
                    unit = ' GHz';
                    break;
                case 'memory':
                case 'storage':
                case 'videoMemory':
                    unit = ' GB';
                    break;
                case 'displaySize':
                    unit = '"';
                    break;
                case 'cost':
                    unit = '$';
                    break;
                default:
                    break;
                }

                const valueStr = (key === 'displaySize') ? (Math.round(value() * 10) / 10) : value();
                const valueUnitStr = (keyStr === 'cost') ? unit + valueStr : valueStr + unit;

                return `${_.startCase(keyStr)} - ${valueUnitStr}`;
            };

            vm.currentBuild = new Laptop();
        }
    ]
);
