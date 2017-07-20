/* global angular */

angular.module('jsPatternsDemo')
.controller('HomeCtrl', 
    [
        'infoButtonSvc',
        function(infoButtonSvc) {
            "use strict";
            
            if (infoButtonSvc.isInfoVisible()) {
                infoButtonSvc.toggleInfo();
            }
        }
    ]
);