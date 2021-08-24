
export default class CompanyService {

  dataCompanies = [
    {
      "id": "d3d7218aeca",
      "name": "Tyson Foods",
      "email": "contact@tysonfoods.com",
      "boxes": "0.3,0.7,3.6,0.9,4.4"
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
      "boxes": "0.1,1.3,5.1,2.4,8.4,1.8,7.9"
    },
  ];

  getCompanies() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.dataCompanies);        
      }, 500);
    });
  }
}