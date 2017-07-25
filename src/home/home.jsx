/* global angular */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Title from '../components/title';

angular.module('jsPatternsDemo')
.controller('HomeCtrl',
    [
        'infoButtonSvc',
        function(infoButtonSvc) {
            "use strict";

            if (infoButtonSvc.isInfoVisible()) {
                infoButtonSvc.toggleInfo();
            }

            ReactDOM.render(
                <Title />,
                document.querySelector('#home-mount-point')
            );
        }
    ]
);
