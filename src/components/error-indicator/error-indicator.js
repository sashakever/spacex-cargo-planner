import React from 'react';
import './error-indicator.scss';

const ErrorIndicator = ({error}) => {
    return (
        <div>{error ? error.message : "Error!"}</div>        
    );
};

export default ErrorIndicator;