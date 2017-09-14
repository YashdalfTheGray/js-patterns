import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Title from './title';
import ThemeWrapper from './themeWrapper';
import { Rectangle, Circle, Triangle, Parallelogram, Square } from '../support';


const abstractShapeFactory = (function abstractShapeFactory() {
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

export default class AbstractFactoryPattern extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shapeTypes: [
                { name: 'Rectangle', key: 'rectangle', reg: true },
                { name: 'Circle', key: 'circle', reg: true },
                { name: 'Triangle', key: 'triangle', reg: false },
                { name: 'Parallelogram', key: 'parallelogram', reg: false },
                { name: 'Square', key: 'square', reg: false }
            ],
            shapes: []
        };
    }

    componentDidMount() {
        abstractShapeFactory.register('rectangle', Rectangle);
        abstractShapeFactory.register('circle', Circle);
    }

    render() {
        return (
            <ThemeWrapper>
                <Title>Abstract Factory Pattern</Title>
                <Card>
                    <CardHeader title="The Abstract Shape Factory" />
                    <CardText>
                        <pre>{JSON.stringify(this.state.shapeTypes, null, 2)}</pre>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Register" />
                        <FlatButton label="Create" primary />
                    </CardActions>
                </Card>
            </ThemeWrapper>
        );
    }
}
