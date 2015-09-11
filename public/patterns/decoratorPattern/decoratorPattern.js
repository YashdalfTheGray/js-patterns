/* global angular */

angular.module('jsPatternsDemo')
.controller('DecoratorPatternCtrl', 
    [
        function() {
            var vm = this;
            
            function Laptop() {
                this.processor = {
                    clockFrequency: 2.0,
                    units: 'GHz'
                };
                this.memory = {
                    capacity: 4,
                    units: 'GB'
                };
                this.storage = {
                    size: 500,
                    units: 'GB',
                    type: '7200RPM HDD'
                };
                this.display = {
                    size: 13.3,
                    resolution: '1920x1200'
                };
                this.video = {
                    memory: 2,
                    units: 'GB',
                    type: 'Integrated'
                };
                this.cost = function() {
                    return 700.00;
                };
            }
        }
    ]
);