/* global angular */

angular.module('jsPatternsDemo')
.controller('FactoryPatternCtrl', 
    [
        function() {
            var vm = this;

            function Rectangle(options) {
                this.type = 'rectangle';
                this.h = options.h || 1;
                this.l = options.l || 2;
                this.x = options.x || 0;
                this.y = options.y || 0;

                this.area = function() {
                    return this.h * this.l;
                };
                this.perimeter = function() {
                    return 2 * (this.h + this.l);
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
                    return Math.round((Math.PI * this.r * this.r) * 100) / 100;
                };
                this.perimeter = function() {
                    return Math.round((2 * Math.PI * this.r) * 100) / 100;
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
                vm.shapes.push(vm.shapeFactory.createShape({
                    type: vm.shapeChoice
                }));
            };
        }
    ]
);