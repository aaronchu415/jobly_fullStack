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
import ChatRoom from './groups/chat/ChatRoom';



const jwt = require('jsonwebtoken');

class Router extends Component {
	state = {
		currUser: null,
		isLoading: true
	};

	async componentDidMount() {
		await this.requestUserInfo();
		this.setState({ isLoading: false });
	}
	handleLogout = () => {
		this.setState({ currUser: null });
	};

	handleLogin = (currUser) => {
		this.setState({ currUser });
	};

	requestUserInfo = async () => {
		let token = localStorage.getItem('_token');
		if (token) {
			//get username from token
			try {
				let username = jwt.decode(token).username;
				let currUser = await JoblyApi.request(`users/${username}`, { _token: token }, 'get');
				currUser = currUser.user
				this.setState({ currUser });
			} catch (e) {
				this.setState({ isLoading: false });
			}
		}
	}

	handleProfileChange = (newUser) => {

		let newUserObj = { ...this.state.currUser, ...newUser }

		this.setState({ currUser: newUserObj });
	}

	render() {
		const { currUser, isLoading } = this.state;

		//if user is authenticated
		if (currUser && currUser.username && !(isLoading)) {
			return (
				<BrowserRouter>
					<NavBar isLogin={true} handleLogout={this.handleLogout} />
					<Switch>
						<Route exact path="/jobs" render={() => <Jobs username={currUser.username} appliedJobs={currUser.jobs} requestUserInfo={this.requestUserInfo} />} />
						<Route exact path="/profile" render={() => <Profile submit={this.handleProfileChange} {...currUser} />} />
						<Route exact path="/companies" render={() => <Companies />} />
						<Route exact path="/companies/:handle" render={(routeP) => <Company {...routeP} username={currUser.username} appliedJobs={currUser.jobs} requestUserInfo={this.requestUserInfo} />} />
						<Route exact path="/chat" render={() => <ChatRoom></ChatRoom>} />
						<Route exact path="/" render={() => <Home username={currUser.username} isLogin={true} />} />
						<Redirect to="/" />
					</Switch>
				</BrowserRouter>
			);
		}

		//else user not authenticated
		return (
			<BrowserRouter>
				<NavBar isLogin={false} />
				<Switch>
					<Route exact path="/login" render={(routeP) => <Login {...routeP} login={this.handleLogin} />} />
					<Route exact path="/" render={() => <Home isLogin={false} />} />
					{!(isLoading) ? <Redirect to="/" /> : null}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
