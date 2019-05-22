import React, { Component } from 'react';

class Profile extends Component {
  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    photo_url: '',
    password: '',
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = (e) => {

    e.preventDefault();
    this.props.submit(this.state);
    this.setState({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      photo_url: '',
      password: '',
    })
  }

  render() {

    const { username, first_name, last_name, email, photo_url, password } = this.state

    return (
      <div class="text-left pt-5">
        <div class="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Profile</h3>
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