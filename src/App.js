import React, { useEffect, useState } from "react";

import "./App.css";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  set_user,
  set_token,
  selectToken,
  set_playlists,
  selectPlaylists,
  set_list,
  selectList,
  set_recentlyPlayed,
  set_newReleases,
  set_topList,
  selectTopList,
  set_workout,
  selectWorkout,
  set_party,
  set_mood,
  set_categories,
  set_playing,
} from "./features/userSlice";
const audio = new Audio();
const spotify = new SpotifyWebApi();
function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      dispatch(
        set_token({
          _token,
        })
      );
      setToken(_token);

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch(
          set_user({
            user,
          })
        );
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch(
          set_playlists({
            playlists,
          })
        );
      });

      spotify.getMyRecentlyPlayedTracks().then((recentlyPlayed) => {
        dispatch(
          set_recentlyPlayed({
            recentlyPlayed: recentlyPlayed.items,
          })
        );
      });
      spotify.getNewReleases().then((newReleases) => {
        dispatch(
          set_newReleases({
            newReleases: newReleases.albums.items,
          })
        );
      });

      spotify.getCategoryPlaylists("toplists").then((topList) => {
        dispatch(
          set_topList({
            topList: topList.playlists.items,
          })
        );
      });
      spotify.getCategoryPlaylists("workout").then((workout) => {
        dispatch(
          set_workout({
            workout: workout.playlists.items,
          })
        );
      });
      spotify.getCategoryPlaylists("mood").then((mood) => {
        dispatch(
          set_mood({
            mood: mood.playlists.items,
          })
        );
      });
      spotify.getCategoryPlaylists("party").then((party) => {
        dispatch(
          set_party({
            party: party.playlists.items,
          })
        );
      });
      spotify.getCategories().then((category) => {
        dispatch(
          set_categories({
            category,
          })
        );
      });
    }
  }, []);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
