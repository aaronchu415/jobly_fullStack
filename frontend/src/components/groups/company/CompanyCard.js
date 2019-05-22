import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CompanyCard extends Component {
	state = {};
	render() {
		const { handle, name, description } = this.props;

		const logo_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmE7-UV09CWq_ba12nUvj-0I1_wwWcOnUa0ALmzdTF03Emt1A'

		return (
			<Link className="CompanyCard Card card" to={`/companies/${handle}`}>
				<div className="card-body">
					<h6 className="card-title d-flex justify-content-between">
						<span className="text-capitalize">{name}</span>
						<img src={`${logo_url}`} alt={`${name} Logo`} />
					</h6>
					<p>{description}</p>
				</div>
			</Link>
		);
	}
}

CompanyCard.defaultProps = {
	logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmE7-UV09CWq_ba12nUvj-0I1_wwWcOnUa0ALmzdTF03Emt1A',
	handle: '',
	name: '',
	description: '',
}

export default CompanyCard;
