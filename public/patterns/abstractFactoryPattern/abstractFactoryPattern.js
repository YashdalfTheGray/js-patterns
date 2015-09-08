/* global angular */

angular.module('jsPatternsDemo')
.controller('AbstractFactoryPatternCtrl',
    [
        function() {
            var vm = this;

            function formatNumber(number) {
                return Math.round(number * 100000) / 100000;
            }

            function Rectangle(options) {
                this.h = options.h || 1;
                this.l = options.l || 2;

                this.prototype..area = function() {
                    return formatNumber(this.h * this.l);
                };
                this.prototype.perimeter = function() {
                    return formatNumber(2 * (this.h + this.l));
                };
                this.toString = function() {
                    return 'This rectangle has a length of ' + this.l + 'and a height of ' + this.h + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
                };
            }

            function Circle(options) {
                this.r = options.r || 1;

                this.prototype.area = function() {
                    return formatNumber(Math.PI * this.r * this.r);
                };
                this.prototype.perimeter = function() {
                    return formatNumber(2 * Math.PI * this.r);
                };
                this.toString = function() {
                    return 'This circle has a radius of ' + this.r + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
                };
            }

            function Triangle(options) {
                this.a = options.a || 1;
                this.b = options.b || 1;
                this.c = options.c || 1;
                this.enableArea = options.enableArea || true;
                this.enablePerimiter = options.enablePerimeter || true;
                this.enableToString = options.enableToString || true;

                if (this.enableArea) {
                    this.prototype.area = function() {
                        var s = 0.5 * this.perimeter();
                        return formatNumber(Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c)));
                    }
                }
                if (this.enablePerimeter) {
                    this.prototype.perimeter = function() {
                        return formatNumber(a + b + c);
                    }
                }

                if (this.enableToString) {
                    this.toString = function() {
                        return 'This triangle has side lengths ' + this.a + ', ' + this.b + ' and ' + this.c + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
                    }
                }
            }

            function Parallelogram(options) {
                this.a = options.a || 1;
                this.b = options.b || 1;
                this.h = options.h || 1;
                this.enableArea = options.enableArea || true;
                this.enablePerimiter = options.enablePerimeter || true;
                this.enableToString = options.enableToString || true;

                if (this.enableArea) {
                    this.prototype.area = function() {
                        return formatNumber(this.b * this.h);
                    }
                }
                if (this.enablePerimeter) {
                    this.prototype.perimeter = function() {
                        return formatNumber(2 * (this.a + this.b));
                    }
                }

                if (this.enableToString) {
                    this.toString = function() {
                        return 'This Parallelogram has side lengths ' + this.a + ', ' + this.b + ' and height ' + this.h + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
                    }
                }
            }

            function Square(options) {
                this.a = options.a || 1;
                this.enableArea = options.enableArea || true;
                this.enablePerimiter = options.enablePerimeter || true;
                this.enableToString = options.enableToString || true;

                if (this.enableArea) {
                    this.prototype.area = function() {
                        return formatNumber(this.a * this.a);
                    }
                }
                if (this.enablePerimeter) {
                    this.prototype.perimeter = function() {
                        return formatNumber(4 * this.a);
                    }
                }

                if (this.enableToString) {
                    this.toString = function() {
                        return 'This Square has side length ' + this.a + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
                    }
                }
            }

            vm.abstractShapeFactory = (function() {
                var types = {};

                return {
                    get: function(type, options) {
                        var Shape = types[type];

                        return (Shape ? new Shape(options) : null);
                    },
                    register: function(type, Shape) {
                        if(Shape.prototype.area && Shape.prototype.perimeter) {
                            types[type] = Shape;
                        }

                        return abstractShapeFactory;
                    }
                }
            })();

            vm.abstractShapeFactory.register('rectangle', Rectangle);
            vm.abstractShapeFactory.register('circle', Circle);
        }
    ]
);