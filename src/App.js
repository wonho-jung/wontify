import React, { useEffect, useState } from "react";
import Player from "./components/Player";

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
import { getToken } from "./utils/spotify";
import ErrorScreen from "./components/shared/ErrorScreen";
import LoadingScreen from "./components/shared/LoadingScreen";

function App() {
  const [isLoadData, setIsLoadData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const token = await getToken();
        spotify.setAccessToken(token);
        const [newReleases, topList, workout, mood, party, categories] =
          await Promise.all([
            spotify.getNewReleases({ limit: 10 }),
            spotify.getCategoryPlaylists("toplists", { limit: 10 }),
            spotify.getCategoryPlaylists("workout", { limit: 10 }),
            spotify.getCategoryPlaylists("mood", { limit: 10 }),
            spotify.getCategoryPlaylists("party", { limit: 10 }),
            spotify.getCategories(),
          ]);
        dispatch(
          set_newReleases({
            newReleases: newReleases.albums.items,
          })
        );
        dispatch(
          set_topList({
            topList: topList.playlists.items,
          })
        );
        dispatch(
          set_workout({
            workout: workout.playlists.items,
          })
        );
        dispatch(
          set_mood({
            mood: mood.playlists.items,
          })
        );
        dispatch(
          set_party({
            party: party.playlists.items,
          })
        );
        dispatch(set_categories({ category: categories }));

        setIsLoadData(true);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchSpotifyData();
    if (hasError) {
      return <ErrorScreen />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      {isLoadData ? <Player spotify={spotify} /> : <LoadingScreen />}
    </div>
  );
}

export default App;
