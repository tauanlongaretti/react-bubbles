import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BubblePage from "./components/BubblePage";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div>
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/protected">
          Bubbles
        </Link>
      </div>
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
