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
  selectFooteraudioState,
  selectPlaying,
  selectPlayingList,
  set_audioStatus,
  set_footeraudioState,
  set_playing,
  set_playinglist,
} from "../features/userSlice";
import { useState } from "react";
import { useRef } from "react";
import { AlbumRounded } from "@material-ui/icons";

function Player({ spotify }) {
  const [audio] = useState(new Audio());
  const playing = useSelector(selectPlaying);
  const dispatch = useDispatch();
  const playlisturl = useSelector(selectPlayingList);
  const footeraudioStateter = useSelector(selectFooteraudioState);
  console.log("first url value ", playlisturl, "first audio value", audio.src);

  const playSongPlayer = () => {
    dispatch(
      set_playing({
        playSong: true,
      })
    );
  };
  const stopsongPlayer = () => {
    dispatch(
      set_playing({
        playSong: false,
      })
    );
  };
  // console.log(myRef);
  console.log(playing.playSong);
  useEffect(() => {
    if (playlisturl) {
      if (audio.src === "" && playing.playSong === true) {
        console.log("audio is emtye start song");
        audio.src = playlisturl.playinglist;
        audio.play();
        dispatch(
          set_audioStatus({
            audioStatus: playlisturl.playinglist,
          })
        );
      } else if (playlisturl.playinglist === audio.src) {
        if (playing.playSong === true) {
          console.log(
            "playlist.url and aduio.src is same and you want start again"
          );
          dispatch(
            set_audioStatus({
              audioStatus: playlisturl.playinglist,
            })
          );
          audio.play();
        } else if (playing.playSong === false) {
          console.log(
            "playlist.url and audio.src is same and you want stop tarck"
          );

          audio.pause();
          audio.currentTime = 0;
          dispatch(
            set_audioStatus({
              audioStatus: "",
            })
          );
        }
      } else if (playlisturl.playinglist !== audio.src) {
        console.log("you play another track");
        dispatch(
          set_audioStatus({
            audioStatus: playlisturl.playinglist,
          })
        );
        if (playing.playSong === true) {
          audio.pause();
          console.log(
            "playlist.url and aduio.src is not same and you want play new song"
          );
          audio.src = playlisturl.playinglist;
          audio.play();
        }
      }
    } else if (playlisturl?.playinglist === "no data") {
      alert("sorry... no data");
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
