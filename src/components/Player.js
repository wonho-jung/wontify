import React from "react";
import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import DetailAlbum from "./DetailAlbum";
import DetailPlaylist from "./DetailPlaylist";
import Library from "./Library";
import Search from "./Search";
import SearchCategory from "./SearchCategory";

function Player({ spotify }) {
  return (
    <Router>
      <PlayerContainer>
        <PlayerBody>
          <Sidebar spotify={spotify} />
          <Switch>
            <Route path="/detail/album/:id">
              <DetailAlbum spotify={spotify} />
            </Route>
            <Route path="/detail/playlist/:id">
              <DetailPlaylist spotify={spotify} />
            </Route>
            <Route path="/search/:id">
              <SearchCategory spotify={spotify} />
            </Route>
            <Route path="/search" exact>
              <Search spotify={spotify} />
            </Route>
            <Route path="/library">
              <Library spotify={spotify} />
            </Route>
            <Route path="/:id">
              <Body spotify={spotify} />
            </Route>
            <Route path="/" exact>
              <Home spotify={spotify} />
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
