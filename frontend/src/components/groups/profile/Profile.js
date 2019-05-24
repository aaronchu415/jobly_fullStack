import React, { Component } from 'react';
import JoblyApi from '../../../utils/JoblyApi';
import validatePass from '../../../utils/validatePass';

class Profile extends Component {
  state = {
    username: this.props.username,
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    email: this.props.email,
    photo_url: this.props.photo_url || '',
    password: '',
    errors: [],
    success: false,
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = async (e) => {

    e.preventDefault();
    console.log(this.props)

    const { username, password: userEnterPass } = this.state

    if (!await validatePass(username, userEnterPass)) {
      this.setState({ errors: ['Invalid Credentials'], success: false })
      return
    }

    const data = { ...this.state }
    delete data.password
    delete data.username
    delete data.errors
    delete data.success

    try {

      let newUser = await JoblyApi.request(`users/${username}`, { ...data }, 'patch');
      console.log('newUser', newUser)

      this.setState({
        success: true,
        errors: []
      })

      this.props.submit(newUser.user);

    } catch (errors) {
      this.setState({ errors, success: false })
    }

  }

  render() {

    const { username, first_name, last_name, email, photo_url, password, errors, success } = this.state

    return (
      <div class="view text-left pt-5">
        <div class="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3 style={{ color: 'darkgray' }}>Edit Profile</h3>
          <div class="card">
            <div class="card-body">
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label>Username</label>
                  <p class="form-control-plaintext">{username}</p>
                </div>
                <div class="form-group">
                  <label>First Name</label>
                  <input onChange={this.handleChange} name="first_name" class="form-control" value={first_name} />
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input onChange={this.handleChange} name="last_name" class="form-control" value={last_name} />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input onChange={this.handleChange} name="email" class="form-control" value={email} />
                </div>
                <div class="form-group">
                  <label>Photo URL</label>
                  <input onChange={this.handleChange} name="photo_url" class="form-control" value={photo_url} />
                </div>
                <div class="form-group">
                  <label>Re-enter Password</label>
                  <input onChange={this.handleChange} type="password" name="password" class="form-control" value={password} />
                </div>
                {errors.length > 0 ? errors.map(err => <div key={err} className="alert alert-danger" role="alert"><p className="mb-0 small">{err}</p></div>) : null}
                {success ? <div className="alert alert-success" role="alert"><p className="mb-0 small">Update was successful!</p></div> : null}
                <button class="btn btn-primary btn-block mt-4" disabled="">Save
              Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;