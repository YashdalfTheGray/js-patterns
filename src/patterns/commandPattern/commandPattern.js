/* global firebase */
import * as angular from 'angular';
import * as _ from 'lodash';

angular.module('jsPatternsDemo')
.controller('CommandPatternCtrl', [
    '$firebaseArray', '$mdToast', /* '$mdDialog', */
    function CommandPatternCtrl($firebaseArray, $mdToast/* , $mdDialog */) {
        const vm = this;
        const ref = firebase.database().ref('/command/items');

        vm.contentLoaded = false;
        vm.items = $firebaseArray(ref);

        vm.items.$loaded().then(() => {
            vm.contentLoaded = true;
        });

        vm.inventory = ((items) => {
            function findItemIndex(itemId) {
                return _.findIndex(items, item => item.$id === itemId);
            }

            function buyItem(itemId) {
                items[findItemIndex(itemId)].quantity += 1;
            }

            function useItem(itemId) {
                if (items[findItemIndex(itemId)].quantity > 0) {
                    items[findItemIndex(itemId)].quantity -= 1;
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Nothing left to use!')
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                }
            }

            function getItemDetails(itemId) {
                const item = items[findItemIndex(itemId)];

                $mdToast.show(
                    $mdToast.simple()
                    .content(item.description)
                    .position('bottom right')
                    .hideDelay(3000)
                );
                // For whatever reason, the dialog won't display. Thanks ngMaterial
                // $mdDialog.show($mdDialog.alert()
                //     .parent(angular.element(document.body))
                //     .title(item.title + ' details')
                //     .content(item.description)
                //     .ariaLabel('Item detail dialog')
                //     .ok('Close')
                //     .targetEvent(ev));
            }

            const inventoryManager = {
                buy: buyItem,
                use: useItem,
                details: getItemDetails
            };
            inventoryManager.execute = (name, ...rest) => inventoryManager[name] && inventoryManager[name](rest);

            return inventoryManager;
        })(vm.items);
    }
]);
