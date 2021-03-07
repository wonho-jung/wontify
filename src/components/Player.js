import React from "react";
import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";

function Player({ spotify }) {
  return (
    <Router>
      <PlayerContainer>
        <PlayerBody>
          <Sidebar />
          <Switch>
            <Route path="/:id">
              <Body spotify={spotify} />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </PlayerBody>
        <Footer />
      </PlayerContainer>
    </Router>
  );
}

export default Player;

const PlayerContainer = styled.div``;

const PlayerBody = styled.div`
  display: flex;
`;
