import {typesCompanies} from './types-for-actions';

const companyRequested = () => {
    return {
        type: typesCompanies.fetch_company_req,//'FETCH_COURSES_REQUEST'
    }
};

const companyLoaded = (newCourse) => {
    return {
        type: typesCompanies.fetch_company_suc,//'FETCH_COURSES_SUCCESS',
        payload: newCourse
    };
};

const companyError = (error) => {
    return {
        type: typesCompanies.fetch_courses_user_fail,//'FETCH_COURSES_FAILURE',
        payload: error
    };
};

const fetchCompanies = (companyService, dispatch) => () => {
    dispatch(companyRequested());
    companyService.getCompanies()
    .then((dataCourses) => dispatch(companyLoaded(dataCourses)))
    .catch((err) => dispatch(companyError(err)));
};

const getCompanyById = (id) => {
    return {
        type: typesCompanies.get_company_by_id,
        payload: id,
    }    
}

export {    
    fetchCompanies,
    companyError,
    companyLoaded,
    companyRequested,
    getCompanyById,
};