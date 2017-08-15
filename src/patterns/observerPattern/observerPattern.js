import * as angular from 'angular';
import * as _ from 'lodash';

angular.module('jsPatternsDemo')
.controller('ObserverPatternCtrl',
    [
        '$mdToast', 'infoButtonSvc',
        function($mdToast, infoButtonSvc) {
            const vm = this;
            vm.ibs = infoButtonSvc;

            vm.moduleName = 'Checkbox notifier';
            vm.moduleVersion = '0.1.0';
            vm.observerChoice = 'normal';
            vm.toastObserverCount = 0;
            vm.subjectCheckbox = {
                isChecked: false
            };

            class ObserverList {
                constructor() {
                    this.observerList = [];
                    this[Symbol.iterator] = (...params) => this.observerList[Symbol.iterator](params);
                }

                add(obj) {
                    return this.observerList.push(obj);
                }

                count() {
                    return this.observerList.length;
                }

                get(index) {
                    if (index > -1 && index < this.observerList.length) {
                        return this.observerList[index];
                    }
                    return null;
                }

                indexOf(obj, startIndex) {
                    return _.indexOf(this.observerList, obj, startIndex);
                }

                removeAt(index) {
                    this.observerList.splice(index, 1);
                }
            }

            class Subject {
                constructor() {
                    this.observers = new ObserverList();
                }

                addObserver(observer) {
                    this.observers.add(observer);
                }

                removeObserver(observer) {
                    this.observers.removeAt(this.observers.indexOf(observer, 0));
                }

                notify(context) {
                    [...this.observers].forEach(o => o.update(context));
                }
            }

            vm.subjectCheckbox.s = new Subject();

            vm.notifyObservers = function() {
                vm.subjectCheckbox.s.notify(vm.subjectCheckbox.isChecked);
            };

            vm.addObserver = function(type) {
                let obs;
                if (type === 'normal') {
                    obs = {
                        isChecked: false,
                        type: 'Normal observer'
                    };

                    obs.update = function(context) {
                        this.isChecked = context;
                    };
                }
                else if (type === 'inverted') {
                    obs = {
                        isChecked: true,
                        type: 'Inverted observer'
                    };

                    obs.update = function(context) {
                        this.isChecked = !context;
                    };
                }
                else if (type === 'toast') {
                    obs = {
                        isChecked: false,
                        type: 'Toast observer'
                    };

                    obs.update = function(context) {
                        this.isChecked = context;
                        $mdToast.show(
                            $mdToast.simple()
                            .content(`Subject Checkbox value changed to ${context}`)
                            .position('bottom right')
                            .hideDelay(3000)
                        );
                    };
                    vm.toastObserverCount += 1;
                    vm.observerChoice = 'normal';
                }

                vm.subjectCheckbox.s.addObserver(obs);
            };

            vm.removeObserver = function(obs) {
                if (obs.type === 'Toast observer') {
                    vm.toastObserverCount -= 1;
                }
                vm.subjectCheckbox.s.removeObserver(obs);
            };
        }
    ]
);
