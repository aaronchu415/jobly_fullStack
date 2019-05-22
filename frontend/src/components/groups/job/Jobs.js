import React, { Component } from 'react';
import JoblyApi from '../../../utils/JoblyApi';
import JobCard from './JobCard';
import Search from '../../common/Search';

class Jobs extends Component {
	state = {
    jobs: []
  };
  async componentDidMount() {
		await this.handleSearch();
  }

  handleSearch = async (search = '') => {
		let res = await JoblyApi.request('jobs', { search }, 'get');
		let jobs = res.jobs;
		this.setState({ jobs });
		return res;
  };
  
	render() {
		const { jobs } = this.state;    
		return (
			<div className="pt-5">
				<div className="col-md-8 offset-md-2">
					<Search submit={this.handleSearch} />
					<div className="CardList">
						{jobs.map((job) => <JobCard key={job.id} {...job} />)}
					</div>
				</div>
			</div>
		);
	}
}

export default Jobs;
