import React, { useEffect, useState } from "react";

import "./App.css";
import Login from "./components/Login";
import Player from "./components/Player";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { connect } from "dva";

function App(props) {
  const { dispatch } = props;
  const spotify = new SpotifyWebApi();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      dispatch({
        type: 'global/save',
        payload: {
          token: _token
        }
      });
      setToken(_token);

      spotify.setAccessToken(_token);
      dispatch({
        type: 'global/ready',
        payload: {
          spotify
        }
      })
    }
  }, []);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default connect(({global}) => ({...global}))(App);
