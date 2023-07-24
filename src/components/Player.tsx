import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import UserPlayList from "./UserPlayList";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Search from "./Search";
import SearchCategory from "./Search/SearchCategoryPostDetail";
import Artist from "./Search/Artist";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlaying,
  selectPlayingList,
  set_audioStatus,
  set_playing,
} from "../features/audioStatusSlice";
import DetailPlaylistSong from "./DetailPlaylist";

function Player() {
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

  audio.ontimeupdate = (e: any) => {
    //ts-ignore
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
    <BrowserRouter>
      <PlayerContainer>
        <PlayerBody>
          <Sidebar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/detail_playlist/:id"
              element={<DetailPlaylistSong />}
            />
            <Route path="/search/:name" element={<SearchCategory />} />
            <Route path="/search" element={<Search />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/playlist/:id" element={<UserPlayList />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </PlayerBody>
        <Footer audio={audio} currentTime={currentTime} />
      </PlayerContainer>
    </BrowserRouter>
  );
}

export default Player;

const PlayerContainer = styled.div``;

const PlayerBody = styled.div`
  display: flex;
`;
