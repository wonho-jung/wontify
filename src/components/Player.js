import React, { useEffect, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled from "styled-components";
import UserPlayList from "./UserPlayList";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Home from "./Home";

import Search from "./Search";
import SearchCategory from "./Search/SearchCategoryPostDetail";
import SearchDetail from "./Search/SearchDetail";
import Artist from "./Search/Artist";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlaying,
  selectPlayingList,
  set_audioStatus,
  set_playing,
} from "../features/audioStatusSlice";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import DetailPlaylistSong from "./DetailPlaylistSong";

export const spotifyContext = createContext();

function Player({ spotify }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [audio] = useState(new Audio());
  const playing = useSelector(selectPlaying);
  const dispatch = useDispatch();
  const playlistUrl = useSelector(selectPlayingList);
  const audioCheckTime = () => {
    const timeOut = setTimeout(() => {
      if (Math.ceil(audio.currentTime) === 30) {
        clearTimeout(timeOut);
        audio.pause();
        audio.currentTime = 0;
        dispatch(
          set_audioStatus({
            audioStatus: "",
          })
        );
        dispatch(
          set_playing({
            playSong: false,
          })
        );
      }
    }, 30000);
  };

  audio.ontimeupdate = (e) => {
    setCurrentTime(Math.ceil(e.target.currentTime));
  };
  useEffect(() => {
    if (playlistUrl) {
      if (audio.src === "" && playing.playSong === true) {
        audio.src = playlistUrl.playingList;
        audio.play();

        audioCheckTime();
        dispatch(
          set_audioStatus({
            audioStatus: playlistUrl.playingList,
          })
        );
      } else if (playlistUrl.playingList === audio.src) {
        if (playing.playSong === true) {
          dispatch(
            set_audioStatus({
              audioStatus: playlistUrl.playingList,
            })
          );
          audio.play();

          audioCheckTime();
        } else if (playing.playSong === false) {
          audio.pause();
          audio.currentTime = 0;
          dispatch(
            set_audioStatus({
              audioStatus: "",
            })
          );
        }
      } else if (playlistUrl.playingList !== audio.src) {
        audio.pause();
        audio.currentTime = 0;
        if (playing.playSong === true) {
          dispatch(
            set_audioStatus({
              audioStatus: playlistUrl.playingList,
            })
          );
          audio.src = playlistUrl.playingList;
          audio.play();

          audioCheckTime();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistUrl]);

  return (
    <Router>
      <spotifyContext.Provider value={spotify}>
        <PlayerContainer>
          <PlayerBody>
            <Sidebar />
            <Switch>
              <Route path="/home" exact>
                <Home />
              </Route>

              <Route path="/detail_playlist/:id">
                <DetailPlaylistSong />
              </Route>

              <Route path="/search/:name">
                <SearchCategory spotify={spotify} />
              </Route>

              <Route path="/search" exact>
                <Search />
              </Route>

              <Route path="/artist/:id">
                <Artist spotify={spotify} />
              </Route>

              <Route path="/playlist/:id">
                <UserPlayList spotify={spotify} />
              </Route>

              <Redirect to="/home" />
            </Switch>
          </PlayerBody>
          <Footer audio={audio} currentTime={currentTime} />
        </PlayerContainer>
      </spotifyContext.Provider>
    </Router>
  );
}

export default Player;

const PlayerContainer = styled.div``;

const PlayerBody = styled.div`
  display: flex;
`;
