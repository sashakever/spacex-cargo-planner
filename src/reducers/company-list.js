import { typesCompanies } from '../actions/types-for-actions';

const updateCompanyList = (state, action) => {

    if (state === undefined) {
        return {
            companies: [],
            currentCompany: null,
            searchText: '',
            loading: true,
            error: null,
            message: 'You are working with a locally saved list of companies.',
        };
    }


    switch (action.type) {
        case typesCompanies.fetch_courses_user_req:
            return {
                companies: [],
                currentCompany: null,
                searchText: '',
                loading: true,
                error: null,
                message: state.companyList.message,
            };

        case typesCompanies.fetch_company_suc:
            return {
                companies: action.payload,
                currentCompany: null,
                searchText: '',
                loading: false,
                error: null,
                message: state.companyList.message,
            };

        case typesCompanies.fetch_courses_user_fail:
            return {
                companies: [],
                currentCompany: null,
                searchText: '',
                loading: false,
                error: action.payload,
                message: state.companyList.message,
            };
        case typesCompanies.add_message:
            return {
                companies: state.companyList.companies,
                currentCompany: state.companyList.currentCompany,
                searchText: '',
                loading: false,
                error: null,
                message: action.payload,
            };
        case typesCompanies.delete_company:
            const list = state.companyList.companies;
            const indexCompany = list.findIndex(({id}) => id === action.payload.id);
            return {
                companies: [...list.slice(0, indexCompany), ...list.slice(indexCompany + 1)],
                currentCompany: null,
                searchText: '',
                loading: false,
                error: null,
                message: state.companyList.message,
            }
        case typesCompanies.change_company:
            const listChange = state.companyList.companies;
            const indexChange = listChange.findIndex(({ id }) => id === action.payload.id);
            return {
                companies: [...listChange.slice(0, indexChange), action.payload, ...listChange.slice(indexChange + 1)],
                currentCompany: action.payload,
                searchText: '',
                loading: false,
                error: null,
                message: state.companyList.message,
            }
        case typesCompanies.get_company_by_id:
            const array = [ ...state.companyList.companies ];
            const companyId = array.filter((company) => {
                return company.id === action.payload
            });
            return {
                companies: array,
                currentCompany: companyId ? companyId[0] : null,
                searchText: state.companyList.searchText,
                loading: false,
                error: null,
                message: state.companyList.message,
            }
        case typesCompanies.filter_company_by_name:
            return {
                companies: state.companyList.companies,
                currentCompany: state.companyList.currentCompany,
                searchText: action.payload,
                loading: false,
                error: null,
                message: state.companyList.message,
            }
        default:
            return state.companyList;
    }
};

export default updateCompanyList;