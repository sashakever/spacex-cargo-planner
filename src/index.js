import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry/error-boundry';
import CompanyService from './services/company-service';
import { CompanyServiceProvider } from './components/company-service-context';

import './scss/index.scss';

import store from './store';

const companyService = new CompanyService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <CompanyServiceProvider value={companyService}>
        <Router>
          <App />
        </Router>
      </CompanyServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);