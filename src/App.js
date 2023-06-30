import React, { useEffect } from "react";
import Player from "./components/Player";
import { _getToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDispatch } from "react-redux";
import {
  set_newReleases,
  set_topList,
  set_workout,
  set_party,
  set_mood,
  set_categories,
} from "./features/userSlice";
import "./App.css";
import { testAPI, getCampaigns } from "./backend/test";

function App() {
  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();

  useEffect(() => {
    getCampaigns()
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    _getToken().then((res) => {
      spotify.setAccessToken(res);
      spotify.getNewReleases({ limit: 10 }).then((newReleases) => {
        dispatch(
          set_newReleases({
            newReleases: newReleases.albums.items,
          })
        );
      });

      spotify
        .getCategoryPlaylists("toplists", { limit: 10 })
        .then((topList) => {
          dispatch(
            set_topList({
              topList: topList.playlists.items,
            })
          );
        });
      spotify.getCategoryPlaylists("workout", { limit: 10 }).then((workout) => {
        dispatch(
          set_workout({
            workout: workout.playlists.items,
          })
        );
      });
      spotify.getCategoryPlaylists("mood", { limit: 10 }).then((mood) => {
        dispatch(
          set_mood({
            mood: mood.playlists.items,
          })
        );
      });
      spotify.getCategoryPlaylists("party", { limit: 10 }).then((party) => {
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Player spotify={spotify} />
    </div>
  );
}

export default App;
