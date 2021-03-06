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
} from "./features/userSlice";

const spotify = new SpotifyWebApi();
function App() {
  const users = useSelector(selectUser);
  const tokens = useSelector(selectToken);
  const playlists = useSelector(selectPlaylists);
  const res = useSelector(selectList);
  console.log(users, tokens, playlists, res);
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
        console.log("user", user);
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

      spotify.getPlaylist("3X3a74S8tRKBXc8nd9p3OO").then((res) => {
        dispatch(
          set_list({
            res,
          })
        );
      });
      spotify.getMyRecentlyPlayedTracks().then((recentlyPlayed) => {
        dispatch(
          set_recentlyPlayed({
            recentlyPlayed,
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
