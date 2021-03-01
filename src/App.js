import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, set_user } from "./features/userSlice";

const spotify = new SpotifyWebApi();
function App() {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const hash = getTokenFromResponse();
    console.log("hash", hash);
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
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
      console.log("token", token);
    }
  }, []);

  console.log("users", users);

  return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;
