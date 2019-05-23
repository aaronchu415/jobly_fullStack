import React, { Component } from 'react';
import JoblyApi from '../../../utils/JoblyApi';
import JobCard from './JobCard';
import Search from '../../common/Search';

class Jobs extends Component {
	state = {
		username: "",
		searchedjJobs: [],
		
	};
	async componentDidMount() {
		await this.handleSearch();
	}

	handleSearch = async (search = '') => {
		let res = await JoblyApi.request('jobs', { search }, 'get');
		let searchedjJobs = this.isAppliedJobs(res.jobs);
		this.setState({ searchedjJobs });
		return res;
	};

	// componentDidUpdate() {
	// 	this.setState(this.props)
	// }
	handleApply = () => {
		// TODO: send post request ot jobs/apply/jobId
		// to update state of parent
		this.props.requestUserInfo()
	}
	isAppliedJobs = (jobs) => {
		jobs = jobs.map((job) => this.props.appliedJobs.filter(job) ? job['isApplied'] = true : job['isApplied'] = false);
		return jobs
	}

	render() {
		const { searchedjJobs } = this.state;
		return (
			<div className="pt-5">
				<div className="col-md-8 offset-md-2">
					<Search submit={this.handleSearch} />
					<div className="CardList">
						{/* TODO: isApplied if statement in  */}
						{searchedjJobs.map((job) => <JobCard key={job.id} {...job} handleApply={this.handleApply}/>)}

					</div>
				</div>
			</div>
		);
	}
}

export default Jobs;
