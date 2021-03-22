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
  const [audio] = useState(new Audio());
  console.log("before useEffect", audioStatus);
  const playing = useSelector(selectPlaying);
  const dispatch = useDispatch();
  const playlisturl = useSelector(selectPlayingList);
  const myRef = useRef();
  console.log(playlisturl?.playinglist);
  const audioplay = new Audio();
  const playSongPlayer = () => {
    setAudioStatus(true);
    dispatch(
      set_playing({
        playSong: true,
      })
    );
    setAudioStatus(playlisturl.playlist);
    audioplay.src = audio;
    audioplay.play();
    // myRef.current.play();
  };
  const stopsongPlayer = () => {
    // console.log(myRef);
    myRef.current.pause();
    setAudioStatus(false);
    dispatch(
      set_playing({
        playSong: false,
      })
    );
  };
  // console.log(myRef);
  console.log(playing.playSong);
  useEffect(() => {
    if (playlisturl !== null) {
      console.log(playlisturl.playinglist);
      console.log(audio.src);
      audio.src = playlisturl.playinglist;

      if (playing.playSong === true) {
        console.log("i'm playing");
        console.log(audio);
        audio.play();
      } else if (playing.playSong === false) {
        console.log("i'm not playing");
        audio.pause();
      }
      // } else {
      //   if (playlisturl !== null) {
      //     audio.pause();
      //   }
    }
  }, [playlisturl]);
  return (
    <Router>
      <PlayerContainer>
        {/* <audio ref={myRef} src={audio} /> */}

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
