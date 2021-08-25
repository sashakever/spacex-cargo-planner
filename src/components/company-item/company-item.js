import React from 'react';
import { Link } from 'react-router-dom';
//import { useHistory } from "react-router-dom";

import './company-item.scss';

const CompanyItem = ({ id, name }) => {
    //let history = useHistory();    
    
    return (
        <div className='company-item'>
            <Link to={{ pathname: `/company/${name.toLowerCase().replace(/\s/g, '-')}-${id}`, state: { id: id } }}>{ name }</Link>
        </div>
    )
}

export default CompanyItem;