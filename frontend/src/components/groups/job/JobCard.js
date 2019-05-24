import React, { Component } from 'react';
import './JobCard.css';

class JobCard extends Component {
	state = {};
	handleApplyClick = () => {
			this.props.handleApplyClick(this.props.id)
	};
	render() {
		const { title, equity, salary, company_handle } = this.props;
		const logo_url = 'http://graphicsmount.com/wp-content/uploads/edd/2017/08/Job-Search-Logo-1-1180x843.jpg';
		
		const applyButton = (
			<button
				className="btn apply btn-danger font-weight-bold text-uppercase float-right"
				onClick={this.handleApplyClick}
				> Apply
			</button>
		)
		const appliedButton = (
			<button
				className="btn applied btn-danger font-weight-bold text-uppercase float-right" disabled={true}
				> Applied
			</button>
		)
		return (
			<div className="JobCard Card card">
				<div className="card-body">
					<h6 className="card-title d-flex justify-content-between">
						<span className="text-capitalize">{title}</span>
						<img className="JobCard-img img float-right" src={logo_url} alt="" />
					</h6>
					<div className="text-left">
						<div>Salary: {salary} </div> <div>Equity: {equity} </div> <div>Company: {company_handle} </div>
					</div>
					{this.props.isApplied ? appliedButton : applyButton}
				</div>
			</div>
		);
	}
}

JobCard.defaultProps = {
	title: '',
	equity: '',
	salary: '',
	company_handle: ''
};

export default JobCard;
