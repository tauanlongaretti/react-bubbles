import React from "react";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  render () {
    return (
      <div>
        <h2>Welcome To Bubbles!</h2>
        <form onSubmit={this.login}>
          <div>
            <input 
              className="username-input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="password-input"
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.credentials.password}
              onChange={this.handleChange} 
            />
          </div>
          <button className="login-button">Log in</button>
        </form>
      </div>
    );
  };
}

export default Login;
