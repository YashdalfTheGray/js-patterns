import * as React from 'react';
import { Card, CardAction, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Title from './title';
import ThemeWrapper from './themeWrapper';

// export default class AbstractFactoryPattern extends React.Component {
//     render() {
//         return (
//             <div fontFamily="Roboto">This is a test</div>
//         );
//     }
// }

export default function AbstractFactoryPattern() {
    return (
        <ThemeWrapper>
            <Title>Abstract Factory Pattern</Title>
            <Card>
                <CardHeader title="The Abstract Shape Factory" />
            </Card>
        </ThemeWrapper>
    );
}
