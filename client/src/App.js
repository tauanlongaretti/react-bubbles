import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BubblePage from "./components/BubblePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import "./styles.scss";
import styled from "styled-components";

const StyledLinks = styled(Link)`
  margin-left: 80%;
  text-decoration: none;
  color: gray;
`;

const StyledLink = styled(Link)`
  margin: 2%;
  text-decoration: none;
  color: gray;
  font-size: 18px
`;

function App() {
  return (
    <Router>
      <StyledLinks>
        <StyledLink className="link" to="/login">
          Login
        </StyledLink>
        <StyledLink className="link" to="/protected">
          Bubbles
        </StyledLink>
      </StyledLinks>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/protected" component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
