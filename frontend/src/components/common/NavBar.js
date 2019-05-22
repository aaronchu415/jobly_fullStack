import React, { Component } from 'react';

class NavBar extends Component {
	state = {};
	render() {
		return (
			<nav class="Navigation navbar navbar-expand-md">
				<a class="navbar-brand" href="/">
					Jobly
				</a>
				<ul class="navbar-nav ml-auto">
					<li class="nav-item mr-4">
						<a class="nav-link" href="/companies">
							Companies
						</a>
					</li>
					<li class="nav-item mr-4">
						<a class="nav-link" href="/jobs">
							Jobs
						</a>
					</li>
					<li class="nav-item mr-4">
						<a class="nav-link" href="/profile">
							Profile
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/">
							Log out
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default NavBar;
