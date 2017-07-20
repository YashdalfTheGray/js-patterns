/* global angular */

angular.module('jsPatternsDemo')
.controller('FacadePatternCtrl', 
    [
        'mdClearInput',
        function(mdClearInput) {
            "use strict";
            var vm = this;

            vm.autoQuoteMachine = (function() {
                var _private = {
                    baseRate: 50,
                    checkAge: function(age, baseRate) {
                        return age > 25 ? baseRate : baseRate * 1.4;
                    },
                    adjustForDrivingRecord: function(name, baseRate) {
                        return baseRate * (1 + Math.random() * (0.05 + (name.length / 100)));
                    },
                    roundToNearestCent: function(number) {
                        return (Math.round(number * 100)) / 100;
                    }

                };

                return {
                    getInsuranceQuote: function(name, age) {
                        var finalRate = _private.checkAge(age, _private.baseRate);
                        finalRate = _private.adjustForDrivingRecord(name, finalRate);
                        finalRate = _private.roundToNearestCent(finalRate);
                        return finalRate;
                    }
                };
            })();

            vm.getQuote = function(name, age) {
                vm.quote = vm.autoQuoteMachine.getInsuranceQuote(name, age);
                mdClearInput.clearInputBoxes(['name-input', 'age-input']);
            };

            vm.printCurrency = function(amount) {
                if(amount) {
                    // A note about the tenthsPlace variable - It is not actually the
                    // tenths place in the decimal because in the case where amount
                    // is 45.03, tenthsPlace evaluates to 0.3 which is technically correct
                    // and makes the formatting function work but the variable is not
                    // named correctly. 
                    // 
                    // To make it function correctly, the current expression would need to be
                    // wrapped in a Math.round().
                    // 
                    // TODO - Tech debt, I guess.
                    var tenthsPlace = (amount * 10) - (Math.round(amount) * 10);
                    var hundredthsPlace = (amount * 100) - (Math.round(amount * 10) * 10);

                    if (hundredthsPlace === 0 && tenthsPlace !== 0) {
                        return amount.toString() + '0';
                    }
                    else if (tenthsPlace === 0) {
                        return amount.toString() + '.00';
                    }
                    else {
                        return amount.toString();
                    }
                }
                else {
                    return '0.00';
                }
            };
        }
    ]
);