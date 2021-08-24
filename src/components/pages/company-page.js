import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { getCompanyById } from '../../actions'

import './company-page.scss'

const CompanyPage = ({ currentCompany, getCompanyById }) => {
    
    let location = useLocation()//.pathname.split("/");
    //console.log(splitLocation);

    useEffect(() => {
        getCompanyById(location.state.id);
    }, [location.state.id]);

    //console.log('CompanyPage',currentCompany);
    return (
        <div>Company Page { currentCompany ? currentCompany.name : '0'  } </div>
    )
}

const mapStateToProps = ({ companyList: { currentCompany } }) => {
    return {currentCompany}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyById: (id) => dispatch(getCompanyById(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CompanyPage);