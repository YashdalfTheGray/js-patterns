import * as React from 'react';
import * as PropTypes from 'prop-types';

export default function Title({ children }) {
    return (
        <h2 style={{ fontFamily: 'Roboto' }}>
            {children}
        </h2>
    );
}

Title.propTypes = {
    children: PropTypes.string.isRequired
};
