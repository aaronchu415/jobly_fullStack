import React, { Component, Fragment } from 'react';
import JoblyApi from '../../../utils/JoblyApi';


class Companies extends Component {
  state = {
    companies: []
  }

  async componentDidMount() {
    let companies = await JoblyApi.request('companies', {}, 'get')
    companies = companies.companies
    this.setState({ companies })
  }

  render() {

    const { companies } = this.state

    return (
      <Fragment>
        <h1>COMPANPIES PAGE</h1>
        {companies.map(comp => { return <p>{comp.name}</p> })}
      </Fragment>
    );
  }
}

export default Companies;