import * as angular from 'angular';
import * as _ from 'lodash';

angular.module('jsPatternsDemo')
.controller('MixinPatternCtrl',
    [
        'mdClearInput',
        function(mdClearInput) {
            const vm = this;

            vm.phones = [];
            vm.phoneChoice = 'android';

            function getLat() {
                const num = (Math.random() * 90).toFixed(7);
                return Math.random() > 0.5 ? num : num * -1;
            }

            function getLong() {
                const num = (Math.random() * 180).toFixed(7);
                return Math.random() > 0.5 ? num : num * -1;
            }

            const PhoneAdminMixins = {
                lock() {
                    console.log('Phone has been locked.');
                },
                track() {
                    console.log(`Phone located at https://www.google.com/maps/@${getLong()},${getLat()},16z`);
                },
                wipe() {
                    console.log('Phone has been deregistered and wiped.');
                }
            };

            function AndroidDevice(options) {
                this.manufacturer = options.manufacturer;
                this.model = options.model;
                this.osVersion = options.osVersion;
            }

            function IOSDevice(options) {
                this.manufacturer = 'Apple';
                this.model = options.model;
                this.osVersion = options.osVersion;
            }

            _.assign(AndroidDevice.prototype, PhoneAdminMixins);
            _.assign(IOSDevice.prototype, PhoneAdminMixins);

            vm.phones.push(new AndroidDevice({ manufacturer: 'Motorola', model: 'Nexus 6', osVersion: 'Android 5.1.1' }));
            vm.phones.push(new IOSDevice({ model: 'iPhone 6 Plus', osVersion: 'iOS 8.1.4' }));

            vm.addPhone = function() {
                if (vm.phoneChoice === 'android') {
                    vm.phones.push(new AndroidDevice({
                        manufacturer: vm.manufacturer,
                        model: vm.model,
                        osVersion: vm.osVersion
                    }));
                }
                else if (vm.phoneChoice === 'ios') {
                    vm.phones.push(new IOSDevice({
                        model: vm.model,
                        osVersion: vm.osVersion
                    }));
                }
                mdClearInput.clearInputBoxes(['manufacturer-input', 'model-input', 'osversion-input']);
            };
        }
    ]
);
