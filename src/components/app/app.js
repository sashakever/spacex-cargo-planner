import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CompanyList from '../company-list';
import Header from '../header';

import { HomePage, CompanyPage } from '../pages';

import './app.scss'

const App = () => {
    return (
        <div className='app__wrapper'>
            <div className='app__header'>
                <Header/>
            </div>
            <div className='app__company-list'>
                <CompanyList/>
            </div>
            <div className='app__page'>
                <Switch>
                    <Route
                        path='/spacex-cargo-planner/company'
                        component={CompanyPage}                        
                    />
                    <Route
                        path='/spacex-cargo-planner'
                        component={HomePage}
                        
                    />
                </Switch>
            </div>
        </div>
    )
}

export default App;
