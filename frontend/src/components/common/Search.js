import React, { Component } from 'react';

class Search extends Component {
	state = {
		search: ''
	};

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value })
	}

	handleSubmit = (e) => {
		const { search } = this.state
		e.preventDefault();
		this.props.submit(search);
		this.setState({ search: '' })
	}

	render() {
		const { search } = this.state

		return (
			<div className="Search mb-4">
				<form className="form-inline" onSubmit={this.handleSubmit}>
					<input
						className="form-control form-control-lg flex-grow-1"
						name="search"
						placeholder="Enter search term.."
						value={search}
						onChange={this.handleChange}
					/>
					<button type="submit" className="btn btn-lg btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Search;
