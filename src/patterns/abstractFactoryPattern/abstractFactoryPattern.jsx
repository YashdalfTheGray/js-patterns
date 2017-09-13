import * as angular from 'angular';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Rectangle, Circle, Triangle, Parallelogram, Square } from '../../support';
import { AbstractFactoryPattern } from '../../components';

function getRandomNUmber() {
    return Math.floor((Math.random() * (9 - 1)) + 1);
}

class AbstractFactoryPatternCtrl {
    $onInit() {
        const self = this;

        self.shapes = [];
        self.shapeChoice = 'rectangle';
        self.shapeRegChoice = 'triangle';
        self.shapeTypes = [
            { name: 'Rectangle', key: 'rectangle', reg: true },
            { name: 'Circle', key: 'circle', reg: true },
            { name: 'Triangle', key: 'triangle', reg: false },
            { name: 'Parallelogram', key: 'parallelogram', reg: false },
            { name: 'Square', key: 'square', reg: false }
        ];

        self.abstractShapeFactory = (function abstractShapeFactory() {
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
                    return self.abstractShapeFactory;
                }
            };
        }());

        self.abstractShapeFactory.register('rectangle', Rectangle);
        self.abstractShapeFactory.register('circle', Circle);

        ReactDOM.render(
            <AbstractFactoryPattern />,
            document.querySelector('#abstract-factory-mount-point')
        );
    }

    $onDestroy() {
        ReactDOM.unmountComponentAtNode(document.querySelector('#abstract-factory-mount-point'));
    }

    addShape() {
        let newShape;
        if (this.randomize) {
            newShape = this.abstractShapeFactory.get(this.shapeChoice, {
                a: getRandomNUmber(),
                b: getRandomNUmber(),
                c: getRandomNUmber(),
                h: getRandomNUmber(),
                l: getRandomNUmber(),
                r: getRandomNUmber()
            });
        }
        else {
            newShape = this.abstractShapeFactory.get(this.shapeChoice);
        }
        if (newShape) {
            this.shapes.push(newShape);
        }
    }

    registerShape() {
        switch (this.shapeRegChoice) {
        case 'triangle':
            this.abstractShapeFactory.register('triangle', Triangle);
            this.shapeTypes[2].reg = true;
            break;
        case 'parallelogram':
            this.abstractShapeFactory.register('parallelogram', Parallelogram);
            this.shapeTypes[3].reg = true;
            break;
        case 'square':
            this.abstractShapeFactory.register('square', Square);
            this.shapeTypes[4].reg = true;
            break;
        default:
            break;
        }
    }
}

angular.module('jsPatternsDemo')
.component('abstractFactoryPattern', {
    templateUrl: 'abstractFactoryPattern.tpl.html',
    controller: AbstractFactoryPatternCtrl
});
