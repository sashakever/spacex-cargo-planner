import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { getCompanyById } from '../../actions'
import ErrorIndicator from '../error-indicator';

import './company-page.scss'

const CompanyPage = ({ currentCompany, getCompanyById }) => {
    
    let location = useLocation()//.pathname.split("/");
    //console.log(splitLocation);

    useEffect(() => {
        getCompanyById(location.state.id);
    }, [location.state.id]);

    let sum = 0;
    
    if (currentCompany)
    if (currentCompany.boxes){
        const boxes = currentCompany.boxes.split(',');
                
        if (boxes.length) {
            sum = boxes.reduce((a, b) => {
                return (parseFloat(a)) + (parseFloat(b));
            });
        } else {
            sum = 0;
        }
    }

    if (!currentCompany) return (
        <div className='company-page'>
            <ErrorIndicator error={new Error('Company not found. Choose another company.')} />
        </div>
    )
    
    let boxesBloc;
    if (currentCompany.boxes) {
        boxesBloc = (
            <div className='company-page__result'>
                <p>Number of required cargo boys: <span>{
                        isNaN (sum) ? 
                        <ErrorIndicator error={new Error('Data is incorrect!')} />
                        : Math.ceil(sum / 10)
                    }
                    </span></p>
                <div className='company-page__boxes'>
                    <p>Corgo boxes</p>
                    <div>{ currentCompany.boxes }</div>
                </div>
            </div>
        )
    } else {
        boxesBloc = (
            <div className='company-page__result'>
                <p>There is nothing to shipment!</p>
            </div>)
    }   
    
    return (
        <div className='company-page'>
            <h1 className='company-page__title'>{currentCompany.name}</h1>
            <div className='company-page__email'>
                <a href={`mailto:${currentCompany.email}`}>{currentCompany.email}</a>
            </div>
            {boxesBloc}
        </div>
    )
}

const mapStateToProps = ({ companyList: { currentCompany } }) => {
    return {currentCompany}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyById: (id) => dispatch(getCompanyById(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CompanyPage);