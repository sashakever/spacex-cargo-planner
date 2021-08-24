import React from 'react';
import { CompanyServiceConsumer } from '../company-service-context/';

const withCompanyService = () => (Wrapped) => {

    return (props) => {        
        return (
            <CompanyServiceConsumer>
            {
                (companyService) => {
                    return (<Wrapped {...props}
                        companyService={companyService}/>);
                }
            }
            </CompanyServiceConsumer>
    );
    }
};

export default withCompanyService;