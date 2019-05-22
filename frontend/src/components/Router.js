import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Companies from './groups/company/Companies';
import Jobs from './groups/job/Jobs';
import Login from './common/login';
import Profile from './groups/profile/Profile';
import Company from './groups/company/Company';
import Home from './groups/home/Home';


class Router extends Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/jobs" render={() => <Jobs />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route exact path="/companies" render={() => <Companies />} />
          <Route exact path="/companies/:handle" render={(routeP) => <Company {...routeP} />} />
          <Route exact path="/" render={() => <Home />} />
        </Switch>
      </BrowserRouter>);
  }
}

export default Router;