import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry/error-boundry';
import CompanyService from './services/company-service';
import { CompanyServiceProvider } from './components/company-service-context';
import IndexedDBProvider from "use-indexeddb";

import './scss/index.scss';

import store from './store';

const idbConfig = {
  databaseName: "Company-DB",
  version: 1,
  stores: [
    {
      name: "companyList",
      id: { keyPath: "id", autoIncrement: true },
      indices: [
        { name: "id", keyPath: "id", options: { unique: false } },
        { name: "name", keyPath: "name" },
        { name: "email", keyPath: "email" },
        { name: "boxes", keyPath: "boxes" },
      ],
    },
  ],
};

const companyService = new CompanyService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <CompanyServiceProvider value={companyService}>
        <Router>
          <IndexedDBProvider config={idbConfig}>
            <App />
          </IndexedDBProvider>
        </Router>
      </CompanyServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);