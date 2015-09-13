/* global angular */
/* global Firebase */
/* global _ */

angular.module('jsPatternsDemo')
.controller('CommandPatternCtrl', 
    [
        '$firebaseArray', '$mdToast', /*'$mdDialog',*/
        function($firebaseArray, $mdToast/*, $mdDialog*/) {
            "use strict";
            var vm = this;
            var ref = new Firebase("https://js-patterns.firebaseio.com/command/items/");

            vm.contentLoaded = false;
            vm.items = $firebaseArray(ref);

            vm.items.$loaded().then(function () {
                vm.contentLoaded = true;
            });

            vm.inventory = (function(items) {

                function findItemIndex(itemId) {
                    return _.findIndex(items, function(item) {
                        return item.$id === itemId;
                    });
                }

                function buyItem(itemId) {
                    items[findItemIndex(itemId)].quantity++;
                }

                function useItem(itemId) {
                    if (items[findItemIndex(itemId)].quantity > 0) {
                        items[findItemIndex(itemId)].quantity--;
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
                    var item = items[findItemIndex(itemId)];

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

                var inventoryManager = {
                    buy: buyItem,
                    use: useItem,
                    details: getItemDetails 
                };
                inventoryManager.execute = function(name) {
                    return inventoryManager[name] && inventoryManager[name].apply(inventoryManager, [].slice.call(arguments, 1));
                };

                return inventoryManager;

            })(vm.items);
        }
    ]
);