import React, { Component, Fragment } from 'react';
import JoblyApi from '../../../utils/JoblyApi';
import './Companies.css';
import CompanyCard from './CompanyCard';
import Search from '../../common/Search';

class Companies extends Component {
  state = {
    companies: []
  };

  async componentDidMount() {
    await this.handleSearch();
  }

  handleSearch = async (search = '') => {
    let res = await JoblyApi.request('companies', { search }, 'get');
    let companies = res.companies;
    this.setState({ companies });
    return res;
  };

  render() {
    const { companies } = this.state;

    const CardList = (
      <div className="CardList">
        {companies.map((comp) => <CompanyCard key={comp.handle} {...comp} />)}
      </div>
    );

    const noResult = (
      <p class="lead">Sorry, no results were found!</p>
    );

    return (
      <div className="pt-5">
        <div className="col-md-8 offset-md-2">
          <Search submit={this.handleSearch} />
          {companies.length > 0
            ? CardList
            : noResult
          }
        </div>
      </div>
    );
  }
}

export default Companies;
