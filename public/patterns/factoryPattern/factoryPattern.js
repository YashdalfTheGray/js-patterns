/* global angular */

angular.module('jsPatternsDemo')
.controller('FactoryPatternCtrl', 
    [
        'mdClearInput',
        function(mdClearInput) {
            var vm = this;

            vm.shapeChoice = 'rectangle';

            function formatNumber(number) {
                return Math.round(number * 100000) / 100000;
            }

            function Rectangle(options) {
                this.type = 'rectangle';
                this.h = options.h || 1;
                this.l = options.l || 2;
                this.x = options.x || 0;
                this.y = options.y || 0;

                this.area = function() {
                    return formatNumber(this.h * this.l);
                };
                this.perimeter = function() {
                    return formatNumber(2 * (this.h + this.l));
                };
                this.center = function() {
                    return '(' + this.x + ', ' + this.y + ')';
                };
                this.toString = function() {
                    return 'This rectangle has a length of ' + this.l + ', a height of ' + this.h + ' and is centered at ' + this.center() + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
                };
            }

            function Circle(options) {
                this.type = 'circle';
                this.r = options.r || 1;
                this.x = options.x || 0;
                this.y = options.y || 0;

                this.area = function() {
                    return formatNumber(Math.PI * this.r * this.r);
                };
                this.perimeter = function() {
                    return formatNumber(2 * Math.PI * this.r);
                };
                this.center = function() {
                    return '(' + this.x + ', ' + this.y + ')';
                };
                this.toString = function() {
                    return 'This circle has a radius of ' + this.r + ' and is centered at ' + this.center() + '. The area is ' + this.area() + ' and the perimeter is ' + this.perimeter() + '.';
                };
            }

            function ShapeFactory() {}

            ShapeFactory.prototype.shapeClass = Rectangle;

            ShapeFactory.prototype.createShape = function(options) {

                switch(options.type) {
                    case 'rectangle':
                        this.shapeClass = Rectangle;
                        break;
                    case 'circle':
                        this.shapeClass = Circle;
                        break;
                }

                return new this.shapeClass(options);
            };

            vm.shapeFactory = new ShapeFactory();

            vm.shapes = [];

            vm.addShape = function() {
                var newShape;
                if (vm.customize) {
                    newShape = vm.shapeFactory.createShape({
                        type: vm.shapeChoice,
                        l: vm.length,
                        h: vm.height,
                        r: vm.radius,
                        x: vm.centerX,
                        y: vm.centerY
                    });
                    mdClearInput.clearInputBoxes([
                        'length-input',
                        'height-input',
                        'radius-input',
                        'centerx-input',
                        'centery-input'
                    ]);
                    vm.length = undefined;
                    vm.height = undefined;
                    vm.radius = undefined;
                    vm.centerX = undefined;
                    vm.centerY = undefined;
                }
                else {
                    newShape = vm.shapeFactory.createShape({ type: vm.shapeChoice });
                }
                vm.shapes.push(newShape);
            };
        }
    ]
);