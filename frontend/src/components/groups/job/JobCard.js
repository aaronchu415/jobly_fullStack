import React, { Component } from 'react';

class Jobs extends Component {
	state = {};
	render() {
		return (
			<div class="Card card">
				<div class="card-body">
					<h6 class="card-title d-flex justify-content-between">
						<span class="text-capitalize">Editor, magazine features</span>
					</h6>
					<div>Salary: 118000 </div> <div>Equity: 0.15 </div>{' '}
					<button class="btn btn-danger font-weight-bold text-uppercase float-right">Apply </button>{' '}
				</div>{' '}
			</div>
		);
	}
}

export default Jobs;
