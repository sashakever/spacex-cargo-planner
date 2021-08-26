import React, { useEffect } from "react";
import { connect } from 'react-redux';
import CompanyItem from "../company-item";
import ErrorIndicator from "../error-indicator";
import withCompanyService from "../hoc";
import Spinner from '../spinner';
import { companyRequested, companyLoaded, companyError, addMessage } from '../../actions';
import { useIndexedDBStore } from "use-indexeddb";

import './company-list.scss';

const CompanyList = ({ companies }) => {

    return (
        <div className='company-list'>
            <ul className='company-list__items'>
                {companies.map((company) => {
                    return (
                        <li className='company-list__item' key={company.id}>
                            <CompanyItem id={ company.id }name={company.name} />
                        </li>
                    )
                })                
                }
            </ul>
        </div>
    )
}

const CompanyListContainer = ({ companies, searchText, onMessage, onRequsted, onLoaded, onError, loading, error } ) => {
    
    const { getAll } = useIndexedDBStore("companyList");

    useEffect(() => {
        onRequsted();
        getAll().then((dataCompanies) => {
            onLoaded(dataCompanies);
            if (!dataCompanies.length) {
                onMessage('There is no data about the companies in the local repository. Please download them from the internet.');
            } else {
                onMessage('You are working with a locally saved list of companies.');
            }
        }).catch((err) => onError(new Error('There is no data about the companies in the local repository. Please download them from the internet.')));        
    }, []);

    if (!companies) return;

    if (!companies.length) {
        //onMessage('There is no data about the companies in the local repository. Please download them from the internet.');
    }
    
    if (loading) return <Spinner />;

    if (error) return <ErrorIndicator error={ error }/>;

    let filteredCompanies;
    if (searchText !== "" && searchText !== null) {
    
    filteredCompanies = companies.filter((company) => {
        return company.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
    } else filteredCompanies = companies;
    
    return (
        <CompanyList companies={ filteredCompanies }/>
    )
}

const mapStateToProps = ({ companyList: { companies, searchText, loading, error } }) => {
    return { companies, searchText, loading, error}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequsted: () => dispatch(companyRequested()),
        onLoaded: (list) => dispatch(companyLoaded(list)),
        onError: () => dispatch(companyError()),
        onMessage: (m) => dispatch(addMessage(m)),
    }
}

export default withCompanyService()(connect(mapStateToProps, mapDispatchToProps)(CompanyListContainer));
