import React, { Component, Fragment } from 'react';
import JoblyApi from '../../../utils/JoblyApi';
import './Companies.css'
import CompanyCard from './CompanyCard';
import Search from '../../common/Search';



class Companies extends Component {
  state = {
    companies: []
  }

  async componentDidMount() {
    let companies = await JoblyApi.request('companies', {}, 'get')
    companies = companies.companies
    this.setState({ companies })
  }

  handleSearch = (search) => {
    console.log(search)
  }

  render() {

    const { companies } = this.state

    /* <h1>COMPANPIES PAGE</h1>
        {companies.map(comp => { return <p>{comp.name}</p> })} */
    return (
      < div className="pt-5" >
        <div className="col-md-8 offset-md-2">
          <Search submit={this.handleSearch}></Search>
          <div className="CardList">
            {companies.map(comp => (<CompanyCard key={comp.handle} {...comp}></CompanyCard>))}
          </div>
        </div>
      </div >

    );
  }
}

export default Companies;