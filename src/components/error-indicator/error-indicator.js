import React from 'react';
import './error-indicator.scss';

const ErrorIndicator = ({error}) => {
    return (
        <div className='error-indicator'>{error ? error.message : "Error!"}</div>        
    );
};

export default ErrorIndicator;