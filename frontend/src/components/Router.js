import React, { Component, ReactFragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Companies from './groups/company/Companies';
import Jobs from './groups/job/Jobs';
import Login from './common/login';
import Profile from './groups/profile/Profile';
import Company from './groups/company/Company';
import Home from './groups/home/Home';
import NavBar from './common/NavBar';
import JoblyApi from '../utils/JoblyApi';

const jwt = require('jsonwebtoken');

class Router extends Component {
	state = {
		currUser: null
	};

	async componentDidMount() {
		localStorage.setItem(
			'_token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NTg1NTg5MzJ9.N-Si5GCaVo4yM-bOZczkcksvEcEOxpxytTqQiJhyX3g'
		);

		let token = localStorage.getItem('_token');
		if (token) {
			//get username from token

			try {
				let username = jwt.decode(token).username;
				let currUser = await JoblyApi.request(`users/${username}`, { _token: token }, 'get');
				this.setState({ currUser });
			} catch (e) {}
		}
	}
	handleLogout = () => {
		this.setState({ currUser: null });
	};

	render() {
		const { currUser } = this.state;

		//if user is authenticated
		if (currUser) {
			return (
				<BrowserRouter>
					<NavBar isLogin={true} handleLogout={this.handleLogout} />
					<Switch>
						<Route exact path="/jobs" render={() => <Jobs />} />
						<Route exact path="/login" render={() => <Login />} />
						<Route exact path="/profile" render={() => <Profile />} />
						<Route exact path="/companies" render={() => <Companies />} />
						<Route exact path="/companies/:handle" render={(routeP) => <Company {...routeP} />} />
						<Route exact path="/" render={() => <Home isLogin={true} />} />
					</Switch>
				</BrowserRouter>
			);
		}

		//else user not authenticated
		return (
			<BrowserRouter>
				<NavBar isLogin={false} />
				<Switch>
					<Route exact path="/login" render={() => <Login />} />
					<Route exact path="/" render={() => <Home isLogin={false} />} />
					<Redirect to="/" />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
