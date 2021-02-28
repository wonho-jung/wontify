import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
function App() {
  return (
    <div className="app">
      <Router>
        <Route to="/">
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
