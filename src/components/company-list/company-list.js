import React, { Component } from "react";
import { connect } from 'react-redux';
import CompanyItem from "../company-item";
import ErrorIndicator from "../error-indicator";
import withCompanyService from "../hoc";
import Spinner from '../spinner';
import { fetchCompanies } from '../../actions';

import './company-list.scss';

const CompanyList = ({ companies }) => {
    //debugger
    
    return (
        <ul>
            {companies.map((company) => {
                //console.log(company);
                return (
                    <li key={company.id}>
                        <CompanyItem id={ company.id }name={company.name} />
                    </li>
                )
            })                
            }
        </ul>
    )
}

class CompanyListContainer extends Component {

    componentDidMount() {        
        this.props.fetchCompanies();        
    }

    render() {
        const { companies, loading, error, searchText } = this.props;

        if (loading) return <Spinner />;

        if (error) return <ErrorIndicator />;

        return <CompanyList companies={ companies }/>
    }
}

const mapStateToProps = ({ companyList: { companies, loading, error } }) => {
    return { companies, loading, error}
}

const mapDispatchToProps = (dispatch, { companyService }) => {
    return {
        fetchCompanies: fetchCompanies(companyService, dispatch)
    }
}

export default withCompanyService()(connect(mapStateToProps,mapDispatchToProps)(CompanyListContainer));