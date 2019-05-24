import React, { Component } from 'react';
import JoblyApi from '../../../utils/JoblyApi';
import JobCard from '../job/JobCard';
import Search from '../../common/Search';

class Company extends Component {
	state = {
    description: "",
    handle: "",
    jobs: [],
    logo_url: "",
    name: "",
    num_employees: 0,
	};
	async componentDidMount() {
		await this.requestCompanyInfo();
	}
  requestCompanyInfo = async () => {
    const {handle} = this.props.match.params
    let res = await JoblyApi.getCompany(handle);
    this.setState({...res})
    console.log(this.state);   
  }

	// handleSearch = async (search = '') => {
  //   // TODO: filter get by company handle
	// 	let res = await JoblyApi.request('jobs', { search }, 'get');
	// 	let searchedJobs = this.isAppliedJobs(res.jobs);
	// 	this.setState({ searchedJobs });
	// 	return res;
	// };

	handleApplyClick = async (id) => {
		// send post request to jobs/apply/jobId
		const { username } = this.props;
		const state = 'applied';
		await JoblyApi.request(`jobs/${id}/apply`, { username, state }, 'post');

		// to update state of parent
		await this.props.requestUserInfo();

		// setState to trigger applied button
		let jobs = this.isAppliedJobs(this.state.jobs);
		this.setState({ jobs });
	};

	isAppliedJobs = (jobs) => {
		let idArr = this.props.appliedJobs.map((job) => job.id);
		jobs = jobs.map((job) => (idArr.includes(job.id) ? { ...job, isApplied: true } : { ...job, isApplied: false }));
		return jobs;
	};

	render() {
		const { jobs, description, name, num_employees } = this.state;
		return (
			<div className="view pt-5">
				<div className="col-md-8 offset-md-2">
          <h1>{name}</h1>
          <div>{description}</div>
          <div>Employees: {num_employees}</div>
					{/* <Search submit={this.handleSearch} /> */}
					<div className="CardList">
						{jobs.map((job) => (
							<JobCard key={job.id} {...job} handleApplyClick={this.handleApplyClick} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

Company.defaultProps = {
	logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmE7-UV09CWq_ba12nUvj-0I1_wwWcOnUa0ALmzdTF03Emt1A',
	handle: '',
	name: '',
	description: '',
}

export default Company;
