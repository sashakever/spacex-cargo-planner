import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCompanyByName } from '../../actions/';
import withCompanyService from "../hoc";
import { fetchCompaniesFromGitHub, addMessage } from '../../actions';
import { useIndexedDBStore } from "use-indexeddb";

import './header.scss';

const Header = ({ companies, onFilterCompany, onFethCompanies, message, onMessage }) => {

    const { deleteAll } = useIndexedDBStore("companyList");
    const { add } = useIndexedDBStore("companyList");

    const saveCompanies = () => {
        console.log('delete')
        deleteAll().then(console.log).catch(console.error);
        console.log('delete')
        for (let i = 0; i < companies.length; i++) {
            add(companies[i]).then(console.log).catch(console.error);
        }
        onMessage('You are working with a locally saved list of companies.');
    }
    
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
                    onClick={() => {
                        onFethCompanies();
                        onMessage('You are working with a list of companies downloaded from the internet. To save the changes, click the save button.');
                        }
                    }
                >Load</button>
                <button
                    onClick={saveCompanies}
                >Save</button>
            </div>
            <div className='header__message'>{ message }</div>
        </div>
    )
}

const mapStateToProps = ({ companyList: { companies, message } }) => {
    return {companies, message}
}

const mapDispatchToProps = (dispatch, { companyService }) => {
    return {
        onFilterCompany: (text) => dispatch(filterCompanyByName(text)),
        onFethCompanies: fetchCompaniesFromGitHub(companyService, dispatch),
        onMessage: (m) => dispatch(addMessage(m)),
    }
}

export default withCompanyService()(connect(mapStateToProps, mapDispatchToProps)(Header));