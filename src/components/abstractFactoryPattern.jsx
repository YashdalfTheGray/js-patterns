import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import { startCase, uniqueId } from 'lodash';

import Title from './title';
import ThemeWrapper from './themeWrapper';
import { Rectangle, Circle, Triangle, Parallelogram, Square, AbstractShapeFactory } from '../support';


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
            selectedToRegister: 'triangle'
        };

        this.handleCreateMenuChange = this.handleCreateMenuChange.bind(this);
    }

    componentDidMount() {
        abstractShapeFactory.register('rectangle', Rectangle).register('circle', Circle);
    }

    handleCreateMenuChange(e, i) {
        this.setState({
            selectedToCreate: this.state.registeredShapes[i]
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
                                this.state.registeredShapes
                                .map(t => <MenuItem value={t} primaryText={startCase(t)} key={uniqueId('type_')} />)
                            }
                        </SelectField>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Register" />
                        <FlatButton label="Create" primary />
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
                                return [<ListItem primaryText={'No shapes created yet.'} key={'no_shapes_placeholder'} />];
                            })()}
                        </List>
                    </CardText>
                </Card>
            </ThemeWrapper>
        );
    }
}
