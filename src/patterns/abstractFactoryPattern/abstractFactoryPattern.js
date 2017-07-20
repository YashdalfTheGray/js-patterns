/* global angular */

angular.module('jsPatternsDemo')
.controller('AbstractFactoryPatternCtrl',
    [
        function() {
            "use strict";
            var vm = this;

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

            function formatNumber(number) {
                return Math.round(number * 100000) / 100000;
            }

            function getRandomNUmber() {
                return Math.floor(Math.random() * (9 - 1) + 1);
            }

            function Rectangle(options) {
                this.h = options.h || 1;
                this.l = options.l || 2;
            }
            Rectangle.prototype.area = function() {
                return formatNumber(this.h * this.l);
            };
            Rectangle.prototype.perimeter = function() {
                return formatNumber(2 * (this.h + this.l));
            };
            Rectangle.prototype.toString = function() {
                return 'This rectangle has a length of ' + this.l + ' and a height of ' + this.h + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
            };

            function Circle(options) {
                this.r = options.r || 1;
            }
            Circle.prototype.area = function() {
                return formatNumber(Math.PI * this.r * this.r);
            };
            Circle.prototype.perimeter = function() {
                return formatNumber(2 * Math.PI * this.r);
            };
            Circle.prototype.toString = function() {
                return 'This circle has a radius of ' + this.r + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
            };

            function Triangle(options) {
                this.a = options.a || 1;
                this.b = options.b || 1;
                this.c = options.c || 1;
            }
            Triangle.prototype.area = function() {
                var s = 0.5 * this.perimeter();
                return formatNumber(Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c)));
            };
            Triangle.prototype.perimeter = function() {
                return formatNumber(this.a + this.b + this.c);
            };
            Triangle.prototype.toString = function() {
                return 'This triangle has side lengths ' + this.a + ', ' + this.b + ' and ' + this.c + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
            };

            function Parallelogram(options) {
                this.a = options.a || 1;
                this.b = options.b || 1;
                this.h = options.h || 1;
            }
            Parallelogram.prototype.area = function() {
                return formatNumber(this.b * this.h);
            };
            Parallelogram.prototype.perimeter = function() {
                return formatNumber(2 * (this.a + this.b));
            };
            Parallelogram.prototype.toString = function() {
                return 'This Parallelogram has side lengths ' + this.a + ', ' + this.b + ' and height ' + this.h + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
            };

            function Square(options) {
                this.a = options.a || 1;
            }
            Square.prototype.area = function() {
                return formatNumber(this.a * this.a);
            };
            Square.prototype.perimeter = function() {
                return formatNumber(4 * this.a);
            };
            Square.prototype.toString = function() {
                return 'This Square has side length ' + this.a + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
            };

            vm.abstractShapeFactory = (function() {
                var types = {};

                return {
                    get: function(type, options) {
                        var Shape = types[type];

                        return (Shape ? new Shape(options) : null);
                    },
                    register: function(type, Shape) {
                        if(Shape.prototype.area && Shape.prototype.perimeter && Shape.prototype.toString) {
                            types[type] = Shape;
                        }
                        return vm.abstractShapeFactory;
                    }
                };
            })();

            vm.abstractShapeFactory.register('rectangle', Rectangle);
            vm.abstractShapeFactory.register('circle', Circle);

            vm.addShape = function() {
                var newShape;
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
                    newShape = vm.abstractShapeFactory.get(vm.shapeChoice, {});
                }
                if(newShape) {
                    vm.shapes.push(newShape);
                }
            };

            vm.registerShape = function() {
                switch(vm.shapeRegChoice) {
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
                }
            };
        }
    ]
);