import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
	state = {};

	handleLogout = () => {
		// state will reset on Router
		localStorage.removeItem('_token');
		this.props.handleLogout()
	}

	render() {
		// display different NavBar for login || logout user
		const isLoginNav = (
			<ul className="navbar-nav ml-auto flex-row">
				<li className="nav-item mr-4">
					<NavLink className="nav-link" activeClassName="active" exact to="/companies">
						Companies
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" activeClassName="active" exact to="/jobs">
						Jobs
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" activeClassName="active" exact to="/profile">
						Profile
					</NavLink>
				</li>
				<li className="nav-item mr-4">
					<NavLink className="nav-link" activeClassName="active" exact to="/chat">
						Chat
					</NavLink>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/" onClick={this.handleLogout}>
						Log out
					</Link>
				</li>
			</ul>
		);
		const notLoginNav = (
			<ul className="navbar-nav ml-auto flex-row">
				<li className="nav-item">
					<NavLink className="nav-link" activeClassName="active" exact to="/login">
						Log In
					</NavLink>
				</li>
			</ul>
		);
		return (
			<nav className="Navigation navbar navbar-expand-md">
				<NavLink className="navbar-brand" activeClassName="active" exact to="/">
					Jobly
				</NavLink>
				{this.props.isLogin ? isLoginNav : notLoginNav}
			</nav>
		);
	}
}

NavBar.defaultProps = {
	isLogin: false
}

export default NavBar;
