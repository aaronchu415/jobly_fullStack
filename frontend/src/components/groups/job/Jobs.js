import React, { Component } from 'react';
import JoblyApi from '../../../utils/JoblyApi';
import JobCard from './JobCard';
import Search from '../../common/Search';

class Jobs extends Component {
	state = {
		searchedJobs: []
	};
	async componentDidMount() {
		await this.handleSearch();
	}

	handleSearch = async (search = '') => {
		let res = await JoblyApi.request('jobs', { search }, 'get');
		let searchedJobs = this.isAppliedJobs(res.jobs);
		this.setState({ searchedJobs });
		return res;
	};

	handleApplyClick = async (id) => {
		// send post request to jobs/apply/jobId
		const { username } = this.props;
		const state = 'applied';
		await JoblyApi.request(`jobs/${id}/apply`, { username, state }, 'post');

		// to update state of parent
		await this.props.requestUserInfo();

		// setState to trigger applied button
		let searchedJobs = this.isAppliedJobs(this.state.searchedJobs);
		this.setState({ searchedJobs });
	};

	isAppliedJobs = (jobs) => {
		let idArr = this.props.appliedJobs.map((job) => job.id);
		jobs = jobs.map((job) => (idArr.includes(job.id) ? { ...job, isApplied: true } : { ...job, isApplied: false }));
		return jobs;
	};

	render() {
		const { searchedJobs } = this.state;
		return (
			<div className="view pt-5">
				<div className="col-md-8 offset-md-2">
					<Search submit={this.handleSearch} />
					<div className="CardList">
						{searchedJobs.map((job) => (
							<JobCard key={job.id} {...job} handleApplyClick={this.handleApplyClick} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Jobs;
