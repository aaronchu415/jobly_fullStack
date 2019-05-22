import React, { Component } from 'react';

class JobCard extends Component {
	state = {};
	handleApplyClick = () => {
		// TODO: pass handle apply click
		return;
	}
	render() {
		const { title, equity, salary, company_handle } = this.props;
		const logo_url = 'http://graphicsmount.com/wp-content/uploads/edd/2017/08/Job-Search-Logo-1-1180x843.jpg'
		return (
			<div className="Card card">
				<div className="card-body">
					<h6 className="card-title d-flex justify-content-between">
						<span className="text-capitalize">{title}</span>
					</h6>
					<div>Salary: {salary} </div> <div>Equity: {equity} </div> <div>Company: {company_handle} </div>
					<img src={logo_url} alt=""></img>
					<button className="btn btn-danger font-weight-bold text-uppercase float-right" onClick={this.handleApplyClick}>Apply </button>
				</div>
			</div>
		);
	}
}

JobCard.defaultProps = {
	title: "",
	equity: "",
	salary: "",
	company_handle: "",
}

export default JobCard;
