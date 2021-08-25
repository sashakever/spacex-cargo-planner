import {typesCompanies} from './types-for-actions';

const companyRequested = () => {
    return {
        type: typesCompanies.fetch_company_req,//'FETCH_COURSES_REQUEST'
    }
};

const companyLoaded = (newCompany) => {
    return {
        type: typesCompanies.fetch_company_suc,//'FETCH_COURSES_SUCCESS',
        payload: newCompany
    };
};

const companyError = (error) => {
    return {
        type: typesCompanies.fetch_courses_user_fail,//'FETCH_COURSES_FAILURE',
        payload: error
    };
};

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

const fetchCompanies = (companyService, dispatch) => () => {
    dispatch(companyRequested());
    //try {
    companyService.getCompanies()
    .then((dataCompanies) => dispatch(companyLoaded(dataCompanies)))
    .catch((err) => dispatch(companyError(err)));
    //} catch(err) {
        //dispatch(companyError(err));
    //}
};

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

const saveCompanyList = (companiesList, companyService, dispatch) => () =>  {
    //dispatch(companyRequested());
    //console.log(companiesList);
    companyService.saveCompanyList(companiesList);
}

export {    
    fetchCompanies,
    companyError,
    companyLoaded,
    companyRequested,
    getCompanyById,
    filterCompanyByName,
    fetchCompaniesFromGitHub,
    saveCompanyList,
    deleteCompany,
    changeCompany,
};