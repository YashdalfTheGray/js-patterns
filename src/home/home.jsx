import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as angular from 'angular';

import Title from '../components/title';

const homeTemplate = `
<md-content layout-padding layout="column">
    <div id="home-mount-point"></div>
</md-content>
`;

class HomeCtrl {
    $onInit() {
        ReactDOM.render(
            <Title>Please select a pattern from the sidebar.</Title>,
            document.querySelector('#home-mount-point')
        );
    }

    $onDestroy() {
        ReactDOM.unmountComponentAtNode(document.querySelector('#home-mount-point'));
    }
}

angular.module('jsPatternsDemo')
.component('home', {
    template: homeTemplate,
    controller: HomeCtrl
});
