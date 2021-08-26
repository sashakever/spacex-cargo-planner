import { typesCompanies } from './types-for-actions';

const companyRequested = () => {
    return {
        type: typesCompanies.fetch_company_req,
    }
};

const companyLoaded = (newCompany) => {
    return {
        type: typesCompanies.fetch_company_suc,
        payload: newCompany
    };
};

const companyError = (error) => {
    return {
        type: typesCompanies.fetch_courses_user_fail,
        payload: error
    };
};

const addMessage = (message) => {
    return {
        type: typesCompanies.add_message,
        payload: message
    };
}

const deleteCompany = (company) => {
    return {
        type: typesCompanies.delete_company,
        payload: company,
    }
}

const changeCompany = (company) => {
    return {
        type: typesCompanies.change_company,
        payload: company,
    }
}

const getCompanyById = (id) => {
    return {
        type: typesCompanies.get_company_by_id,
        payload: id,
    }    
}

const filterCompanyByName = (name) => {    
    return {
        type: typesCompanies.filter_company_by_name,
        payload: name,
    }    
}

const fetchCompaniesFromGitHub = (companyService, dispatch) => () => {
    dispatch(companyRequested());
    companyService.getCompaniesFromGitHub()
    .then((dataCompanies) => dispatch(companyLoaded(dataCompanies)))
    .catch((err) => dispatch(companyError(err)));
};

export {    
    companyError,
    companyLoaded,
    companyRequested,
    getCompanyById,
    filterCompanyByName,
    fetchCompaniesFromGitHub,    
    deleteCompany,
    changeCompany,
    addMessage,
};