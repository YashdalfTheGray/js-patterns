import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { startCase } from 'lodash';

import Title from './title';
import ThemeWrapper from './themeWrapper';
import { Rectangle, Circle, Triangle, Parallelogram, Square, AbstractShapeFactory } from '../support';


const abstractShapeFactory = new AbstractShapeFactory();

export default class AbstractFactoryPattern extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registeredShapes: ['rectangle', 'circle'],
            unregisteredShapes: ['triangle', 'parallelogram', 'square'],
            shapeInstances: [],
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
        });
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
                                .map(t => <MenuItem value={t.key} primaryText={startCase(t.name)} />)
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
