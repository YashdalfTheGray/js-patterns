import * as angular from 'angular';
import { Rectangle, Circle, Triangle, Parallelogram, Square } from '../../support';

angular.module('jsPatternsDemo')
.controller('AbstractFactoryPatternCtrl', [
    function AbstractFactoryPatternCtrl() {
        const vm = this;

        vm.shapes = [];
        vm.shapeChoice = 'rectangle';
        vm.shapeRegChoice = 'triangle';
        vm.shapeTypes = [
            { name: 'Rectangle', key: 'rectangle', reg: true },
            { name: 'Circle', key: 'circle', reg: true },
            { name: 'Triangle', key: 'triangle', reg: false },
            { name: 'Parallelogram', key: 'parallelogram', reg: false },
            { name: 'Square', key: 'square', reg: false }
        ];

        function getRandomNUmber() {
            return Math.floor((Math.random() * (9 - 1)) + 1);
        }

        vm.abstractShapeFactory = (function abstractShapeFactory() {
            const types = {};

            return {
                get(type, options) {
                    const Shape = types[type];

                    return (Shape ? new Shape(options) : null);
                },
                register(type, Shape) {
                    if (Shape.prototype.area && Shape.prototype.perimeter && Shape.prototype.toString) {
                        types[type] = Shape;
                    }
                    return vm.abstractShapeFactory;
                }
            };
        }());

        vm.abstractShapeFactory.register('rectangle', Rectangle);
        vm.abstractShapeFactory.register('circle', Circle);

        vm.addShape = () => {
            let newShape;
            if (vm.randomize) {
                newShape = vm.abstractShapeFactory.get(vm.shapeChoice, {
                    a: getRandomNUmber(),
                    b: getRandomNUmber(),
                    c: getRandomNUmber(),
                    h: getRandomNUmber(),
                    l: getRandomNUmber(),
                    r: getRandomNUmber()
                });
            }
            else {
                newShape = vm.abstractShapeFactory.get(vm.shapeChoice);
            }
            if (newShape) {
                vm.shapes.push(newShape);
            }
        };

        vm.registerShape = () => {
            switch (vm.shapeRegChoice) {
            case 'triangle':
                vm.abstractShapeFactory.register('triangle', Triangle);
                vm.shapeTypes[2].reg = true;
                break;
            case 'parallelogram':
                vm.abstractShapeFactory.register('parallelogram', Parallelogram);
                vm.shapeTypes[3].reg = true;
                break;
            case 'square':
                vm.abstractShapeFactory.register('square', Square);
                vm.shapeTypes[4].reg = true;
                break;
            default:
                break;
            }
        };
    }
]);
