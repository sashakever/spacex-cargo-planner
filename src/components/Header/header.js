import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCompanyByName } from '../../actions/';
import withCompanyService from "../hoc";
import { fetchCompaniesFromGitHub } from '../../actions';

import './header.scss';

const Header = ({ searchText, onFilterCompany, onFathCompanies }) => {
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
                    onClick={onFathCompanies}
                >Load</button>
                <button>Save</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ companyList: { searchText } }) => {
    return {searchText}
}

const mapDispatchToProps = (dispatch, { companyService }) => {
    return {
        onFilterCompany: (text) => dispatch(filterCompanyByName(text)),
        onFathCompanies: fetchCompaniesFromGitHub(companyService, dispatch,),
    }
}

export default withCompanyService()(connect(mapStateToProps, mapDispatchToProps)(Header));