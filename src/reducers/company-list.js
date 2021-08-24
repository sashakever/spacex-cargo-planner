import { typesCompanies } from '../actions/types-for-actions';

const updateCompanyList = (state, action) => {

    if (state === undefined) {
        return {
            companies: [],
            currentCompany:null,
            loading: true,
            error: null
        };
    }


    switch (action.type) {
        case typesCompanies.fetch_courses_user_req:
        return {
            companies: [],
            currentCompany:null,
            loading: true,
            error: null
        };

        case typesCompanies.fetch_company_suc:
        return {
            companies: action.payload,
            currentCompany:null,
            loading: false,
            error: null
        };

        case typesCompanies.fetch_courses_user_fail:
        return {
            companies: [],
            currentCompany:null,
            loading: false,
            error: action.payload
        };
        case typesCompanies.get_company_by_id:
            const array = [ ...state.companyList.companies ];
            const company = array.filter((company) => {
                return company.id === action.payload
            });
            //debugger
        return {
            companies: array,
            currentCompany: company ? company[0] : null,
            loading: false,
            error: null
        }
        default:
            return state.companyList;
    }
};

export default updateCompanyList;