import React, { Component } from 'react';

class Search extends Component {
	state = {};
	render() {
		return (
			<div class="Search mb-4">
				<form class="form-inline">
					<input
						class="form-control form-control-lg flex-grow-1"
						name="search"
						placeholder="Enter search term.."
						value=""
					/>
					<button type="submit" class="btn btn-lg btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Search;
