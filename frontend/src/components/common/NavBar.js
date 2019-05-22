import React, { Component, Link } from 'react';

class NavBar extends Component {
	state = {};
	render() {
		return (
			<nav className="Navigation navbar navbar-expand-md">
				<Link className="navbar-brand" href="/">
					Jobly
				</Link>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item mr-4">
						<Link className="nav-link" href="/companies">
							Companies
						</Link>
					</li>
					<li className="nav-item mr-4">
						<Link className="nav-link" href="/jobs">
							Jobs
						</Link>
					</li>
					<li className="nav-item mr-4">
						<Link className="nav-link" href="/profile">
							Profile
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" href="/">
							Log out
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
}

export default NavBar;
