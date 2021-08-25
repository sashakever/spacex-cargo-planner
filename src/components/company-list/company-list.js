import React, { Component } from "react";
import { connect } from 'react-redux';
import CompanyItem from "../company-item";
import ErrorIndicator from "../error-indicator";
import withCompanyService from "../hoc";
import Spinner from '../spinner';
import { fetchCompanies, fetchCompaniesFromGitHub } from '../../actions';

import './company-list.scss';

const CompanyList = ({ companies }) => {
    //debugger
    
    return (
        <div className='company-list'>
            <ul className='company-list__items'>
                {companies.map((company) => {
                    //console.log(company);
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

class CompanyListContainer extends Component {

    componentDidMount() {        
        this.props.fetchCompanies();        
    }

    render() {
        const { companies, searchText, loading, error } = this.props;

        if (loading) return <Spinner />;

        if (error || !companies.length) return <ErrorIndicator error={ error }/>;

        let filteredCompanies;
        if (searchText !== "" && searchText !== null) {
            //
            filteredCompanies = companies.filter((company) => {
                return company.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            });
        } else filteredCompanies = companies;

        return <CompanyList companies={ filteredCompanies }/>
    }
}

const mapStateToProps = ({ companyList: { companies, searchText, loading, error } }) => {
    return { companies, searchText, loading, error}
}

const mapDispatchToProps = (dispatch, { companyService }) => {
    return {
        fetchCompanies: fetchCompanies(companyService, dispatch)
    }
}

export default withCompanyService()(connect(mapStateToProps,mapDispatchToProps)(CompanyListContainer));