import React, { Component } from 'react';
import './login.css'
import JoblyApi from '../../utils/JoblyApi';

class Login extends Component {
  state = {
    showLogin: true,
    loginForm: {
      username: '',
      password: '',
      errors: []
    },
    signUpForm: {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: ''
    }
  }

  handleChangeLogin = (evt) => {

    let loginForm = { ...this.state.loginForm }
    loginForm[evt.target.name] = evt.target.value
    this.setState({ loginForm })
  }

  handleChangeSignup = (evt) => {

    let signUpForm = { ...this.state.signUpForm }
    signUpForm[evt.target.name] = evt.target.value
    this.setState({ signUpForm })
  }

  handleLoginSubmit = async (evt) => {

    const { loginForm } = this.state
    const { username, password } = loginForm
    const { login } = this.props

    evt.preventDefault()

    //Hit api end point to authenicate user
    //if authenticated then history push to /jobs
    try {
      let user = await JoblyApi.request('login', { username, password }, 'post')
      let token = user.token

      if (token) {
        //add to local storage
        localStorage.setItem('_token', token)

        //get curruser obj and set router level state
        let currUser = await JoblyApi.request(`users/${username}`, { _token: token }, 'get');
        login(currUser.user)

        //redirect to jobs
        this.props.history.push("/jobs");

      }



    } catch (errors) {

      //flash error messages
      let loginForm = { ...this.state.loginForm, errors }
      this.setState({ loginForm })
    }



  }

  _toggleLogin = () => {

    this.setState({ showLogin: true })
  }
  _toggleSignUp = () => {
    this.setState({ showLogin: false })
  }

  _renderLogin() {

    const { loginForm } = this.state
    const { username, password, errors } = loginForm

    return (
      <div className="pt-5" >
        <div className="Login">
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="d-flex justify-content-end">
              <div className="btn-group">
                <button onClick={this._toggleLogin} className="btn btn-primary active">Login</button>
                <button onClick={this._toggleSignUp} className="btn btn-primary">Sign up</button>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleLoginSubmit}>
                  <div className="form-group">
                    <label>Username</label>
                    <input onChange={this.handleChangeLogin} name="username" className="form-control" value={username} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input onChange={this.handleChangeLogin} type="password" name="password" className="form-control" value={password} />
                  </div>
                  {errors.length > 0 ? errors.map(err => <div key={err} className="alert alert-danger" role="alert"><p className="mb-0 small">{err}</p></div>) : null}
                  <button type="submit" className="btn btn-primary float-right">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _renderSignUp() {

    const { signUpForm } = this.state
    const { username, password, firstname, lastname, email } = signUpForm

    return (
      <div className="pt-5">
        <div className="Login">
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="d-flex justify-content-end">
              <div className="btn-group">
                <button onClick={this._toggleLogin} className="btn btn-primary">Login</button>
                <button onClick={this._toggleSignUp} className="btn btn-primary active">Sign up</button>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Username</label>
                    <input onChange={this.handleChangeSignup} name="username" className="form-control" value={username} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input onChange={this.handleChangeSignup} type="password" name="password" className="form-control" value={password} />
                  </div>
                  <div className="form-group">
                    <label>First name</label>
                    <input onChange={this.handleChangeSignup} type="text" name="firstname" className="form-control" value={firstname} />
                  </div>
                  <div className="form-group">
                    <label>Last name</label>
                    <input onChange={this.handleChangeSignup} type="text" name="lastname" className="form-control" value={lastname} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input onChange={this.handleChangeSignup} type="email" name="email" className="form-control" value={email} />
                  </div>
                  <button type="submit" className="btn btn-primary float-right">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {

    const { showLogin } = this.state
    return (
      showLogin ? this._renderLogin() : this._renderSignUp()
    )
  }
}





export default Login;