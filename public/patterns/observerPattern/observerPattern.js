/* global angular */

angular.module('jsPatternsDemo')
.controller('ObserverPatternCtrl', 
    [
        function() {
            var vm = this;

            vm.moduleName = "Checkbox notifier";
            vm.moduleVersion = "0.1.0";
            vm.observerChoice = 'normal';
            vm.subjectCheckbox = {
                isChecked: false
            };

            function extend(obj, extention) {
                for(var key in extention) {
                    obj[key] = extention[key];
                }
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
                var observerCount = this.observers.count();
                for (var i = 0; i < observerCount; i++) {
                    this.observers.get(i).update(context);
                }
            };

            function Observer() {
                this.update = function(context) {
                    // this will be overwritten later on
                }
            }

            extend(vm.subjectCheckbox, new Subject());

            vm.notifyObservers = function() {
                console.log(vm.subjectCheckbox);
                vm.subjectCheckbox.notify(vm.subjectCheckbox.isChecked);
            }

            vm.addObserver = function(type) {
                if (type === 'normal') {
                    var obs = {
                        isChecked: false
                    };
                    extend(obs, new Observer());

                    obs.update = function(context) {
                        this.isChecked = context;
                        console.log(this.isChecked);
                    }

                    vm.subjectCheckbox.addObserver(obs);
                }
                else if (type === 'inverted') {
                    var obs = {
                        isChecked: true
                    };
                    extend(obs, new Observer());

                    obs.update = function(context) {
                        this.isChecked = !context;
                        console.log(this.isChecked);
                    }

                    vm.subjectCheckbox.addObserver(obs);
                }
            } 
        }
    ]
);