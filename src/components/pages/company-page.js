import React, {useEffect} from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { getCompanyById, deleteCompany, changeCompany } from '../../actions'
import ErrorIndicator from '../error-indicator';
import sortArray from 'sort-array';

import './company-page.scss'

const CompanyPage = ({ currentCompany, getCompanyById, onDeleteCompany, onChangeCompany }) => {
    
    let location = useLocation()
    let history = useHistory();
    let message = '';    

    let id;
    if (!location.state) {
        id = location.pathname.split("/")[2];
    } else {
        id = location.state.id;
    }
    useEffect(() => {
        getCompanyById(id);
    }, [id,currentCompany]);    

    let count = 0;
    
    if (currentCompany)
        if (currentCompany.boxes) {
            const boxes = currentCompany.boxes.split(',').map(Number);
            
            for (let i = 0; i < boxes.length; i++) { 
                if (isNaN(boxes[i])) {
                    message = 'Data is incorrect!';
                    break;
                }
                if (boxes[i] > 10) {
                    message = 'Each Starship cargo bay can hold up to 10 units.';
                    break;
                }
            }

            sortArray(boxes, { order: 'desc' });
                
            while (boxes.length > 0) {
                let tmpSum = parseFloat(boxes[0]);
                if (isNaN(tmpSum)) {
                    count = NaN;
                    break;
                }
                let isDel = false;
                for (let i = 1; i < boxes.length; i++) {
                    if (tmpSum + parseFloat(boxes[i]) <= 10) {
                        tmpSum += parseFloat(boxes[i]);
                    } else {
                        isDel = true;
                        boxes.splice(0, i);
                        break;
                    }
                }
                count++;
                if (!isDel && tmpSum <= 10) break;
                if (count > 20) break;             
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
                        message ? '-' : count
                    }
                    </span></p>
                <div className='company-page__boxes'>
                    <p>Corgo boxes</p>
                    <input                    
                        value={currentCompany.boxes}
                        onChange={(e) => {
                            onChangeCompany({
                                ...currentCompany,
                                boxes: e.target.value,
                            })
                        }}
                        placeholder='Enter cargo boxes' />                    
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
            <div className='company-page__button'>
                <button
                    onClick={() => {
                        onDeleteCompany(currentCompany);
                        history.push('/spacex-cargo-planner/');
                    }}>Delete Company</button>
                {
                    message ? 
                <ErrorIndicator error={new Error(message)} /> : ''
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({ companyList: { currentCompany } }) => {
    return {currentCompany}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyById: (id) => dispatch(getCompanyById(id)),
        onDeleteCompany: (company) => dispatch(deleteCompany(company)),
        onChangeCompany: (company) => dispatch(changeCompany(company)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CompanyPage);