export default class CompanyService {

  getCompaniesFromGitHub = async () => {    
    const res = await fetch(`https://raw.githubusercontent.com/sashakever/spacex-cargo-planner/main/src/services/shipments.json`);

    if (!res.ok) {
      throw new Error(`Could not fetch data!`)
    }
    return await res.json();
  };

}