import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCompanyByName } from '../../actions/';
import withCompanyService from "../hoc";
import { fetchCompaniesFromGitHub, saveCompanyList } from '../../actions';

import './header.scss';

const Header = ({ companies, onFilterCompany, onFethCompanies, onSaveCompanyList }) => {
    //debugger
    return (
        <div className='header'>
            <div className='header__logo'>
                <Link to='/'>Cargo Planner</Link>                
            </div>
            <div className='header__search'>
                <input
                    //value={ searchText ? searchText : '' }
                    onChange={(e) => onFilterCompany(e.target.value)}
                    placeholder='Search' />
            </div>
            <div className='header__actions'>
                <button
                    onClick={onFethCompanies}
                >Load</button>
                <button
                    onClick={() => onSaveCompanyList(companies)}
                >Save</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ companyList: { companies } }) => {
    return {companies}
}

const mapDispatchToProps = (dispatch, { companyService }) => {
    return {
        onFilterCompany: (text) => dispatch(filterCompanyByName(text)),
        onFethCompanies: fetchCompaniesFromGitHub(companyService, dispatch,),
        onSaveCompanyList: (list) => saveCompanyList(list, companyService, dispatch),
    }
}

export default withCompanyService()(connect(mapStateToProps, mapDispatchToProps)(Header));