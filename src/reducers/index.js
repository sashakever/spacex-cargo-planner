import updateCompanyList from './company-list';

const reducer = (state, action) => {
    return {
        companyList: updateCompanyList(state, action),   
    };
};

export default reducer;