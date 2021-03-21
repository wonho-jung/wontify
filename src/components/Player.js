import React, { useEffect } from "react";
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
import SearchDetail from "./SearchDetail";
import Artist from "./Artist";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlaying,
  selectPlayingList,
  set_playing,
  set_playinglist,
} from "../features/userSlice";
import { useState } from "react";
import { useRef } from "react";

function Player({ spotify }) {
  const [audioStatus, setAudioStatus] = useState("");
  console.log("before useEffect", audioStatus);
  const playing = useSelector(selectPlaying);
  const dispatch = useDispatch();
  const playlisturl = useSelector(selectPlayingList);
  const myRef = useRef();
  var url;
  const playSongPlayer = () => {
    // setAudioStatus(true);
    // dispatch(
    //   set_playing({
    //     playSong: true,
    //   })
    // );

    myRef.current.play();
  };
  const stopsongPlayer = () => {
    // console.log(myRef);

    // setAudioStatus(false);
    // dispatch(
    //   set_playing({
    //     playSong: false,
    //   })
    // );
    myRef.current.pause();
  };
  console.log(myRef);
  return (
    <Router>
      <PlayerContainer>
        <audio ref={myRef} src={playlisturl?.playinglist} />

        <PlayerBody>
          <Sidebar spotify={spotify} />
          <Switch>
            <Route path="/detail/album/:id">
              <DetailAlbum spotify={spotify} />
            </Route>
            <Route path="/detail/playlist/:id">
              <DetailPlaylist spotify={spotify} />
            </Route>
            <Route path="/search/search/song">
              <SearchDetail spotify={spotify} />
            </Route>
            <Route path="/search/:id">
              <SearchCategory spotify={spotify} />
            </Route>

            <Route path="/search" exact>
              <Search spotify={spotify} />
            </Route>
            <Route path="/artist/:id">
              <Artist spotify={spotify} />
            </Route>

            <Route path="/library">
              <Library spotify={spotify} />
            </Route>
            <Route path="/:id">
              <Body
                spotify={spotify}
                myRef={myRef}
                playSongPlayer={playSongPlayer}
                stopsongPlayer={stopsongPlayer}
              />
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
