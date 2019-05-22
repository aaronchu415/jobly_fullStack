import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  state = {}
  render() {
    return (
      <div class="pt-5">
        <div class="Home">
          <div class="container text-center">
            <h1 class="mb-4 font-weight-bold">Jobly</h1>
            <p class="lead">All the jobs in one, convenient place.</p><a class="btn btn-primary font-weight-bold"
              href="/login">Log in</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;