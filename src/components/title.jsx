import * as React from 'react';

export default function Title({ children }) {
    return (
        <h2 style={{ padding: '8px' }}>
            {children}
        </h2>
    );
}
