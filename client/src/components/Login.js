import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

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
    axiosWithAuth()
    .post("/login", this.state.credentials)
    .then(res => {
      localStorage.setItem("token", res.date.payload);
      this.props.history.push("/protected");
    })
    .catch(err => {
      localStorage.removeItem("token");
      console.log("invalid login: ", err);
    })
  };

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
