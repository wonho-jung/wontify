import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled from "styled-components";
import UserPlayList from "./UserPlayList";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home";
import DetailAlbum from "./Home/DetailAlbum";
import DetailPlaylist from "./Home/DetailPlaylist";
import Search from "./Search/Search";
import SearchCategory from "./Search/SearchCategory";
import SearchDetail from "./Search/SearchDetail";
import Artist from "./Search/Artist";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlaying,
  selectPlayingList,
  set_audioStatus,
  set_playing,
} from "../features/userSlice";
import { useState } from "react";

function Player({ spotify }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [audio] = useState(new Audio());
  const playing = useSelector(selectPlaying);
  const dispatch = useDispatch();
  const playlisturl = useSelector(selectPlayingList);

  const audioChecktime = () => {
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
    if (playlisturl) {
      if (audio.src === "" && playing.playSong === true) {
        audio.src = playlisturl.playinglist;
        audio.play();

        audioChecktime();
        dispatch(
          set_audioStatus({
            audioStatus: playlisturl.playinglist,
          })
        );
      } else if (playlisturl.playinglist === audio.src) {
        if (playing.playSong === true) {
          dispatch(
            set_audioStatus({
              audioStatus: playlisturl.playinglist,
            })
          );
          audio.play();

          audioChecktime();
        } else if (playing.playSong === false) {
          audio.pause();
          audio.currentTime = 0;
          dispatch(
            set_audioStatus({
              audioStatus: "",
            })
          );
        }
      } else if (playlisturl.playinglist !== audio.src) {
        audio.pause();
        audio.currentTime = 0;
        if (playing.playSong === true) {
          dispatch(
            set_audioStatus({
              audioStatus: playlisturl.playinglist,
            })
          );
          audio.src = playlisturl.playinglist;
          audio.play();

          audioChecktime();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlisturl]);

  return (
    <Router>
      <PlayerContainer>
        <PlayerBody>
          <Sidebar spotify={spotify} />
          <Switch>
            <Route path="/" exact>
              <Home spotify={spotify} />
            </Route>
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

            <Route path="/playlist/:id">
              <UserPlayList spotify={spotify} />
            </Route>
          </Switch>
        </PlayerBody>
        <Footer audio={audio} currentTime={currentTime} />
      </PlayerContainer>
    </Router>
  );
}

export default Player;

const PlayerContainer = styled.div``;

const PlayerBody = styled.div`
  display: flex;
`;
