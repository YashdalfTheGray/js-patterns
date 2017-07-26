/* global angular */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Title from '../components/title';

angular.module('jsPatternsDemo')
.controller('HomeCtrl', [
    'infoButtonSvc',
    function(infoButtonSvc) {

        if (infoButtonSvc.isInfoVisible()) {
            infoButtonSvc.toggleInfo();
        }

        ReactDOM.render(
            <Title>Please select a pattern from the sidebar.</Title>,
            document.querySelector('#home-mount-point')
        );
    }
]);
