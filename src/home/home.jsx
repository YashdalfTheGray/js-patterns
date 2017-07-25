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

            function Title() {
                return (
                    <h1 style={{ padding: '8px' }}>
                        Please select a pattern from the sidebar.
                    </h1>
                );
            }

            ReactDOM.render(
                <Title />,
                document.querySelector('#home-mount-point')
            );
        }
    ]
);
