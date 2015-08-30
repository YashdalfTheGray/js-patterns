/* global angular */

angular.module('jsPatternsDemo')
.controller('ObserverPatternCtrl', 
    [
        function() {
            var vm = this;

            vm.moduleName = "Checkbox notifier";
            vm.moduleVersion = "0.1.0"
            vm.subjectCheckbox = {
                isChecked: false
            };

            function extend(obj, extention) {
                for(var key in extention) {
                    obj[key] = extention[key];
                }
                console.log(obj);
            }

            function ObserverList() {
                this.observerList = [];
            }

            ObserverList.prototype.add = function(obj) {
                return this.observerList.push(obj);
            };

            ObserverList.prototype.count = function() {
                return this.observerList.length;
            };

            ObserverList.prototype.get = function(index) {
                if(index > -1 && index < this.observerList.length) {
                    return this.observerList[index];
                }
            };

            ObserverList.prototype.indexOf = function(obj, startIndex) {
                return _.indexOf(this.observerList, obj, startIndex);
            };

            ObserverList.prototype.removeAt = function(index) {
                this.observerList.splice(index, 1);
            };

            function Subject() {
                this.observers = new ObserverList();
            }

            Subject.prototype.addObserver = function(observer) {
                this.observers.add(observer);
            };

            Subject.prototype.removeObserver = function(observer) {
                this.observers.removeAt(this.observers.indexOf(observer, 0));
            };

            Subject.prototype.notify = function(context) {
                if(this.observers.length > 0) {
                    _.forEach(this.observers, function(item) {
                        item.update(context);
                    });
                }
            };

            function Observer() {
                this.update = function(context) {
                    // this will be overwritten later on
                }
            }

            extend(vm.subjectCheckbox, new Subject());

            vm.notifyObservers = function() {
                vm.subjectCheckbox.notify(vm.subjectCheckbox.isChecked);
            }
        }
    ]
);