import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: center;
  margin: 200px auto;
`;

const StyledInput = styled.input`
  border-radius: 8px;
  border: 2px solid lightblue;
  width: 140px;
  height: 25px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  margin: 30px 0px 0px 58px;
  border: 1px solid black;
  border-radius: 8px;
  background-color: lightblue;
  width: 140px;
  height: 25px;
`;

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
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log("invalid login: ", err);
      });
  };

  render() {
    return (
      <StyledDiv>
        <h2>Welcome To Bubbles!</h2>
        <form onSubmit={this.login}>
          <div>
            <StyledInput
              className="username-input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <StyledInput
              className="password-input"
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
            />
          </div>
          <StyledButton className="login-button">Log in</StyledButton>
        </form>
      </StyledDiv>
    );
  }
}

export default Login;
