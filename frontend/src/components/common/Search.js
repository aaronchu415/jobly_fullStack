import React, { Component } from 'react';
import _ from 'lodash'

class Search extends Component {
	state = {
		search: ''
	};

	handleChange = (evt) => {
		const { search } = this.state
		this.setState({ [evt.target.name]: evt.target.value })
		this.handleSubmit(evt);

	}

	handleSubmit = _.debounce((e) => {
		const { search } = this.state
		// e.preventDefault();
		this.props.submit(search);
		// this.setState({ search: '' })
	}, 200)

	render() {
		const { search } = this.state



		return (
			<div className="Search mb-4">
				<form className="form-inline">
					<input
						className="form-control form-control-lg flex-grow-1"
						name="search"
						placeholder="Enter search term.."
						value={search}
						onChange={this.handleChange}
					/>
				</form>
			</div>
		);
	}
}

export default Search;
