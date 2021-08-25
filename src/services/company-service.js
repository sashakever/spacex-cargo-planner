import { openDB, deleteDB, wrap, unwrap } from 'idb';
let db;
export default class CompanyService {

  dataCompanies = [
    {
      "id": "d3d7218aeca",
      "name": "Tyson Foods",
      "email": "contact@tysonfoods.com",
      "boxes": "0.3,0.7,3.6,0.9,4.4,dfjh,dfgyj"
    },
    {
      "id": "50d4a8",
      "name": "Oracle",
      "email": "contact@oracle.com",
      "boxes": "0.5,1.1,8,0.3,6,9.9"
    },
    {
      "id": "6067c0e9f",
      "name": "Allstate",
      "email": "contact@allstate.com",
      "boxes": "5.5,0.1,3.4,5.4,8.2"
    },
    {
      "id": "11655eeb3700e1c",
      "name": "World Fuel Services",
      "email": "contact@worldfuelservices.com",
      "boxes": "2,5.9,9.5,9.4,2.4,0.3,8.3,5,6.5,3.6"
    },
    {
      "id": "01e96bb2196",
      "name": "Massachusetts Mutual Life Insurance",
      "email": "contact@massachusettsmutuallifeinsurance.com",
      "boxes": "5.9,6.2,5,7,8.2,10,9.7,8.8,8.7"
    },
    {
      "id": "8e86598a",
      "name": "TJX",
      "email": "contact@tjx.com",
      "boxes": null
    },
  ];

  getCompanies() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.dataCompanies);        
      }, 500);
    });
  }


  /*getCompanies = async () => {
    //console.log('getCompanies');
    try {
      db = await openDB('companyListDB', 1,
        db => {
          db.createObjectStore('companyList',
            { keyPath: 'name' });
        });
      let trans = db.transaction('companyList');
      let companyStore = trans.objectStore('companyList');
      let companies = await companyStore.getAll();
      //console.log('getCompanies',companies);
      //debugger
      if (!companies.length) {
        return new Error(`There is no list of companies in local storage!`)
      }
    
      return companies;
    } catch (e) {
      return new Error(`There is no list of companies in local storage!`)
    }
  }*/

  saveCompanyList = async (companyList) => {
    try {      
      let trans = db.transaction('companyList');
      await trans.objectStore('companyList').clear();
      trans = db.transaction('companyList', 'readwrite');
      //await tra
      companyList.forEach((company) => {
        trans.objectStore('companyList').add(company);
      })
    } catch(err) {}
  }

  /*getCompaniesFromGitHub = () => {
    return new Promise((resolve, reject) => {
      const res = fetch(`https://raw.githubusercontent.com/sashakever/spacex-cargo-planner/main/src/services/shipments.json`);
      resolve(res.json());
      reject(new Error(`Could not fetch data!`));
    });
  };*/

  getCompaniesFromGitHub = async () => {    
    const res = await fetch(`https://raw.githubusercontent.com/sashakever/spacex-cargo-planner/main/src/services/shipments.json`);

    if (!res.ok) {
      throw new Error(`Could not fetch data!`)
    }
    return await res.json();
  };
  
  /*getLocalDate = () => {
    let transaction = db.transaction([STORE], IDBTransaction.READ_WRITE); 
    let objstore = transaction.objectStore(STORE);
    for (i = 0; i < data.length; i++) { 
        objstore.put(data[i]);
    } 
  }*/
}

/*dataCompanies = [
    {
      "id": "d3d7218aeca",
      "name": "Tyson Foods",
      "email": "contact@tysonfoods.com",
      "boxes": "0.3,0.7,3.6,0.9,4.4,dfjh,dfgyj"
    },
    {
      "id": "50d4a8",
      "name": "Oracle",
      "email": "contact@oracle.com",
      "boxes": "0.5,1.1,8,0.3,6,9.9"
    },
    {
      "id": "6067c0e9f",
      "name": "Allstate",
      "email": "contact@allstate.com",
      "boxes": "5.5,0.1,3.4,5.4,8.2"
    },
    {
      "id": "11655eeb3700e1c",
      "name": "World Fuel Services",
      "email": "contact@worldfuelservices.com",
      "boxes": "2,5.9,9.5,9.4,2.4,0.3,8.3,5,6.5,3.6"
    },
    {
      "id": "01e96bb2196",
      "name": "Massachusetts Mutual Life Insurance",
      "email": "contact@massachusettsmutuallifeinsurance.com",
      "boxes": "5.9,6.2,5,7,8.2,10,9.7,8.8,8.7"
    },
    {
      "id": "8e86598a",
      "name": "TJX",
      "email": "contact@tjx.com",
      "boxes": null
    },
  ];   */