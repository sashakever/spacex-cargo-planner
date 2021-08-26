import React from 'react';
import { Link } from 'react-router-dom';

import './company-item.scss';

const CompanyItem = ({ id, name }) => {
    
    return (
        <div className='company-item'>
            <Link to={{ pathname: `/spacex-cargo-planner/company/${id}`, state: { id: id } }}>{ name }</Link>
        </div>
    )
}

export default CompanyItem;