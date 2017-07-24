/* global angular */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

angular.module('jsPatternsDemo')
.controller('HomeCtrl',
    [
        'infoButtonSvc',
        function(infoButtonSvc) {
            "use strict";

            if (infoButtonSvc.isInfoVisible()) {
                infoButtonSvc.toggleInfo();
            }

            function FirstTest() {
                return (
                    <div>This is a test</div>
                );
            }

            ReactDOM.render(
                <FirstTest />,
                document.querySelector('#home-mount-point')
            );
        }
    ]
);
