import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {

  __renderLoginButton = () => {
    return <Link className="btn btn-primary font-weight-bold"
      to="/login">Log in</Link>
  }

  __renderWelcomeBack = () => {
    return <h2>Welcome Back {this.props.username}!</h2>
  }

  render() {

    const { isLogin } = this.props

    return (
      <div className="pt-5">
        <div className="Home">
          <div className="container text-center">
            <h1 className="mb-4 font-weight-bold">Jobly</h1>
            <p className="lead">All the jobs in one, convenient place.</p>
            {isLogin ? this.__renderWelcomeBack() : this.__renderLoginButton()}
          </div>
        </div>
      </div>
    );
  }
}

Home.defaultProps = {
  isLogin: false
}

export default Home;