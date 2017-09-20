import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import { startCase, uniqueId } from 'lodash';

import Title from './title';
import ThemeWrapper from './themeWrapper';
import { Rectangle, Circle, Triangle, Parallelogram, Square, AbstractShapeFactory } from '../support';

function getRandomNUmber() {
    return Math.floor((Math.random() * (9 - 1)) + 1);
}

const abstractShapeFactory = new AbstractShapeFactory();
window.abstractShapeFactory = abstractShapeFactory;

export default class AbstractFactoryPattern extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registeredShapes: ['rectangle', 'circle'],
            unregisteredShapes: ['triangle', 'parallelogram', 'square'],
            shapeInstances: [],
            selectedToCreate: 'rectangle',
            selectedToRegister: 'triangle',
            useRandomValues: false
        };

        this.handleCreateMenuChange = this.handleCreateMenuChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleRandomToggle = this.handleRandomToggle.bind(this);
    }

    componentDidMount() {
        abstractShapeFactory.register('rectangle', Rectangle).register('circle', Circle);
    }

    handleCreateMenuChange(e, i) {
        this.setState({
            selectedToCreate: this.state.registeredShapes[i]
        });
    }

    handleCreateClick() {
        const { shapeInstances, selectedToCreate, useRandomValues } = this.state;

        if (useRandomValues) {
            this.setState({
                shapeInstances: [
                    ...shapeInstances,
                    abstractShapeFactory.get(selectedToCreate, {
                        a: getRandomNUmber(),
                        b: getRandomNUmber(),
                        c: getRandomNUmber(),
                        h: getRandomNUmber(),
                        l: getRandomNUmber(),
                        r: getRandomNUmber()
                    })
                ]
            });
        }
        else {
            this.setState({
                shapeInstances: [...shapeInstances, abstractShapeFactory.get(selectedToCreate)]
            });
        }
    }

    handleRandomToggle(e, isEnabled) {
        this.setState({ useRandomValues: isEnabled });
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
                                this.state.registeredShapes
                                .map(t => <MenuItem value={t} primaryText={startCase(t)} key={uniqueId('type_')} />)
                            }
                        </SelectField>
                        <Toggle
                            label="Use random values to initialize shape"
                            labelPosition="right"
                            toggled={this.state.useRandomValues}
                            onToggle={this.handleRandomToggle} />
                    </CardText>
                    <CardActions>
                        <FlatButton label="Register" />
                        <FlatButton label="Create" onClick={this.handleCreateClick} primary />
                    </CardActions>
                </Card>
                <Card style={{ marginTop: '8px' }}>
                    <CardHeader title="Created Shapes" />
                    <CardText>
                        <List>
                            {(() => {
                                if (this.state.shapeInstances.length !== 0) {
                                    return this.state.shapeInstances
                                    .map(i => <ListItem primaryText={i.toString()} key={uniqueId('shape_')} />);
                                }
                                return [
                                    <ListItem
                                        primaryText={'No shapes created yet.'}
                                        key={'no_shapes_placeholder'}
                                        disabled />
                                ];
                            })()}
                        </List>
                    </CardText>
                </Card>
            </ThemeWrapper>
        );
    }
}
