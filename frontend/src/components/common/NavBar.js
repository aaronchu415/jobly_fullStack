import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
	state = {};
	render() {
		const isLoginNav = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item mr-4">
					<Link className="nav-link" to="/companies">
						Companies
					</Link>
				</li>
				<li className="nav-item mr-4">
					<Link className="nav-link" to="/jobs">
						Jobs
					</Link>
				</li>
				<li className="nav-item mr-4">
					<Link className="nav-link" to="/profile">
						Profile
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/">
						Log out
					</Link>
				</li>
			</ul>
		);
		const notLoginNav = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Log In
					</Link>
				</li>
			</ul>
		);
		return (
			<nav className="Navigation navbar navbar-expand-md">
				<Link className="navbar-brand" to="/">
					Jobly
				</Link>
				{this.props.isLogin ? isLoginNav : notLoginNav}
			</nav>
		);
	}
}

export default NavBar;
