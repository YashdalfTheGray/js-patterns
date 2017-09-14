import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
                { name: 'Rectangle', key: 'rectangle', registered: true },
                { name: 'Circle', key: 'circle', registered: true },
                { name: 'Triangle', key: 'triangle', registered: false },
                { name: 'Parallelogram', key: 'parallelogram', registered: false },
                { name: 'Square', key: 'square', registered: false }
            ],
            shapes: [],
            selectedToCreate: 'rectangle',
            selectedToRegister: 'triangle'
        };

        this.handleCreateMenuChange = this.handleCreateMenuChange.bind(this);
    }

    componentDidMount() {
        abstractShapeFactory.register('rectangle', Rectangle);
        abstractShapeFactory.register('circle', Circle);
    }

    handleCreateMenuChange(e, i) {
        this.setState({
            selectedToCreate: this.state.shapeTypes[i].key
        }, () => console.log(abstractShapeFactory.get(this.state.selectedToCreate)));
    }

    render() {
        return (
            <ThemeWrapper>
                <Title>Abstract Factory Pattern</Title>
                <Card>
                    <CardHeader title="The Abstract Shape Factory" />
                    <CardText>
                        <SelectField
                            floatingLabelText="Shape to create"
                            value={this.state.selectedToCreate}
                            onChange={this.handleCreateMenuChange}>
                            {
                                this.state.shapeTypes
                                .filter(t => t.registered)
                                .map(t => <MenuItem value={t.key} primaryText={t.name} />)
                            }
                        </SelectField>
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
