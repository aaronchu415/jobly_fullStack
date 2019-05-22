import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CompanyCard extends Component {
	state = {};
	render() {
		const { handle, name, description, logo_url } = this.props.data;
		return (
			<Link class="CompanyCard Card card" href={`/companies/${handle}`}>
				<div class="card-body">
					<h6 class="card-title d-flex justify-content-between">
						<span class="text-capitalize">{name}</span>
						<img src={`${logo_url}`} alt={`${name} Logo`} />
					</h6>
					<p>{description}</p>
				</div>
			</Link>
		);
	}
}

export default CompanyCard;
